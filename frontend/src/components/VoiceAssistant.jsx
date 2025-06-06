import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    speechRecognition.lang = language;
    speechRecognition.continuous = false;
    speechRecognition.interimResults = false;

    speechRecognition.onresult = async (event) => {
      const voiceText = event.results[0][0].transcript.toLowerCase();
      handleNavigation(voiceText); // Check if command is for navigation
      fetchResponse(voiceText);
    };

    speechRecognition.onend = () => {
      setIsListening(false);
    };

    setRecognition(speechRecognition);
  }, [language]);

  const toggleListening = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.lang = language;
      setIsListening(true);
      recognition.start();
    }
  };

  const fetchResponse = async (voiceText) => {
    try {
      const res = await fetch("http://localhost:4000/api/voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: voiceText, lang: language }),
      });
      const data = await res.json();
      setResponse(data.reply);
      speakResponse(data.reply);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsListening(false);
    }
  };

  const speakResponse = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = language;
    window.speechSynthesis.speak(speech);
  };

  // 🛠 Function to Handle Navigation Commands
  const handleNavigation = (command) => {
    if (command.includes("go to home") || command.includes("open home")) {
      navigate("/");
      speakResponse("Navigating to home page.");
    } else if (command.includes("go to cart") || command.includes("open cart")) {
      navigate("/cart");
      speakResponse("Opening your cart.");
    } else if (command.includes("show products") || command.includes("go to products")) {
      navigate("/products");
      speakResponse("Navigating to the products page.");
    } else if (command.includes("check my orders") || command.includes("go to orders")) {
      navigate("/orders");
      speakResponse("Opening your orders.");
    } else if (command.includes("logout")) {
      navigate("/logout");
      speakResponse("Logging you out.");
    }
  };

  return (
    <div className="fixed bottom-10 left-2 md:bottom-14 md:left-4 flex flex-col items-center space-y-2">
      <button
        onClick={toggleListening}
        className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl transition-all shadow-lg ${
          isListening ? "bg-red-500 animate-pulse" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {isListening ? "⏹️" : "🎤"}
      </button>

      <div className="relative w-28">
        <select
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-white text-black px-2 py-1 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
        >
          <option value="en-US">English</option>
          <option value="hi-IN">हिन्दी</option>
        </select>
      </div>

      {response && (
        <p className="bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg max-w-[250px] text-center">
          {response}
        </p>
      )}
    </div>
  );
};

export default VoiceAssistant;
