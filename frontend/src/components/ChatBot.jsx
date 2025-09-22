import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, ChevronLeft, Bot, User, Move, Maximize2 } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: window.innerHeight - 420 });

  // Resizing state
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({ width: 384, height: 384 }); // 24rem = 384px
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const chatRef = useRef(null);

  // Chat flow configuration
  const chatFlow = {
    welcome: {
      message: "👋 Hello! I'm your AgriNext Assistant. How can I help you today?",
      options: [
        { text: "👤 Account", nextStep: "account" },
        { text: "📦 Product", nextStep: "product" },
        { text: "🚚 Shipping", nextStep: "shipping" },
        { text: "🛠️ Support", nextStep: "support" }
      ]
    },
    account: {
      message: "Sure! What do you want to know about accounts?",
      options: [
        { text: "➕ Create Account", nextStep: "createAccount" },
        { text: "🔑 Reset Password", nextStep: "resetPassword" },
        { text: "✏️ Update Profile", nextStep: "updateProfile" },
        { text: "⬅️ Back to Main Menu", nextStep: "welcome" }
      ]
    },
    product: {
      message: "Great! What product information are you looking for?",
      options: [
        { text: "🌱 Seeds & Plants", nextStep: "seeds" },
        { text: "🧪 Fertilizers", nextStep: "fertilizers" },
        { text: "🔧 Tools & Equipment", nextStep: "tools" },
        { text: "⬅️ Back to Main Menu", nextStep: "welcome" }
      ]
    },
    shipping: {
      message: "I can help you with shipping information! What do you need?",
      options: [
        { text: "📍 Track Order", nextStep: "trackOrder" },
        { text: "💰 Shipping Costs", nextStep: "shippingCosts" },
        { text: "⏰ Delivery Times", nextStep: "deliveryTimes" },
        { text: "⬅️ Back to Main Menu", nextStep: "welcome" }
      ]
    },
    support: {
      message: "I'm here to help! What kind of support do you need?",
      options: [
        { text: "🐛 Report Bug", nextStep: "reportBug" },
        { text: "💬 Live Chat", nextStep: "liveChat" },
        { text: "📞 Contact Info", nextStep: "contactInfo" },
        { text: "⬅️ Back to Main Menu", nextStep: "welcome" }
      ]
    },
    createAccount: {
      message: "🎉 Creating an account is easy! Visit our signup page and fill out the form. You'll need a valid email address and phone number.",
      options: [
        { text: "⬅️ Back to Account", nextStep: "account" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    resetPassword: {
      message: "🔑 To reset your password, click 'Forgot Password' on the login page. You'll receive a reset link via email within 5 minutes.",
      options: [
        { text: "⬅️ Back to Account", nextStep: "account" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    updateProfile: {
      message: "✏️ You can update your profile information in the 'My Account' section after logging in. Change your name, address, phone number, and preferences there.",
      options: [
        { text: "⬅️ Back to Account", nextStep: "account" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    seeds: {
      message: "🌱 We offer premium seeds for vegetables, fruits, herbs, and flowers. All seeds are tested for high germination rates!",
      options: [
        { text: "🥕 Vegetable Seeds", nextStep: "vegetableSeeds" },
        { text: "🍎 Fruit Seeds", nextStep: "fruitSeeds" },
        { text: "⬅️ Back to Products", nextStep: "product" }
      ]
    },
    fertilizers: {
      message: "🧪 Our fertilizers are organic and chemical-based options for all crop types. NPK ratios available for different growth stages.",
      options: [
        { text: "🌿 Organic Options", nextStep: "organicFertilizers" },
        { text: "⚗️ Chemical Options", nextStep: "chemicalFertilizers" },
        { text: "⬅️ Back to Products", nextStep: "product" }
      ]
    },
    tools: {
      message: "🔧 We have hand tools, power tools, irrigation equipment, and greenhouse supplies for all your farming needs.",
      options: [
        { text: "✋ Hand Tools", nextStep: "handTools" },
        { text: "⚡ Power Tools", nextStep: "powerTools" },
        { text: "⬅️ Back to Products", nextStep: "product" }
      ]
    },
    trackOrder: {
      message: "📍 To track your order, use your order number in the 'Track Order' section of your account, or check the tracking link in your confirmation email.",
      options: [
        { text: "⬅️ Back to Shipping", nextStep: "shipping" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    shippingCosts: {
      message: "💰 Shipping costs vary by location and weight. Standard shipping is $5.99, Express is $12.99. Free shipping on orders over $75!",
      options: [
        { text: "⬅️ Back to Shipping", nextStep: "shipping" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    deliveryTimes: {
      message: "⏰ Standard delivery: 5-7 business days. Express delivery: 2-3 business days. Same-day delivery available in select cities.",
      options: [
        { text: "⬅️ Back to Shipping", nextStep: "shipping" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    reportBug: {
      message: "🐛 Sorry to hear about the issue! Please email us at bugs@agrinext.com with details about the problem and screenshots if possible.",
      options: [
        { text: "⬅️ Back to Support", nextStep: "support" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    liveChat: {
      message: "💬 Our live chat is available Monday-Friday, 9 AM - 6 PM EST. Click the blue chat icon on our website to connect with a representative.",
      options: [
        { text: "⬅️ Back to Support", nextStep: "support" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    contactInfo: {
      message: "📞 Contact us at:\n📧 support@agrinext.com\n📱 1-800-AGRI-NEXT\n🏢 123 Farm Lane, Agriculture City, AC 12345",
      options: [
        { text: "⬅️ Back to Support", nextStep: "support" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    vegetableSeeds: {
      message: "🥕 Popular vegetable seeds: Tomatoes, Carrots, Lettuce, Peppers, Onions. All varieties are heirloom and non-GMO!",
      options: [
        { text: "⬅️ Back to Seeds", nextStep: "seeds" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    fruitSeeds: {
      message: "🍎 Fruit seeds available: Strawberries, Melons, Citrus varieties, Berry bushes. Perfect for home gardens and commercial farming!",
      options: [
        { text: "⬅️ Back to Seeds", nextStep: "seeds" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    organicFertilizers: {
      message: "🌿 Organic fertilizers include compost, manure-based, bone meal, and fish emulsion. Perfect for sustainable farming practices!",
      options: [
        { text: "⬅️ Back to Fertilizers", nextStep: "fertilizers" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    chemicalFertilizers: {
      message: "⚗️ Chemical fertilizers with various NPK ratios: 10-10-10 (balanced), 20-10-10 (growth), 10-20-10 (flowering), 10-10-20 (fruiting).",
      options: [
        { text: "⬅️ Back to Fertilizers", nextStep: "fertilizers" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    handTools: {
      message: "✋ Hand tools include: Shovels, Hoes, Pruning shears, Trowels, Watering cans, Garden gloves. All made with durable materials!",
      options: [
        { text: "⬅️ Back to Tools", nextStep: "tools" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    },
    powerTools: {
      message: "⚡ Power tools available: Tillers, Chainsaws, Leaf blowers, Pressure washers, Electric pruners. Professional grade equipment!",
      options: [
        { text: "⬅️ Back to Tools", nextStep: "tools" },
        { text: "🏠 Main Menu", nextStep: "welcome" }
      ]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      // Initialize chat with welcome message
      setTimeout(() => {
        addBotMessage(chatFlow.welcome.message, 'welcome');
      }, 500);
    }
  }, [isOpen]);

  // Dragging functionality
  const handleMouseDown = (e) => {
    if (e.target.closest('.resize-handle') || e.target.closest('button')) return;
    
    setIsDragging(true);
    const rect = chatRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y));
      setPosition({ x: newX, y: newY });
    }

    if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      
      const newWidth = Math.max(300, Math.min(800, resizeStart.width + deltaX));
      const newHeight = Math.max(200, Math.min(600, resizeStart.height + deltaY));
      
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Resizing functionality
  const handleResizeStart = (e) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = 'auto';
      };
    }
  }, [isDragging, isResizing, dragOffset, resizeStart]);

  const addBotMessage = (message, step) => {
    setIsTyping(true);
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'bot',
        message: message,
        step: step,
        timestamp: new Date().getTime()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (message, nextStep) => {
    // Add user message
    setChatHistory(prev => [...prev, {
      type: 'user',
      message: message,
      timestamp: new Date().getTime()
    }]);

    // Update current step and add bot response
    setCurrentStep(nextStep);
    
    setTimeout(() => {
      if (chatFlow[nextStep]) {
        addBotMessage(chatFlow[nextStep].message, nextStep);
      }
    }, 800);
  };

  const getCurrentOptions = () => {
    return chatFlow[currentStep]?.options || [];
  };

  const resetChat = () => {
    setChatHistory([]);
    setCurrentStep('welcome');
    setTimeout(() => {
      addBotMessage(chatFlow.welcome.message, 'welcome');
    }, 500);
  };

  return (
    <div className="fixed top-0 left-0 z-50 pointer-events-none">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse pointer-events-auto"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden pointer-events-auto select-none"
          style={{
            position: 'absolute',
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {/* Header */}
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-semibold">AgriNext Assistant</h3>
                <p className="text-xs text-green-100">Online now</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-1 text-green-100">
                <Move size={14} />
              </div>
              <button
                onClick={resetChat}
                className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                title="Reset Chat"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-green-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow-sm border'
                  }`}>
                    {msg.type === 'bot' && (
                      <div className="flex items-center space-x-2 mb-1">
                        <Bot size={14} className="text-green-500" />
                        <span className="text-xs text-gray-500 font-medium">AgriNext Bot</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-sm border px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <Bot size={14} className="text-green-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Options/Input Area */}
          {!isTyping && (
            <div className="border-t bg-white p-4">
              <div className="space-y-2">
                {getCurrentOptions().map((option, index) => (
                  <button
                    key={index}
                    onClick={() => addUserMessage(option.text, option.nextStep)}
                    className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-green-50 border border-gray-200 hover:border-green-300 rounded-xl transition-all duration-200 text-sm hover:shadow-sm"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;