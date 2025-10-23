import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";
import Information from "./pages/Information";
import Help from "./pages/Help";
import CategorySubcategoryPage from "./pages/CategorySubcategoryPage";
import VoiceAssistant from './components/VoiceAssistant'


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import "./utils/i18n"; 
import { useTranslation } from "react-i18next";


const App = () => {
  
  const {t} = useTranslation();

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />

      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/information" element={<Information />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/help" element={<Help />} />
        <Route path="/category/:category/:subcategory" element={<CategorySubcategoryPage />} />

      </Routes>
      <Footer />

      <VoiceAssistant />
    </div>
  );
};

export default App;
