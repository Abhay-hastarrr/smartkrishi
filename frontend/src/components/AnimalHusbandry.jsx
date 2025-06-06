import React, { useContext, useEffect, useState, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { useTranslation } from 'react-i18next';

const AnimalHusbandry = () => {
    const { t } = useTranslation();
    const { products } = useContext(ShopContext);
    const [animalProducts, setAnimalProducts] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const filteredProducts = products.filter(item => item.category === "Animal Husbandry");
        setAnimalProducts(filteredProducts);
    }, [products]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="my-10 relative">
            <div className="text-center py-8 text-3xl">
                <Title text2={t('animal_husbandry')} />
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
                    {animalProducts.map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-60">
                            <ProductItem 
                                id={item._id} 
                                image={item.image} 
                                name={item.name} 
                                price={item.price} 
                            />
                        </div>
                    ))}
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

export default AnimalHusbandry;
