import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Page Title */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={t('contact_us_heading1')} text2={t('contact_us_heading2')} />
      </div>

      {/* Contact Info */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt={""} />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>{t('our_store')}</p>
          <p className='text-gray-500'>{t('store_address1')} <br /> {t('store_address2')}</p>
          <p className='text-gray-500'>{t('tel')}: (+91) 555-0132 <br /> {t('email')}: admin@Agrinext.com</p>
          <p className='font-semibold text-xl text-gray-600'>{t('careers_at')}</p>
          <p className='text-gray-500'>{t('careers_desc')}</p>
          <button className='px-8 py-4 text-sm bg-green-400 hover:bg-green-600 rounded-lg shadow-md text-white transition-all duration-500 hover:scale-105'>{t('explore_jobs')}</button>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
