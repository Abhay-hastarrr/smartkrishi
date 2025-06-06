import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useTranslation } from 'react-i18next';

const LatestCollection = () => {
    const { t } = useTranslation();
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    const scrollRef = useRef(null); // 👈 Reference for scrolling

    useEffect(() => {
        setLatestProducts(products.slice(0, 50));
    }, [products]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // 👈 Scroll Left
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' }); // 👈 Scroll Right
    };

    return (
        <div id="latest-collection" className="my-10 relative">
            <div className="text-center py-8 text-3xl">
                <Title text1={t('latest')} text2={t('collection')} />
            </div>

            {/* Scrollable Container */}
            <div className="relative">
                {/* Left Scroll Button */}
                <button 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden sm:block"
                    onClick={scrollLeft}
                >
                    ◀
                </button>

                {/* Product List (Horizontal Scroll) */}
                <div 
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide px-4"
                >
                    {
                        latestProducts.map((item, index) => (
                            <div key={index} className="flex-shrink-0 w-60">
                                <ProductItem 
                                    id={item._id} 
                                    image={item.image} 
                                    name={item.name} 
                                    price={item.price} 
                                />
                            </div>
                        ))
                    }
                </div>

                {/* Right Scroll Button */}
                <button 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden sm:block"
                    onClick={scrollRight}
                >
                    ▶
                </button>
            </div>
        </div>
    );
};

export default LatestCollection;
