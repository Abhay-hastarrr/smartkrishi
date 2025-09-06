import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, Volume2, Languages, Home, ShoppingCart, Package, User } from "lucide-react";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [recognition, setRecognition] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();
  const responseRef = useRef(null);

  // Voice commands mapping for both English and Hindi
  const voiceCommands = {
    navigation: {
      en: {
        "go to home": "/",
        "open home": "/",
        "home page": "/",
        "go home": "/",
        "go to cart": "/cart",
        "open cart": "/cart",
        "show cart": "/cart",
        "my cart": "/cart",
        "show products": "/collection",
        "go to products": "/collection",
        "products page": "/collection",
        "browse products": "/collection",
        "check my orders": "/orders",
        "go to orders": "/orders",
        "my orders": "/orders",
        "order history": "/orders",
        "go to about": "/about",
        "about page": "/about",
        "contact us": "/contact",
        "go to contact": "/contact",
        "login page": "/login",
        "sign in": "/login"
      },
      hi: {
        "होम पर जाएं": "/",
        "घर जाओ": "/",
        "मुख्य पृष्ठ": "/",
        "होम": "/",
        "कार्ट खोलें": "/cart",
        "टोकरी दिखाएं": "/cart",
        "मेरा कार्ट": "/cart",
        "कार्ट": "/cart",
        "उत्पाद दिखाएं": "/collection",
        "प्रोडक्ट्स पेज": "/collection",
        "सामान देखें": "/collection",
        "उत्पाद": "/collection",
        "मेरे ऑर्डर": "/orders",
        "आर्डर देखें": "/orders",
        "ऑर्डर हिस्ट्री": "/orders",
        "ऑर्डर": "/orders",
        "हमारे बारे में": "/about",
        "संपर्क करें": "/contact",
        "संपर्क": "/contact",
        "लॉगिन करें": "/login",
        "साइन इन": "/login",
        "लॉगिन": "/login"
      }
    }
  };

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechRecognition = new SpeechRecognition();
    
    speechRecognition.lang = language;
    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;
    speechRecognition.maxAlternatives = 1;

    speechRecognition.onstart = () => {
      setIsListening(true);
    };

    speechRecognition.onresult = async (event) => {
      const voiceText = event.results[0][0].transcript.toLowerCase().trim();
      console.log("Voice input:", voiceText);
      
      // Handle navigation first
      const navigationHandled = handleNavigation(voiceText);
      
      // If not a navigation command, try to get response from API or simulation
      if (!navigationHandled) {
        await fetchResponse(voiceText);
      }
    };

    speechRecognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setResponse(language === "hi-IN" 
          ? "माइक्रोफ़ोन की अनुमति आवश्यक है।" 
          : "Microphone permission required."
        );
      }
    };

    speechRecognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(speechRecognition);

    return () => {
      if (speechRecognition) {
        speechRecognition.stop();
      }
    };
  }, [language]);

  const toggleListening = () => {
    if (!recognition) {
      setResponse(language === "hi-IN" 
        ? "इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है।"
        : "Speech recognition not supported in this browser."
      );
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      try {
        recognition.lang = language;
        recognition.start();
        setResponse("");
      } catch (error) {
        console.error("Error starting recognition:", error);
        setIsListening(false);
      }
    }
  };

  const fetchResponse = async (voiceText) => {
    try {
      setResponse(language === "hi-IN" ? "प्रसंस्करण..." : "Processing...");
      
      // Try API call first, fallback to simulation
      try {
        const res = await fetch("http://localhost:4000/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command: voiceText, lang: language }),
        });
        const data = await res.json();
        setResponse(data.reply);
        speakResponse(data.reply);
      } catch (apiError) {
        // Fallback to simulated response if API not available
        const simulatedResponse = getSimulatedResponse(voiceText);
        setResponse(simulatedResponse);
        speakResponse(simulatedResponse);
      }
      
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = language === "hi-IN" ? "कुछ गलत हुआ है" : "Something went wrong";
      setResponse(errorMsg);
      speakResponse(errorMsg);
    } finally {
      setIsListening(false);
    }
  };

  const getSimulatedResponse = (command) => {
    const responses = {
      "en-US": {
        "hello": "Hello! How can I help you today?",
        "hi": "Hi there! I'm your voice assistant.",
        "help": "I can help you navigate the website. Try saying 'go to home' or 'open cart'.",
        "what can you do": "I can help you navigate pages, check your orders, and answer basic questions.",
        "thank you": "You're welcome! Is there anything else I can help you with?",
        "thanks": "You're welcome! Happy to help!",
        "how are you": "I'm doing great! Ready to assist you.",
        "good morning": "Good morning! How can I assist you today?",
        "good afternoon": "Good afternoon! What can I help you with?",
        "good evening": "Good evening! How may I help you?",
        "bye": "Goodbye! Have a great day!",
        "goodbye": "Goodbye! Feel free to ask if you need help again.",
        "default": "I heard: '" + command + "'. How can I assist you further?"
      },
      "hi-IN": {
        "नमस्ते": "नमस्ते! आज मैं आपकी कैसे सहायता कर सकता हूँ?",
        "हैलो": "हैलो! मैं आपका आवाज़ सहायक हूँ।",
        "हाय": "हाय! आज मैं आपकी कैसे सहायता कर सकता हूँ?",
        "सहायता": "मैं वेबसाइट में नेवीगेट करने में आपकी सहायता कर सकता हूँ। कहिए 'होम पर जाएं' या 'कार्ट खोलें'।",
        "मदद": "मैं आपकी मदद कर सकता हूँ। कहिए 'होम पर जाएं' या 'कार्ट खोलें'।",
        "आप क्या कर सकते हैं": "मैं पेज नेवीगेशन, ऑर्डर चेक करने और बुनियादी सवालों के जवाब में सहायता कर सकता हूँ।",
        "धन्यवाद": "आपका स्वागत है! क्या मैं कुछ और सहायता कर सकता हूँ?",
        "शुक्रिया": "कोई बात नहीं! खुशी हुई मदद करके।",
        "आप कैसे हैं": "मैं बढ़िया हूँ! आपकी सेवा के लिए तैयार हूँ।",
        "सुप्रभात": "सुप्रभात! आज मैं आपकी कैसे सहायता कर सकता हूँ?",
        "नमस्कार": "नमस्कार! मैं आपकी कैसे मदद कर सकता हूँ?",
        "अलविदा": "अलविदा! आपका दिन शुभ हो!",
        "बाय": "अलविदा! फिर से सहायता की जरूरत हो तो पूछिए।",
        "default": "मैंने सुना: '" + command + "'। मैं आपकी और कैसे सहायता कर सकता हूँ?"
      }
    };

    const langResponses = responses[language] || responses["en-US"];
    return langResponses[command.toLowerCase()] || langResponses["default"];
  };

  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = language;
      speech.rate = 0.9;
      speech.pitch = 1;
      speech.volume = 0.8;
      
      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);
      speech.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(speech);
    }
  };

  const handleNavigation = (command) => {
    const currentLang = language === "hi-IN" ? "hi" : "en";
    const commands = voiceCommands.navigation[currentLang];
    
    for (const [phrase, route] of Object.entries(commands)) {
      if (command.includes(phrase.toLowerCase())) {
        navigate(route);
        const confirmMsg = language === "hi-IN" 
          ? `${phrase} पर जा रहे हैं।`
          : `Navigating to ${phrase.replace("go to ", "").replace("open ", "")}`;
        
        setResponse(confirmMsg);
        speakResponse(confirmMsg);
        return true;
      }
    }
    return false;
  };

  const quickActions = [
    { icon: Home, label: language === "hi-IN" ? "होम" : "Home", route: "/" },
    { icon: ShoppingCart, label: language === "hi-IN" ? "कार्ट" : "Cart", route: "/cart" },
    { icon: Package, label: language === "hi-IN" ? "उत्पाद" : "Products", route: "/collection" },
    { icon: User, label: language === "hi-IN" ? "ऑर्डर" : "Orders", route: "/orders" }
  ];

  const handleQuickAction = (route, label) => {
    navigate(route);
    const msg = language === "hi-IN" ? `${label} पर जा रहे हैं।` : `Navigating to ${label}`;
    setResponse(msg);
    speakResponse(msg);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Main Voice Button */}
      <div className="relative">
        <button
          onClick={toggleListening}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setTimeout(() => setIsExpanded(false), 2000)}
          className={`w-14 h-14 flex items-center justify-center rounded-full text-white shadow-lg transform transition-all duration-300 hover:scale-110 ${
            isListening 
              ? "bg-red-500 animate-pulse shadow-red-200" 
              : "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-200"
          }`}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        {/* Listening indicator */}
        {isListening && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <Volume2 size={12} className="text-white" />
          </div>
        )}
      </div>

      {/* Expanded Panel */}
      {isExpanded && (
        <div 
          className="absolute bottom-16 left-0 bg-white rounded-2xl shadow-2xl p-4 w-80 transform transition-all duration-300 border border-gray-100"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Mic size={18} className="text-blue-500" />
              {language === "hi-IN" ? "आवाज़ सहायक" : "Voice Assistant"}
            </h3>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Languages size={16} className="text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-50 text-sm px-2 py-1 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="en-US">English</option>
                <option value="hi-IN">हिन्दी</option>
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              {language === "hi-IN" ? "त्वरित कार्य:" : "Quick Actions:"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.route, action.label)}
                  className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors text-sm hover:text-blue-600"
                >
                  <action.icon size={16} />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="mb-3">
            <div className={`text-sm px-3 py-2 rounded-lg ${
              isListening 
                ? "bg-red-50 text-red-700 border border-red-200" 
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}>
              {isListening 
                ? (language === "hi-IN" ? "🎤 सुन रहा हूँ..." : "🎤 Listening...")
                : (language === "hi-IN" ? "माइक्रोफ़ोन बटन दबाएं" : "Click microphone to start")
              }
            </div>
          </div>

          {/* Response */}
          {response && (
            <div 
              ref={responseRef}
              className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 text-sm text-gray-800 max-h-20 overflow-y-auto"
            >
              <div className="flex items-start gap-2">
                <Volume2 size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">{response}</p>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-3 text-xs text-gray-500 border-t border-gray-100 pt-2">
            {language === "hi-IN" ? (
              <div>
                <p className="mb-1">कहिए: "होम पर जाएं", "कार्ट खोलें"</p>
                <p>"मेरे ऑर्डर", "नमस्ते", "सहायता"</p>
              </div>
            ) : (
              <div>
                <p className="mb-1">Try: "Go to home", "Open cart"</p>
                <p>"Check my orders", "Hello", "Help"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;