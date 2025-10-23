
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductsItem from '../components/ProductItem';
import { useTranslation } from 'react-i18next';

const CategorySubcategoryPage = () => {
  const { t } = useTranslation();
  const { products } = useContext(ShopContext);
  const { category, subcategory } = useParams();
  const [filterProducts, setFilterProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [stockFilter, setStockFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const applyFilter = () => {
    let filtered = products.slice();

    // Filter by category and subcategory from URL
    if (category) {
      filtered = filtered.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
    if (subcategory) {
      filtered = filtered.filter(item => item.subCategory.toLowerCase() === subcategory.toLowerCase());
    }

    // Stock filter
    if (stockFilter) {
      filtered = filtered.filter(item => item.stock > 0);
    }

    // Sorting
    if (sortBy === 'price_low_high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high_low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilterProducts(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilter();
  }, [products, category, subcategory, sortBy, stockFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filterProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(filterProducts.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      <div className='min-w-60 mt-10'>
        {/* Sort and Stock Filter */}
        <div className='mt-6 border border-gray-300 p-4'>
          <p className='text-lg'>{t('sort_by')}:</p>
          <select className='border p-2 w-full mt-2' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value=''>{t('select')}</option>
            <option value='price_low_high'>{t('sort_low_high')}</option>
            <option value='price_high_low'>{t('sort_high_low')}</option>
            <option value='name'>{t('sort_name')}</option>
          </select>
          <div className='mt-4'>
            <label className='flex gap-2'>
              <input type='checkbox' checked={stockFilter} onChange={() => setStockFilter(!stockFilter)} />
              {t('only_in_stock')}
            </label>
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <Title text1={t(category)} text2={t(subcategory)} />
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {currentProducts.length > 0 ? (
            currentProducts.map((item, index) => (
              <ProductsItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          ) : (
            <p>No products found for this category and subcategory.</p>
          )}
        </div>

        {/* Pagination */}
        {Math.ceil(filterProducts.length / itemsPerPage) > 1 && (
          <div className='flex justify-center items-center mt-8 gap-2'>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className='px-3 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {t('previous')}
            </button>
            
            {[...Array(Math.ceil(filterProducts.length / itemsPerPage))].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-2 border rounded ${
                  currentPage === index + 1 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filterProducts.length / itemsPerPage)}
              className='px-3 py-2 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {t('next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySubcategoryPage;
