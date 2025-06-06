import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("selectedLanguage", selectedLang); // Save selected language
  };

  return (
    <div className="relative">
      <select 
        onChange={changeLanguage} 
        value={i18n.language} 
        className="block w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="bn">বাংলা (Bengali)</option>
        <option value="ta">தமிழ் (Tamil)</option>
        <option value="te">తెలుగు (Telugu)</option>
        <option value="mr">मराठी (Marathi)</option>
        <option value="gu">ગુજરાતી (Gujarati)</option>
        <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
        <option value="awa">Awadhi</option>
        <option value="bho">Bhojpuri</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
