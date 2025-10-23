// GeminiChatbot.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import SkeletonLoader from './SkeletonLoader';

const GeminiChatbot = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [farmerData, setFarmerData] = useState({
        landSize: '',
        landSizeUnit: '',
        startingMonth: '',
        growingPeriod: '',
        location: '',
        soilType: '',
        waterAvailability: ''
    });
    const [conversationStage, setConversationStage] = useState('welcome');
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState('');
    const [recommendedCrops, setRecommendedCrops] = useState([]);
    const [productLinks, setProductLinks] = useState([]);
    const [translatingMessages, setTranslatingMessages] = useState(new Set());

    // Translation cache: { language: { messageIndex: translatedText } }
    const translationCache = useRef({});

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const landUnits = ['acres', 'hectares', 'bigha', 'square feet', 'square meters'];
    const soilTypes = ['loamy', 'clay', 'sandy', 'silt', 'black cotton', 'red soil', 'alluvial'];
    const waterSources = ['rain-fed', 'irrigation', 'drip irrigation', 'sprinkler', 'tube well', 'canal'];

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    // Translation function using MyMemory API
    const translateText = useCallback(async (text, targetLang) => {
        if (targetLang === 'en' || !text) return text;

        const langCodeMap = {
            hi: 'hi-IN', bn: 'bn-IN', ta: 'ta-IN', te: 'te-IN',
            mr: 'mr-IN', gu: 'gu-IN', pa: 'pa-IN', awa: 'hi-IN', bho: 'hi-IN'
        };
        const targetLangCode = langCodeMap[targetLang] || targetLang;

        try {
            const response = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLangCode}`
            );

            let data;
            try { data = await response.json(); }
            catch { return text; }

            if (data.responseStatus === 200 && data.responseData?.translatedText) {
                return data.responseData.translatedText;
            }
            return text;
        } catch {
            return text;
        }
    }, []);

    // Translate new bot messages immediately when they're added
    useEffect(() => {
        const translateNewMessages = async () => {
            if (i18n.language === 'en' || messages.length === 0) return;

            const currentLang = i18n.language;
            
            // Find messages that need translation (bot messages without translatedText)
            const messagesToTranslate = [];
            messages.forEach((msg, idx) => {
                if (msg.sender === 'bot' && !msg.translatedText) {
                    // Check if we have it in cache
                    if (translationCache.current[currentLang]?.[idx]) {
                        // Use cached translation
                        setMessages(prev => 
                            prev.map((m, i) => i === idx ? {...m, translatedText: translationCache.current[currentLang][idx]} : m)
                        );
                    } else {
                        messagesToTranslate.push({ idx, text: msg.text });
                    }
                }
            });

            if (messagesToTranslate.length === 0) return;

            // Mark messages as translating
            setTranslatingMessages(new Set(messagesToTranslate.map(m => m.idx)));

            // Translate each message
            for (const { idx, text } of messagesToTranslate) {
                try {
                    const translated = await translateText(text, currentLang);
                    
                    // Cache the translation
                    if (!translationCache.current[currentLang]) {
                        translationCache.current[currentLang] = {};
                    }
                    translationCache.current[currentLang][idx] = translated;

                    // Update the specific message
                    setMessages(prev =>
                        prev.map((msg, i) => i === idx ? {...msg, translatedText: translated} : msg)
                    );
                } catch (error) {
                    console.error('Translation error:', error);
                    // Keep original text on error
                    setMessages(prev =>
                        prev.map((msg, i) => i === idx ? {...msg, translatedText: text} : msg)
                    );
                }
            }

            setTranslatingMessages(new Set());
        };

        if (isOpen) {
            translateNewMessages();
        }
    }, [messages, i18n.language, isOpen, translateText]);

    // Handle language switching - retranslate all messages
    useEffect(() => {
        const retranslateAllMessages = async () => {
            if (i18n.language === 'en' || messages.length === 0) {
                // Clear translations if switching to English
                setMessages(prevMessages => 
                    prevMessages.map(msg => ({
                        ...msg,
                        translatedText: msg.sender === 'bot' ? undefined : msg.translatedText
                    }))
                );
                return;
            }

            const currentLang = i18n.language;
            
            // Apply cached translations if available
            if (translationCache.current[currentLang]) {
                setMessages(prevMessages =>
                    prevMessages.map((msg, idx) => ({
                        ...msg,
                        translatedText: msg.sender === 'bot' 
                            ? translationCache.current[currentLang][idx] || msg.text
                            : msg.translatedText
                    }))
                );
            }
        };

        if (isOpen) {
            retranslateAllMessages();
        }
    }, [i18n.language, isOpen]);

    useEffect(() => {
        if (isOpen && conversationStage === 'welcome') {
            const welcomeMessages = [
                "🌾 Welcome to AgriNext Assistant! I'm here to help you make informed decisions about your crops.",
                "To provide you with the best recommendations, I'll need some information about your farming setup.",
                "Let's start with your land details. What is the size of your land? (Please include the unit, e.g., '5 acres' or '2 hectares')"
            ];
            
            const initialMessages = welcomeMessages.map(text => ({ text, sender: 'bot' }));
            setMessages(initialMessages);
            setConversationStage('askLandSize');
        }
    }, [isOpen]);

    const addBotMessage = (message, currentMessages = messages) => {
        const newMessage = typeof message === 'string' ? { text: message, sender: 'bot' } : message;
        const newMessages = [...currentMessages, newMessage];
        setMessages(newMessages);
        return newMessages;
    };

    const validateLandSize = (input) => {
        const landSizeRegex = /(\d+\.?\d*)\s*(acres?|hectares?|bigha|sq\.?\s*ft|square\s*feet|sq\.?\s*m|square\s*meters?)/i;
        return landSizeRegex.test(input.trim());
    };

    const extractLandSize = (input) => {
        const landSizeRegex = /(\d+\.?\d*)\s*(acres?|hectares?|bigha|sq\.?\s*ft|square\s*feet|sq\.?\s*m|square\s*meters?)/i;
        const match = input.match(landSizeRegex);
        if (match) {
            let unit = match[2].toLowerCase();
            if (unit.includes('acre')) unit = 'acres';
            else if (unit.includes('hectare')) unit = 'hectares';
            else if (unit.includes('bigha')) unit = 'bigha';
            else if (unit.includes('ft') || unit.includes('feet')) unit = 'square feet';
            else if (unit.includes('m') || unit.includes('meter')) unit = 'square meters';
            
            return { size: match[1], unit };
        }
        return null;
    };

    const validateMonth = (input) => {
        return months.some(month => 
            month.toLowerCase().includes(input.toLowerCase()) || 
            input.toLowerCase().includes(month.toLowerCase())
        );
    };

    const extractMonth = (input) => {
        return months.find(month => 
            month.toLowerCase().includes(input.toLowerCase()) || 
            input.toLowerCase().includes(month.toLowerCase())
        );
    };

    const validateGrowingPeriod = (input) => {
        const periodRegex = /(\d+)\s*(months?|weeks?)/i;
        return periodRegex.test(input.trim());
    };

    const extractCropsFromMessage = (message) => {
        const cropLines = message.split('\n').filter(line => 
            line.trim().startsWith('•') && line.includes('-')
        );
        return cropLines.map(line => {
            const match = line.match(/•\s*([A-Za-z\s]+?)\s*[-–—]/);
            return match ? match[1].trim() : '';
        }).filter(crop => crop !== '');
    };

    const getProfileSummary = (data) => {
        return `Here's your farming profile:\n\n` +
            `🌾 Land: ${data.landSize} ${data.landSizeUnit}\n` +
            `📅 Starting: ${data.startingMonth}\n` +
            `⏰ Duration: ${data.growingPeriod}\n` +
            `📍 Location: ${data.location}\n` +
            `🌱 Soil: ${data.soilType}\n` +
            `💧 Water: ${data.waterAvailability}\n\n` +
            `Is this information correct? Type 'yes' to get crop recommendations, or tell me which field you'd like to change (e.g., 'change location', 'edit soil type', 'update land size').`;
    };

    const handleProfileConfirmation = async (userInput, currentMessages) => {
        const inputLower = userInput.toLowerCase().trim();
        
        if (inputLower.includes('change') || inputLower.includes('edit') || inputLower.includes('update')) {
            let field = '';
            if (inputLower.includes('land') || inputLower.includes('size')) field = 'landSize';
            else if (inputLower.includes('month') || inputLower.includes('starting')) field = 'startingMonth';
            else if (inputLower.includes('duration') || inputLower.includes('period') || inputLower.includes('grow')) field = 'growingPeriod';
            else if (inputLower.includes('location') || inputLower.includes('city') || inputLower.includes('state')) field = 'location';
            else if (inputLower.includes('soil')) field = 'soilType';
            else if (inputLower.includes('water') || inputLower.includes('source')) field = 'waterAvailability';
            
            if (field) {
                setFieldToEdit(field);
                setIsEditing(true);
                
                let question = '';
                switch(field) {
                    case 'landSize':
                        question = "What is your correct land size? (e.g., '3 acres', '1 hectare')";
                        setConversationStage('askLandSize');
                        break;
                    case 'startingMonth':
                        question = "Which month would you like to start? (e.g., March, July, November)";
                        setConversationStage('askStartingMonth');
                        break;
                    case 'growingPeriod':
                        question = "What's your correct growing period? (e.g., '4 months', '6 months')";
                        setConversationStage('askGrowingPeriod');
                        break;
                    case 'location':
                        question = "What's your correct location? (e.g., 'Pune, Maharashtra')";
                        setConversationStage('askLocation');
                        break;
                    case 'soilType':
                        question = "What's your soil type? (loamy, clay, sandy, silt, black cotton, red soil, alluvial)";
                        setConversationStage('askSoilType');
                        break;
                    case 'waterAvailability':
                        question = "What's your water source? (rain-fed, irrigation, drip irrigation, sprinkler, tube well, canal)";
                        setConversationStage('askWaterSource');
                        break;
                }
                
                addBotMessage(question, currentMessages);
                return;
            }
        }
        
        if (inputLower === 'yes' || inputLower === 'y' || inputLower.includes('correct') || inputLower.includes('good') || inputLower.includes('ok')) {
            setIsLoading(true);
            try {
                // Add language parameter to API request
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chatbot`, {
                    farmerData: farmerData,
                    message: "Please recommend suitable crops based on my farming profile.",
                    context: 'agricultural_assistance',
                    language: i18n.language // Send current language
                });
                
                let botMessage = response.data.response;
                const links = response.data.productLinks;
                
                // If API doesn't support language parameter, translate the response
                if (i18n.language !== 'en') {
                    try {
                        botMessage = await translateText(botMessage, i18n.language);
                    } catch (error) {
                        console.error('Translation error:', error);
                        // Keep original if translation fails
                    }
                }
                
                const crops = extractCropsFromMessage(response.data.response); // Extract from original English
                setRecommendedCrops(crops);
                setProductLinks(links);
                
                addBotMessage(botMessage, currentMessages);
                
                if (links && links.length > 0) {
                    let linksMessage = '\n\n📦 Related Product Categories:\n\n';
                    links.forEach((link, idx) => {
                        const url = `${window.location.origin}/category/${link.category}/${link.subcategory}`;
                        const displayName = `${link.category} - ${link.subcategory}`;
                        linksMessage += `${idx + 1}. [${displayName}](${url})\n`;
                    });
                    
                    let updatedMessages = [...currentMessages];
                    updatedMessages.push({ text: botMessage, sender: 'bot' });
                    addBotMessage({ text: linksMessage, sender: 'bot', hasLinks: true }, updatedMessages);
                }
                
                setConversationStage('recommendations');
            } catch (error) {
                console.error('Error fetching crop recommendations:', error);
                const errorMessage = "I apologize, but I'm having trouble generating crop recommendations. Please try again.";
                addBotMessage(errorMessage, currentMessages);
            } finally {
                setIsLoading(false);
            }
        } else {
            const clarificationMessage = "Please type 'yes' to confirm your profile and get crop recommendations, or tell me which field you'd like to change (e.g., 'change location', 'edit soil type').";
            addBotMessage(clarificationMessage, currentMessages);
        }
    };

    const handleProductRequest = async (userInput, currentMessages) => {
        const inputLower = userInput.toLowerCase();
        let selectedCrop = '';
        
        for (const crop of recommendedCrops) {
            if (inputLower.includes(crop.toLowerCase())) {
                selectedCrop = crop;
                break;
            }
        }
        
        if (selectedCrop) {
            setIsLoading(true);
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chatbot`, {
                    farmerData: farmerData,
                    message: `What products should I buy to grow ${selectedCrop}?`,
                    context: 'product_recommendation',
                    language: i18n.language // Send current language
                });
                
                let botMessage = response.data.response;
                
                // Translate if not in English
                if (i18n.language !== 'en') {
                    try {
                        botMessage = await translateText(botMessage, i18n.language);
                    } catch (error) {
                        console.error('Translation error:', error);
                    }
                }
                
                addBotMessage(botMessage, currentMessages);
            } catch (error) {
                console.error('Error fetching product recommendations:', error);
                const errorMessage = "I apologize, but I'm having trouble with product recommendations. Please try again.";
                addBotMessage(errorMessage, currentMessages);
            } finally {
                setIsLoading(false);
            }
        } else {
            const cropsList = recommendedCrops.length > 0 
                ? recommendedCrops.map(crop => `• ${crop}`).join('\n')
                : "wheat, mustard, or chickpeas";
            const message = `I can help you find products for these crops:\n\n${cropsList}\n\nWhich crop would you like product recommendations for?`;
            addBotMessage(message, currentMessages);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        const currentInput = input.trim();
        setInput('');

        try {
            switch (conversationStage) {
                case 'askLandSize':
                    if (validateLandSize(currentInput)) {
                        const landData = extractLandSize(currentInput);
                        setFarmerData(prev => ({ 
                            ...prev, 
                            landSize: landData.size, 
                            landSizeUnit: landData.unit 
                        }));
                        
                        if (isEditing) {
                            setIsEditing(false);
                            const summaryMessage = getProfileSummary({...farmerData, landSize: landData.size, landSizeUnit: landData.unit});
                            addBotMessage(summaryMessage, newMessages);
                            setConversationStage('confirmProfile');
                        } else {
                            const nextMessage = `Perfect! ${landData.size} ${landData.unit} noted. 📍\n\nNow, which month are you planning to start growing your crops? (e.g., March, July, November)`;
                            addBotMessage(nextMessage, newMessages);
                            setConversationStage('askStartingMonth');
                        }
                    } else {
                        const errorMessage = "Please provide a valid land size with unit (e.g., '5 acres', '2 hectares', '10 bigha'). 📏";
                        addBotMessage(errorMessage, newMessages);
                    }
                    break;

                case 'askStartingMonth':
                    if (validateMonth(currentInput)) {
                        const month = extractMonth(currentInput);
                        setFarmerData(prev => ({ ...prev, startingMonth: month }));
                        
                        if (isEditing) {
                            setIsEditing(false);
                            const summaryMessage = getProfileSummary({...farmerData, startingMonth: month});
                            addBotMessage(summaryMessage, newMessages);
                            setConversationStage('confirmProfile');
                        } else {
                            const nextMessage = `Great! Starting in ${month}. 📅\n\nFor how long do you plan to grow the crops? Please specify in months (e.g., '3 months', '6 months')`;
                            addBotMessage(nextMessage, newMessages);
                            setConversationStage('askGrowingPeriod');
                        }
                    } else {
                        const monthsList = months.join(', ');
                        const errorMessage = `Please specify a valid month. You can choose from: ${monthsList} 📅`;
                        addBotMessage(errorMessage, newMessages);
                    }
                    break;

                case 'askGrowingPeriod':
                    if (validateGrowingPeriod(currentInput)) {
                        setFarmerData(prev => ({ ...prev, growingPeriod: currentInput }));
                        
                        if (isEditing) {
                            setIsEditing(false);
                            const summaryMessage = getProfileSummary({...farmerData, growingPeriod: currentInput});
                            addBotMessage(summaryMessage, newMessages);
                            setConversationStage('confirmProfile');
                        } else {
                            const nextMessage = `Excellent! ${currentInput} growing period recorded. 🕐\n\nWhat's your location? Please provide your city/district and state (e.g., 'Pune, Maharashtra' or 'Ludhiana, Punjab')`;
                            addBotMessage(nextMessage, newMessages);
                            setConversationStage('askLocation');
                        }
                    } else {
                        const errorMessage = "Please specify the growing period in months (e.g., '3 months', '6 months') ⏰";
                        addBotMessage(errorMessage, newMessages);
                    }
                    break;

                case 'askLocation':
                    const cleanLocation = currentInput.trim();
                    if (!cleanLocation) {
                        addBotMessage("Please enter a valid location (e.g., 'Pune, Maharashtra')", newMessages);
                        return;
                    }
                    
                    setFarmerData(prev => ({ ...prev, location: cleanLocation }));
                    
                    if (isEditing) {
                        setIsEditing(false);
                        const summaryMessage = getProfileSummary({...farmerData, location: cleanLocation});
                        addBotMessage(summaryMessage, newMessages);
                        setConversationStage('confirmProfile');
                    } else {
                        const locationMessage = `Location set to ${cleanLocation}! 🌍\n\nTo provide better crop recommendations, what type of soil do you have? (loamy, clay, sandy, silt, black cotton, red soil, alluvial, or 'not sure')`;
                        addBotMessage(locationMessage, newMessages);
                        setConversationStage('askSoilType');
                    }
                    break;

                case 'askSoilType':
                    setFarmerData(prev => ({ ...prev, soilType: currentInput }));
                    
                    if (isEditing) {
                        setIsEditing(false);
                        const summaryMessage = getProfileSummary({...farmerData, soilType: currentInput});
                        addBotMessage(summaryMessage, newMessages);
                        setConversationStage('confirmProfile');
                    } else {
                        const soilMessage = `Soil type noted: ${currentInput} 🌱\n\nLastly, what's your primary water source? (rain-fed, irrigation, drip irrigation, sprinkler, tube well, canal)`;
                        addBotMessage(soilMessage, newMessages);
                        setConversationStage('askWaterSource');
                    }
                    break;

                case 'askWaterSource':
                    setFarmerData(prev => ({ ...prev, waterAvailability: currentInput }));
                    
                    if (isEditing) {
                        setIsEditing(false);
                        const summaryMessage = getProfileSummary({...farmerData, waterAvailability: currentInput});
                        addBotMessage(summaryMessage, newMessages);
                        setConversationStage('confirmProfile');
                    } else {
                        const summaryMessage = getProfileSummary({...farmerData, waterAvailability: currentInput});
                        addBotMessage(summaryMessage, newMessages);
                        setConversationStage('confirmProfile');
                    }
                    break;

                case 'confirmProfile':
                    await handleProfileConfirmation(currentInput, newMessages);
                    break;

                case 'recommendations':
                    const inputLower = currentInput.toLowerCase();
                    if (inputLower.includes('product') || 
                        inputLower.includes('buy') || 
                        inputLower.includes('what should i buy') ||
                        inputLower.includes('products for') ||
                        recommendedCrops.some(crop => inputLower.includes(crop.toLowerCase()))) {
                        await handleProductRequest(currentInput, newMessages);
                    } else {
                        setIsLoading(true);
                        try {
                            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chatbot`, {
                                farmerData: farmerData,
                                message: currentInput,
                                context: 'agricultural_assistance'
                            });
                            
                            const botMessage = response.data.response;
                            addBotMessage(botMessage, newMessages);
                        } catch (error) {
                            console.error('Error fetching response:', error);
                            const errorMessage = "I apologize, but I'm experiencing technical difficulties. Please try again.";
                            addBotMessage(errorMessage, newMessages);
                        } finally {
                            setIsLoading(false);
                        }
                    }
                    break;

                default:
                    setIsLoading(true);
                    try {
                        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/chatbot`, {
                            farmerData: farmerData,
                            message: currentInput,
                            context: 'agricultural_assistance'
                        });
                        
                        const botMessage = response.data.response;
                        addBotMessage(botMessage, newMessages);
                    } catch (error) {
                        console.error('Error fetching response from chatbot:', error);
                        const errorMessage = "I apologize, but I'm experiencing technical difficulties. Please try again in a moment. 🔧";
                        addBotMessage(errorMessage, newMessages);
                    } finally {
                        setIsLoading(false);
                    }
                    break;
            }
        } catch (error) {
            console.error('Error in conversation flow:', error);
            const errorMessage = "Something went wrong. Please try again. ⚠️";
            addBotMessage(errorMessage, newMessages);
        }
    };

    const resetConversation = () => {
        setMessages([]);
        setFarmerData({
            landSize: '',
            landSizeUnit: '',
            startingMonth: '',
            growingPeriod: '',
            location: '',
            soilType: '',
            waterAvailability: ''
        });
        setConversationStage('welcome');
        setIsEditing(false);
        setFieldToEdit('');
        setRecommendedCrops([]);
        setProductLinks([]);
        translationCache.current = {}; // Clear cache on reset
        
        setTimeout(() => {
            const welcomeMessages = [
                "🌾 Welcome to AgriNext Assistant! I'm here to help you make informed decisions about your crops.",
                "To provide you with the best recommendations, I'll need some information about your farming setup.",
                "Let's start with your land details. What is the size of your land? (Please include the unit, e.g., '5 acres' or '2 hectares')"
            ];
            
            const initialMessages = welcomeMessages.map(text => ({ text, sender: 'bot' }));
            setMessages(initialMessages);
            setConversationStage('askLandSize');
        }, 100);
    };

    return (
        <div>
            {/* Chatbot Toggle Button */}
            <div className="fixed bottom-5 right-5 z-50">
                <button 
                    onClick={toggleChatbot} 
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-xl transition-all duration-300 transform hover:scale-110"
                    aria-label="Open AgriNext Assistant"
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.745A9.025 9.025 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Chatbot Window */}
            {isOpen && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[650px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-t-xl flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                            <h3 className="font-bold text-lg">🌾 AgriNext Assistant</h3>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={resetConversation}
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-sm hover:shadow-md group"
                                title="Restart conversation"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                            <button 
                                onClick={toggleChatbot} 
                                className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-sm hover:shadow-md group"
                                aria-label="Close chat"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                        <div className="flex flex-col space-y-3">
                            {messages.map((msg, index) => (
                                <div 
                                    key={index} 
                                    className={`max-w-[85%] p-3 rounded-2xl whitespace-pre-line ${
                                        msg.sender === 'user' 
                                            ? 'bg-green-500 text-white self-end rounded-br-md' 
                                            : 'bg-white text-gray-800 self-start rounded-bl-md shadow-sm border'
                                    }`}
                                >
                                    <div className="text-sm leading-relaxed">
                                        {msg.sender === 'bot' ? (
                                            translatingMessages.has(index) ? (
                                                <span className="animate-pulse bg-gray-200 rounded inline-block w-full h-4"></span>
                                            ) : msg.hasLinks ? (
                                                <div>
                                                    {(msg.translatedText || msg.text).split('\n').map((line, i) => {
                                                        const linkMatch = line.match(/\[(.+?)\]\((.+?)\)/);
                                                        if (linkMatch) {
                                                            return (
                                                                <div key={i} className="mb-2">
                                                                    <a 
                                                                        href={linkMatch[2]} 
                                                                        target="_blank" 
                                                                        rel="noopener noreferrer"
                                                                        className="text-green-600 hover:text-green-700 underline font-medium hover:no-underline transition-all"
                                                                    >
                                                                        {linkMatch[1]}
                                                                    </a>
                                                                </div>
                                                            );
                                                        }
                                                        return line ? <div key={i}>{line}</div> : null;
                                                    })}
                                                </div>
                                            ) : msg.isHtml ? (
                                                <div dangerouslySetInnerHTML={{ __html: msg.translatedText || msg.text }} />
                                            ) : (
                                                msg.translatedText || msg.text
                                            )
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="self-start">
                                    <SkeletonLoader />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                                placeholder="Type your message..."
                                disabled={isLoading}
                            />
                            <button 
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-full transition-colors duration-200 font-medium text-sm"
                            >
                                {isLoading ? '...' : 'Send'}
                            </button>
                        </div>
                        
                        {/* Progress Indicator */}
                        {conversationStage !== 'confirmProfile' && conversationStage !== 'recommendations' && conversationStage !== 'welcome' && (
                            <div className="mt-3 text-xs text-gray-500 text-center">
                                Setting up your profile... 
                                {conversationStage === 'askLandSize' && '(1/6)'}
                                {conversationStage === 'askStartingMonth' && '(2/6)'}
                                {conversationStage === 'askGrowingPeriod' && '(3/6)'}
                                {conversationStage === 'askLocation' && '(4/6)'}
                                {conversationStage === 'askSoilType' && '(5/6)'}
                                {conversationStage === 'askWaterSource' && '(6/6)'}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeminiChatbot;