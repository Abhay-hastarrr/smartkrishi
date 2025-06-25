import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductsItem from '../components/ProductItem';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; // To make API requests

const Collection = () => {
  const { t } = useTranslation();
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [commonName, setCommonName] = useState([]);
  const [selectedCommonNames, setSelectedCommonNames] = useState([]); // Store selected common names
  const [sortBy, setSortBy] = useState('');
  const [stockFilter, setStockFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categories = [
    { name: 'Seed', subcategories: ['Vegetable Seed', 'Oil seed crop', 'Field crop seed', 'Fruit crop seed', 'Flower seed'] },
    { name: 'Plant Protection', subcategories: ['Insecticides', 'Bactericides', 'Fungicides'] },
    { name: 'Animal Husbandry', subcategories: ['Animal feed'] },
    { name: 'Plant', subcategories: ['Indoor Plant', 'Outdoor Plant', 'Shade Plant'] },
    { name: 'Seedling', subcategories: ['Vegetable Seedling', 'Flower Seedling', 'Fruit Seedling'] },
    { name: 'Lifestyle', subcategories: ['Lifestyle Plant', 'Air Purifier Plant', 'Decorative Plant'] }
  ];

  const toggleSubCategory = (e) => {
    setSubCategory(prev => prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value]);
  };

  const toggleCommonName = (e) => {
    setSelectedCommonNames(prev => prev.includes(e.target.value) ? prev.filter(item => item !== e.target.value) : [...prev, e.target.value]);
  };

  const applyFilter = () => {
    let filtered = products.slice();

    if (showSearch && search) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory));
    }

    if (selectedCommonNames.length > 0) {
      filtered = filtered.filter(item => selectedCommonNames.includes(item.commonName));
    }

    if (stockFilter) {
      filtered = filtered.filter(item => item.stock > 0);
    }

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
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          {categories.map((cat, idx) => (
            <details key={idx} className='group'>
              <summary className='flex items-center justify-between cursor-pointer'>
                <span>{t(cat.name)}</span>
                <img src={assets.dropdown_icon} alt='' className='h-3 transform group-open:rotate-90 px-8' />
              </summary>
              <div className='pl-4 mt-2'>
                {cat.subcategories.map((sub, index) => (
                  <p key={index} className='flex gap-2'>
                    <input className='w-3 accent-green-500' type='checkbox' value={sub} onChange={toggleSubCategory} />
                    {t(sub)}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
        <div className='mt-6 border border-gray-300 p-4'>
          <p className='text-lg'>{t('sort_by')}:</p>
          <select className='border p-2 w-full mt-2' onChange={(e) => setSortBy(e.target.value)}>
            <option value=''>{t('select')}</option>
            <option value='price_low_high'>{t('price low to high')}</option>
            <option value='price_high_low'>{t('price high to low')}</option>
          </select>
          <div className='mt-4'>
            <label className='flex gap-2'>
              <input type='checkbox' onChange={() => setStockFilter(!stockFilter)} />
              {t('only_in_stock')}
            </label>
          </div>
        </div>
      </div>
      <div className='flex-1'>
        <Title text1={t('all')} text2={t('collections')} />
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {currentProducts.map((item, index) => (
            <ProductsItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
