import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", label: "English", flag: "EN" },
    { code: "hi", label: "हिन्दी", flag: "HI" },
    { code: "bn", label: "বাংলা", flag: "BN" },
    { code: "ta", label: "தமிழ்", flag: "TA" },
    { code: "te", label: "తెలుగు", flag: "TE" },
    { code: "mr", label: "मराठी", flag: "MR" },
    { code: "gu", label: "ગુજરાતી", flag: "GU" },
    { code: "pa", label: "ਪੰਜਾਬੀ", flag: "PA" },
    { code: "awa", label: "Awadhi", flag: "AW" },
    { code: "bho", label: "Bhojpuri", flag: "BH" },
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("selectedLanguage", langCode);
    setIsMenuOpen(false);
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === i18n.language);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = getCurrentLanguage();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Unified Toggle Button — Shows on ALL screens */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200"
        aria-label="Select Language"
      >
        <span className="text-sm font-medium">{currentLang?.label}</span>
        <span className="text-xl">{currentLang?.flag || "🌐"}</span>
        <svg
          className={`w-4 h-4 transform transition-transform duration-200 ${isMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Unified Dropdown Menu — Shows on ALL screens */}
      {isMenuOpen && (
        <div className="absolute z-50 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-3">
            <p className="text-sm font-semibold">Select Language</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors duration-150 ${
                  i18n.language === lang.code
                    ? "bg-green-50 border-l-4 border-green-500"
                    : ""
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span
                  className={`text-sm ${
                    i18n.language === lang.code
                      ? "font-semibold text-green-700"
                      : "text-gray-700"
                  }`}
                >
                  {lang.label}
                </span>
                {i18n.language === lang.code && (
                  <svg
                    className="w-4 h-4 text-green-500 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Optional: Keep floating label only on mobile */}
      <div className="sm:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">
        {currentLang?.label.split(" ")[0]}
      </div>
    </div>
  );
};

export default LanguageSwitcher;