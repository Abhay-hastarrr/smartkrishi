import React, { useContext, useState, useEffect } from "react";
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
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [weight, setWeight] = useState("");
  const { t, i18n } = useTranslation();
  
  // State for translated content
  const [translatedName, setTranslatedName] = useState("");
  const [translatedDescription, setTranslatedDescription] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  // MyMemory Translation function
  const translateText = async (text, targetLang) => {
    // If target language is English, return original text
    if (targetLang === 'en') {
      return text;
    }

    // Language code mapping for MyMemory API
    const langCodeMap = {
      'hi': 'hi-IN',  // Hindi
      'bn': 'bn-IN',  // Bengali
      'ta': 'ta-IN',  // Tamil
      'te': 'te-IN',  // Telugu
      'mr': 'mr-IN',  // Marathi
      'gu': 'gu-IN',  // Gujarati
      'pa': 'pa-IN',  // Punjabi
      'awa': 'hi-IN', // Awadhi (using Hindi as fallback)
      'bho': 'hi-IN'  // Bhojpuri (using Hindi as fallback)
    };

    const targetLangCode = langCodeMap[targetLang] || targetLang;

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en-GB|${targetLangCode}`
      );
      
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData.translatedText) {
        return data.responseData.translatedText;
      } else {
        console.error('Translation failed:', data);
        return text; // Return original text if translation fails
      }
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text on error
    }
  };

  // Function to translate product content
  const translateProductContent = async (product, language) => {
    if (!product) return;
    
    setIsTranslating(true);
    
    try {
      // Translate name and description in parallel
      const [translatedNameResult, translatedDescResult] = await Promise.all([
        translateText(product.name, language),
        translateText(product.description, language)
      ]);
      
      setTranslatedName(translatedNameResult);
      setTranslatedDescription(translatedDescResult);
    } catch (error) {
      console.error('Error translating product content:', error);
      // Fallback to original text
      setTranslatedName(product.name);
      setTranslatedDescription(product.description);
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
      
      // Set initial translated content
      setTranslatedName(foundProduct.name);
      setTranslatedDescription(foundProduct.description);
      
      // Translate if not in English
      if (i18n.language !== 'en') {
        translateProductContent(foundProduct, i18n.language);
      }
    }
  }, [productId, products]);

  // Watch for language changes
  useEffect(() => {
    if (productData) {
      if (i18n.language === 'en') {
        // Reset to original English content
        setTranslatedName(productData.name);
        setTranslatedDescription(productData.description);
      } else {
        // Translate to selected language
        translateProductContent(productData, i18n.language);
      }
    }
  }, [i18n.language, productData]);

  // Function to update stock in the database
  const updateStock = async (productId, quantitySold) => {
    try {
      // Fetch the latest stock before updating
      const { data } = await axios.post('/api/single', { productId });

      if (!data.success) {
        console.error("Failed to fetch latest stock:", data.message);
        return;
      }

      const latestStock = data.product.stock;
      const newStock = latestStock - quantitySold;

      if (newStock < 0) {
        console.error("Insufficient stock.");
        return;
      }

      // Send updated stock to the backend
      const response = await axios.post('/api/update-stock', {
        id: productId, 
        stock: newStock, 
      });

      if (response.status === 200) {
        setProductData((prevData) => ({
          ...prevData,
          stock: newStock, // Update stock in UI
        }));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = async () => {
    if (productData.stock > 0) {
      addToCart(productData._id);
      await updateStock(productData._id, 1);
    }
  };

  // Handle Buy Now
  const handleBuyNow = async () => {
    if (productData.stock > 0) {
      buyNow(productData._id);
      await updateStock(productData._id, 1);
      navigate("/place-order");
    }
  };

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Image & Info */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Product Images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={productData.name}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">
            {isTranslating ? (
              <span className="animate-pulse bg-gray-200 rounded inline-block w-48 h-8"></span>
            ) : (
              translatedName
            )}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            {/* Rating */}
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {isTranslating ? (
              <span className="animate-pulse bg-gray-200 rounded inline-block w-full h-20"></span>
            ) : (
              translatedDescription
            )}
          </p>
          <h1 className="mt-5 text-gray-500 md:w-4/5">{weight}</h1>

          {/* Stock Check & Buttons */}
          {productData.stock > 0 ? (
            <>
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white px-8 py-3 text-sm active:bg-gray-700 hover:scale-105 shadow-lg rounded"
              >
                {t("add_to_cart")}
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-500 text-white px-8 py-3 text-sm active:bg-gray-700 hover:scale-105 shadow-lg rounded mx-2"
              >
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

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;