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

    // Load voices when component mounts or language changes
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Available voices:", voices.map(v => `${v.name} (${v.lang})`));
    };

    // Load voices initially and on voiceschanged event
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

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
      window.speechSynthesis.onvoiceschanged = null;
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
          className="absolute bottom-20 left-0 bg-white rounded-2xl shadow-2xl p-6 w-96 transform transition-all duration-300 border-2 border-green-100 backdrop-blur-sm"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          style={{
            background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)',
            boxShadow: '0 25px 50px -12px rgba(34, 197, 94, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.05)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <Mic size={20} className="text-white" />
              </div>
              <span className="text-lg">
                {language === "hi-IN" ? "आवाज़ सहायक" : "Voice Assistant"}
              </span>
            </h3>
            
            {/* Language Selector */}
            <div className="flex items-center gap-3 bg-green-50 rounded-xl p-2 border border-green-200">
              <Languages size={18} className="text-green-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-green-700 focus:outline-none cursor-pointer"
              >
                <option value="en-US">🇺🇸 English</option>
                <option value="hi-IN">🇮🇳 हिन्दी</option>
              </select>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-green-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {language === "hi-IN" ? "त्वरित कार्य" : "Quick Actions"}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.route, action.label)}
                  className="flex items-center gap-3 p-3 bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-xl transition-all duration-200 text-sm font-medium hover:shadow-md border border-green-100 hover:border-green-200 group"
                >
                  <div className="p-1.5 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    <action.icon size={16} className="text-green-600" />
                  </div>
                  <span className="text-green-800">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="mb-4">
            <div className={`text-sm px-4 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
              isListening 
                ? "bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200 shadow-sm" 
                : "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 shadow-sm"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                {isListening 
                  ? (language === "hi-IN" ? "🎤 सुन रहा हूँ..." : "🎤 Listening...")
                  : (language === "hi-IN" ? "माइक्रोफ़ोन बटन दबाएं" : "Click microphone to start")
                }
              </div>
            </div>
          </div>

          {/* Response */}
          {response && (
            <div 
              ref={responseRef}
              className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 border-2 border-green-200 rounded-xl p-4 text-sm text-gray-800 max-h-24 overflow-y-auto mb-4 shadow-inner"
            >
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-green-500 rounded-lg shadow-sm mt-0.5 flex-shrink-0">
                  <Volume2 size={14} className="text-white" />
                </div>
                <p className="leading-relaxed font-medium text-green-900">{response}</p>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="text-xs text-green-600 bg-green-50 rounded-xl p-3 border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="font-semibold text-green-700">
                {language === "hi-IN" ? "उदाहरण कमांड:" : "Example Commands:"}
              </span>
            </div>
            {language === "hi-IN" ? (
              <div className="space-y-1 text-green-600">
                <p>• "होम पर जाएं", "कार्ट खोलें"</p>
                <p>• "मेरे ऑर्डर", "नमस्ते", "सहायता"</p>
              </div>
            ) : (
              <div className="space-y-1 text-green-600">
                <p>• "Go to home", "Open cart"</p>
                <p>• "Check my orders", "Hello", "Help"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;