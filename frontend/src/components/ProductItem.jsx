import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { assets } from "../assets/assets"; // Import assets

const ProductItem = ({ id, image, name, price }) => {
  const { currency, products, addToCart } = useContext(ShopContext); // Removed buyNow
  const { t } = useTranslation();
  const navigate = useNavigate(); // Hook for navigation
  const [hovered, setHovered] = useState(false);
  const [productData, setProductData] = useState(null);

  // Fetch product data to check stock
  useEffect(() => {
    const foundProduct = products.find((item) => item._id === id);
    if (foundProduct) {
      setProductData(foundProduct);
    }
  }, [id, products]);

  // Handle Buy Now (without adding to cart)
  const handleBuyNow = () => {
    if (productData?.stock > 0) {
      navigate("/place-order"); // Navigate to checkout without adding to cart
    }
  };

  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white transition duration-300 hover:shadow-lg">
      {/* Product Image */}
      <Link onClick={() => scrollTo(0, 0)} to={`/product/${id}`}>
        <div className="relative overflow-hidden">
          <img
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            src={image[0]}
            alt={name}
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 text-center">
        <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
        <p className="text-lg font-bold text-green-600 mt-2">
          {currency}
          {price}
        </p>

        {/* Action Buttons or Out of Stock Message */}
        <div className="flex flex-col gap-2 mt-4">
          {productData?.stock > 0 ? (
            <>
              {/* Add to Cart Button with Hover Effect */}
              <button
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => addToCart(id)}
                className="bg-green-600 text-white flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition duration-300 hover:bg-gray-600"
              >
                {hovered ? (
                  <img src={assets.cart_icon} alt="Cart Icon" className="w-5 h-5 " />
                ) : (
                  t("add_to_cart")
                )}
              </button>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow} // Corrected Buy Now function
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
