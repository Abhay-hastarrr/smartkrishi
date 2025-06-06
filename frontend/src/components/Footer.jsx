import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        
        {/* ✅ Company Description */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">{t("footer_description")}</p>
        </div>

        {/* ✅ Quick Links */}
        <div>
          <p className="text-xl font-medium mb-5">{t("quick_links")}</p>  {/* ✅ Fixed Key */}
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/">{t("home")}</Link>
            <Link to="/about">{t("about")}</Link>
            <Link to="/collection">{t("collection")}</Link>
          </ul>
        </div>

        {/* ✅ Contact Section */}
        <div>
          <p className="text-xl font-medium mb-5">{t("contact_us")}</p>  {/* ✅ Fixed Key */}
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>contact@Agrinext.com</li>
          </ul>
        </div>

      </div>

      {/* ✅ Copyright */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">{t("copyright")}</p>
      </div>
    </div>
  );
};

export default Footer;
