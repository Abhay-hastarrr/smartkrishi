import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

  const scrollToLatestCollection = () => {
    const latestSection = document.getElementById("latest-collection");
    if (latestSection) {
      latestSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className='relative flex flex-col sm:flex-row items-center justify-center min-h-[60vh] sm:min-h-[70vh] bg-gray-50 overflow-hidden'>
      {/* Video Background */}
      <div className='absolute inset-0 w-full h-full z-0'>
        <video
          className='w-full h-full object-cover'
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        >
          <source src={assets.v_v1} type="video/mp4" />
          <img src={assets.hero_img} alt="Fallback Image" className='w-full h-full object-cover' />
        </video>
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 w-full sm:w-1/2 flex flex-col items-center sm:items-start justify-center text-center sm:text-left p-6 sm:p-8'>
        <h1 className='font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6 sm:mb-6'>
          {t('hero_title')} <br />
          <span className='block mt-2 text-green-400 '>{t('hero_subtitle')}</span>
        </h1>
        <p className='text-base sm:text-lg text-gray-200 mb-6 sm:mb-8'>
          {t('hero_description')}
        </p>
          <button onClick={scrollToLatestCollection} className='bg-green-500 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-green-600 transition duration-300 shadow-lg'>
            {t('explore_now')}
          </button>
      </div>
    </div>
  );
};

export default Hero;