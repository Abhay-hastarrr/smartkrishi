import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductsItem from '../components/ProductItem';
import { useTranslation } from 'react-i18next';

const Collection = () => {
  const { t } = useTranslation();
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [commonName, setCommonName] = useState([]);
  const [selectedCommonNames, setSelectedCommonNames] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [stockFilter, setStockFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Extract categories and subcategories dynamically from products data
  const categories = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    
    // Group products by category and collect subcategories
    const categoryMap = {};
    
    products.forEach(product => {
      const category = product.category;
      const subCategory = product.subCategory;
      
      if (category && subCategory) {
        if (!categoryMap[category]) {
          categoryMap[category] = new Set();
        }
        categoryMap[category].add(subCategory);
      }
    });
    
    // Convert to the required format
    return Object.keys(categoryMap).map(categoryName => ({
      name: categoryName, // ✅ CANONICAL DATABASE VALUE
      subcategories: Array.from(categoryMap[categoryName]) // ✅ CANONICAL DATABASE VALUES
    }));
  }, [products]);

  // Extract unique common names from products (canonical DB values)
  const availableCommonNames = React.useMemo(() => {
    if (!products || products.length === 0) return [];
    const uniqueCommonNames = [...new Set(products.map(product => product.commonName))];
    return uniqueCommonNames.filter(Boolean); // Remove null/undefined
  }, [products]);

  const toggleSubCategory = (e) => {
    const dbValue = e.target.value; // This is the canonical database value
    setSubCategory(prev => 
      prev.includes(dbValue) 
        ? prev.filter(item => item !== dbValue) 
        : [...prev, dbValue]
    );
  };

  const toggleCommonName = (e) => {
    const dbValue = e.target.value; // This is the canonical database value
    setSelectedCommonNames(prev => 
      prev.includes(dbValue) 
        ? prev.filter(item => item !== dbValue) 
        : [...prev, dbValue]
    );
  };

  const applyFilter = () => {
    let filtered = products.slice();

    // Search filter - search in translated content but filter by DB values
    if (showSearch && search) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.commonName?.toLowerCase().includes(search.toLowerCase()) ||
        // Also search in translated versions
        t(item.name).toLowerCase().includes(search.toLowerCase()) ||
        t(item.subCategory).toLowerCase().includes(search.toLowerCase()) ||
        t(item.commonName || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Subcategory filter - ALWAYS use canonical DB values for comparison
    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory));
    }

    // Common name filter - ALWAYS use canonical DB values for comparison
    if (selectedCommonNames.length > 0) {
      filtered = filtered.filter(item => selectedCommonNames.includes(item.commonName));
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
  }, [subCategory, search, showSearch, products, sortBy, stockFilter, selectedCommonNames]);

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
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          {t('filters')} <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Categories and Subcategories Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          {categories.map((cat, idx) => (
            <details key={idx} className='group'>
              <summary className='flex items-center justify-between cursor-pointer'>
                {/* Display translated category name */}
                <span>{t(cat.name)}</span>
                <img src={assets.dropdown_icon} alt='' className='h-3 transform group-open:rotate-90 px-8' />
              </summary>
              <div className='pl-4 mt-2'>
                {cat.subcategories.map((sub, index) => (
                  <p key={index} className='flex gap-2'>
                    <input 
                      className='w-3 accent-green-500' 
                      type='checkbox' 
                      value={sub} // ✅ CANONICAL DATABASE VALUE - never translated
                      checked={subCategory.includes(sub)}
                      onChange={toggleSubCategory} 
                    />
                    {/* ✅ DISPLAY TRANSLATED TEXT */}
                    {t(sub)}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>

        {/* Common Names Filter */}
        {availableCommonNames.length > 0 && (
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <details className='group'>
              <summary className='flex items-center justify-between cursor-pointer'>
                {/* Display translated "Common Names" label */}
                <span>{t('Common Names')}</span>
                <img src={assets.dropdown_icon} alt='' className='h-3 transform group-open:rotate-90 px-8' />
              </summary>
              <div className='pl-4 mt-2'>
                {availableCommonNames.map((commonNameValue, index) => (
                  <p key={index} className='flex gap-2'>
                    <input 
                      className='w-3 accent-green-500' 
                      type='checkbox' 
                      value={commonNameValue} // ✅ CANONICAL DATABASE VALUE - never translated
                      checked={selectedCommonNames.includes(commonNameValue)}
                      onChange={toggleCommonName} 
                    />
                    {/* ✅ DISPLAY TRANSLATED TEXT with fallback to original */}
                    {t(commonNameValue) || commonNameValue}
                  </p>
                ))}
              </div>
            </details>
          </div>
        )}

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

        {/* Clear Filters Button */}
        {(subCategory.length > 0 || selectedCommonNames.length > 0 || stockFilter || sortBy) && (
          <div className='mt-4'>
            <button
              onClick={() => {
                setSubCategory([]);
                setSelectedCommonNames([]);
                setStockFilter(false);
                setSortBy('');
              }}
              className='w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded'
            >
              {t('clear_filters')}
            </button>
          </div>
        )}
      </div>

      <div className='flex-1'>
        <Title text1={t('all')} text2={t('collections')} />
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {currentProducts.map((item, index) => (
            <ProductsItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
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

export default Collection;