import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import { useRef } from 'react'
import Seed from '../components/Seed'
import PlantProtection from '../components/PlantProtection'
import AnimalHusbandry from '../components/AnimalHusbandry'
import Plant from '../components/plant'
import Seedling from '../components/Seedling'
import GeminiChatbot from '../components/GeminiChatbot'




const Home = () => {

  const latestCollectionRef = useRef(null);

  return (
    <div>
      <Hero />
      
      <LatestCollection />
      <BestSeller />
      <Plant />
      <Seedling />
      <Seed />
      <PlantProtection />
      <AnimalHusbandry />
      <OurPolicy />
      <NewsletterBox />
      <GeminiChatbot />
    </div>
  )
}

export default Home
