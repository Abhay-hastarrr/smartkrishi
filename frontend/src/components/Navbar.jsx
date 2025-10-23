import React, { useRef, useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher"; //Import Language Switcher

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const { t } = useTranslation(); //Import translation function

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/*Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="" />
      </Link>

      {/* Desktop Menu with Translations */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1 hover:scale-105">
          <p>{t("home")}</p>
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1 hover:scale-105">
          <p>{t("collection")}</p>
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 hover:scale-105">
          <p>{t("about")}</p>
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1 hover:scale-105">
          <p>{t("contact")}</p>
        </NavLink>

      </ul>


      {/* Icons and Buttons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer hover:scale-105"
          alt=""
        />

        {/* Profile Dropdown */}
        <div className="group relative">
          <img
            className="w-6 h-6 min-w-6 min-h-6 cursor-pointer hover:scale-105 object-contain"
            src={assets.profile_icon}
            alt="profile"
          />
          {token && (
            <div className="group-hover:block hidden absolute right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-lg">
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  {t("orders")}
                </p>
                <p
                  onClick={() => navigate("/help")}
                  className="cursor-pointer hover:text-black"
                >
                  {t("help")}
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  {t("logout")}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5 hover:scale-105" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Login Button */}
        {!token && (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:scale-105 shadow-lg"
          >
            {t("login")}
          </button>
        )}

        <LanguageSwitcher />


        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden hover:scale-105"
          alt=""
        />
      </div>


      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 ${visible ? "w-full" : "w-0"
          }`}
      >
        <div className="flex flex-col text-gray-600">
          {/* Back Button */}
          <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>{t("back")}</p>
          </div>

          {/* Mobile Menu Links with Translations */}
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
            {t("home")}
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/collection">
            {t("collection")}
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/about">
            {t("about")}
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/contact">
            {t("contact")}
          </NavLink>
        </div>
      </div>
    </div >
  );
};

export default Navbar;
