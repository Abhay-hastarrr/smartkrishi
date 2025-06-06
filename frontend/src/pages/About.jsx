// About.jsx
import React from 'react';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* About Us Section */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={t('about')} text2={t('us')} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>{t('about_us_desc')}</p>
          
          <b className='text-gray-800'>{t('our_mission')}</b>
          <p>{t('mission_desc')}</p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-xl py-4 text-center'>
        <Title text1={t('choose')} text2={t('us1')} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>{t('quality_assurance')}:</b>
            <p className=' text-gray-600'>{t('quality_assurance_desc')}</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>{t('convenience')}:</b>
            <p className=' text-gray-600'>{t('convenience_desc')}</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>{t('exceptional_service')}:</b>
            <p className=' text-gray-600'>{t('exceptional_service_desc')}</p>
          </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;