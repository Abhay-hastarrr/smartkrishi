import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { assets } from "../assets/assets";

const ProductItem = ({ id, image = [], name, price }) => {
  const { currency, products, addToCart, buyNow } = useContext(ShopContext); 
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);
  const [productData, setProductData] = useState(null);
  const [translatedName, setTranslatedName] = useState(name);
  const [isTranslating, setIsTranslating] = useState(false);

  // Translation cache: { language: { productId: translatedName } }
  const translationCache = useRef({});

  // Fetch product data (for stock info)
  useEffect(() => {
    const foundProduct = products.find((item) => item._id === id);
    if (foundProduct) setProductData(foundProduct);
  }, [id, products]);

  // Safe MyMemory translation function
  const translateText = useCallback(async (text, targetLang) => {
    if (targetLang === 'en') return text;

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

      if (data.responseStatus === 200 && data.responseData?.translatedText) return data.responseData.translatedText;
      return text;
    } catch {
      return text;
    }
  }, []);

  // Translate product name with caching
  const translateProductName = useCallback(async () => {
    if (!name || i18n.language === 'en') {
      setTranslatedName(name);
      return;
    }

    if (translationCache.current[i18n.language]?.[id]) {
      setTranslatedName(translationCache.current[i18n.language][id]);
      return;
    }

    setIsTranslating(true);
    try {
      const translated = await translateText(name, i18n.language);
      setTranslatedName(translated);

      translationCache.current[i18n.language] = translationCache.current[i18n.language] || {};
      translationCache.current[i18n.language][id] = translated;
    } catch {
      setTranslatedName(name);
    } finally {
      setIsTranslating(false);
    }
  }, [id, name, i18n.language, translateText]);

  useEffect(() => { translateProductName(); }, [translateProductName]);

  // Handle Buy Now
  const handleBuyNow = () => {
    if (productData?.stock > 0) {
      buyNow(productData._id);
      navigate("/place-order");
    }
  };

  if (!productData) return <div className="p-10 text-center text-gray-500">Loading product...</div>;

  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white transition duration-300 hover:shadow-lg">
      {/* Product Image */}
      <Link onClick={() => window.scrollTo(0, 0)} to={`/product/${id}`}>
        <div className="relative overflow-hidden">
          <img
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            src={image[0]}
            alt={translatedName || name}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 text-center">
        <p className="text-sm font-semibold text-gray-800 truncate">
          {isTranslating ? (
            <span className="animate-pulse bg-gray-200 rounded inline-block w-3/4 h-4"></span>
          ) : translatedName}
        </p>
        <p className="text-lg font-bold text-green-600 mt-2">{currency}{price}</p>

        <div className="flex flex-col gap-2 mt-4">
          {productData?.stock > 0 ? (
            <>
              <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => addToCart(id)}
                className="bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition duration-300 hover:bg-gray-600"
              >
                {hovered ? (
                  <img src={assets.cart_icon} alt="Cart Icon" className="w-5 h-5" />
                ) : (
                  t("add_to_cart")
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium transition duration-300 hover:bg-gray-600"
              >
                {t("proceed_to_checkout")}
              </button>
            </>
          ) : (
            <p className="text-red-500 font-bold text-lg mt-4">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
