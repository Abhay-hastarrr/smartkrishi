import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext"; 
import { assets } from "../assets/assets"; 
import RelatedProducts from "../components/RelatedProducts";
import { useTranslation } from "react-i18next";
import axios from 'axios';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, buyNow } = useContext(ShopContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [weight, setWeight] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedName, setTranslatedName] = useState("");
  const [translatedDescription, setTranslatedDescription] = useState("");

  // Ref to cache translations: { language: { name, description } }
  const translationCache = useRef({});

  // MyMemory Translation function (safe)
  const translateText = async (text, targetLang) => {
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
      try {
        data = await response.json();
      } catch (err) {
        console.warn("Translation returned non-JSON, fallback to original:", err);
        return text;
      }

      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText;
      } else {
        console.warn("Translation failed, fallback to original:", data);
        return text;
      }
    } catch (err) {
      console.warn("Translation request failed:", err);
      return text;
    }
  };

  // Translate product content with caching
  const translateProductContent = async (product, language) => {
    if (!product) return;
    if (translationCache.current[language]) {
      // Use cached translation
      setTranslatedName(translationCache.current[language].name);
      setTranslatedDescription(translationCache.current[language].description);
      return;
    }

    setIsTranslating(true);

    try {
      const [nameTranslated, descTranslated] = await Promise.all([
        translateText(product.name, language),
        translateText(product.description, language)
      ]);

      setTranslatedName(nameTranslated);
      setTranslatedDescription(descTranslated);

      // Cache it
      translationCache.current[language] = {
        name: nameTranslated,
        description: descTranslated
      };
    } finally {
      setIsTranslating(false);
    }
  };

  // Fetch product data from context
  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
      setWeight(foundProduct.weight || "N/A");

      // Default translation = original English
      setTranslatedName(foundProduct.name);
      setTranslatedDescription(foundProduct.description);

      if (i18n.language !== 'en') {
        translateProductContent(foundProduct, i18n.language);
      }
    }
  }, [productId, products]);

  // Watch language changes
  useEffect(() => {
    if (productData) {
      if (i18n.language === 'en') {
        setTranslatedName(productData.name);
        setTranslatedDescription(productData.description);
      } else {
        translateProductContent(productData, i18n.language);
      }
    }
  }, [i18n.language, productData]);

  // Update stock safely
  const updateStock = async (productId, quantitySold) => {
    try {
      const { data } = await axios.post('/api/single', { productId });
      if (!data.success) return;

      const latestStock = data.product.stock;
      const newStock = latestStock - quantitySold;
      if (newStock < 0) return;

      const response = await axios.post('/api/update-stock', { id: productId, stock: newStock });
      if (response.status === 200) {
        setProductData(prev => ({ ...prev, stock: newStock }));
      }
    } catch (err) {
      console.warn("Stock update failed:", err);
    }
  };

  const handleAddToCart = async () => {
    if (productData.stock > 0) {
      addToCart(productData._id);
      await updateStock(productData._id, 1);
    }
  };

  const handleBuyNow = async () => {
    if (productData.stock > 0) {
      buyNow(productData._id);
      await updateStock(productData._id, 1);
      navigate("/place-order");
    }
  };

  if (!productData) {
    return <div className="p-10 text-center text-gray-500">Loading product...</div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, idx) => (
              <img
                key={idx}
                onClick={() => setImage(item)}
                src={item}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={productData.name}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {isTranslating ? (
              <span className="animate-pulse bg-gray-200 rounded inline-block w-48 h-8"></span>
            ) : translatedName}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => <img key={i} src={assets.star_icon} className="w-3.5" alt="" />)}
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {isTranslating ? (
              <span className="animate-pulse bg-gray-200 rounded inline-block w-full h-20"></span>
            ) : translatedDescription}
          </p>
          <h1 className="mt-5 text-gray-500 md:w-4/5">{weight}</h1>

          {productData.stock > 0 ? (
            <>
              <button onClick={handleAddToCart} className="bg-green-500 text-white px-8 py-3 text-sm active:bg-gray-700 hover:scale-105 shadow-lg rounded">
                {t("add_to_cart")}
              </button>
              <button onClick={handleBuyNow} className="bg-green-500 text-white px-8 py-3 text-sm active:bg-gray-700 hover:scale-105 shadow-lg rounded mx-2">
                {t("proceed_to_checkout")}
              </button>
            </>
          ) : (
            <p className="mt-5 text-red-500 font-bold text-lg">Out of Stock</p>
          )}

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>{t("original_product")}</p>
            <p>{t("cod_available")}</p>
            <p>{t("easy_return")}</p>
          </div>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
