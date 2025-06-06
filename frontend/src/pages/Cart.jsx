import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { t } = useTranslation();
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      let outOfStockFound = false;

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const productData = products.find((product) => product._id === items);
            if (productData?.stock === 0) outOfStockFound = true; // Check if product is out of stock

            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
              stock: productData?.stock || 0,
            });
          }
        }
      }

      setCartData(tempData);
      setIsOutOfStock(outOfStockFound); // Update state if any product is out of stock
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={t('cart_heading1')} text2={t('cart_heading2')} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          if (!productData) {
            console.warn(`Product with ID ${item._id} not found`);
            return null;
          }

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt={productData.name} />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  {productData.stock === 0 ? (
                    <p className='text-red-500 font-semibold'>Out of Stock</p>
                  ) : (
                    <p className='text-green-500'>In Stock</p>
                  )}
                </div>
              </div>
              
              {/* Disable input if stock is 0 */}
              <input 
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value > 0) updateQuantity(item._id, item.size, value);
                }} 
                className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                type='number' 
                min={1} 
                defaultValue={item.quantity} 
                disabled={productData.stock === 0} 
              />

              <img 
                onClick={() => updateQuantity(item._id, item.size, 0)} 
                className='w-4 mr-4 sm:w-5 cursor-pointer hover:scale-110 shadow-md hover:shadow-lg' 
                src={assets.bin_icon} 
                alt='Remove' 
              />
            </div>
          );
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button 
              onClick={() => {
                if (!isOutOfStock) navigate('/place-order');
              }} 
              className={`bg-green-500 text-white text-sm my-8 px-8 py-3 hover:scale-105 shadow-md hover:shadow-lg rounded ${
                isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'Some items are out of stock' : t('PROCEED TO CHECKOUT')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
