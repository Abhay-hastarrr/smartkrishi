import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "welcomeMessage_one": "You have {{count}} notification",
      "welcomeMessage_other": "You have {{count}} notifications",
      "changeLanguage": "Change Language",
      "home": "Home",
      "Name": "Name",
      "collection": "Collection",
      "about": "About Us",
      "contact": "Contact Us",
      "logout": "Logout",
      "password": "Password",
      "Forgot your password?": "Forgot your password?",
      "Login Here": "Login Here",
      "Create account": "Create account",
      "cart": "Cart",
      "login": "Login",
      "orders": "My Orders",
      "copyright": "Copyright 2025 @ AgriNext.com - All Rights Reserved.",
      "footer_description": "AgriNext is an innovative e-commerce platform connecting farmers and buyers with high-quality seeds, tools, and sustainable solutions. We empower agriculture enthusiasts to grow smarter and thrive together. From field to future, AgriNext is where tradition meets innovation. Join us in cultivating a greener, brighter tomorrow.",
      "Best": "Best",
      "Sellers": "Seller",
      "latest": "Latest",
      "collection": "Collection",
      "proceed_to_checkout": "Buy now",
      // Hero Section
      "hero_title": "Where Tradition Meets Innovation—",
      "hero_subtitle": "Harvesting Tomorrow, Today",
      "hero_description": "Empowering farmers with cutting-edge solutions for a sustainable future.",
      "explore_now": "Explore Now",

      // Collection Page
      "filters": "Filters",
      "categories": "Categories",
      "subcategories": "Subcategories",
      "sort_relevant": "Sort by: Relevant",
      "sort_low_high": "Sort by: Low to High",
      "sort_high_low": "Sort by: High to Low",
      "all": "All",
      "collections": "Collections",
      "previous": "Previous",
      "next": "Next",

      // Product Categories
      "seed": "Seeds",
      "plant_protection": "Plant Protection",
      "animal_husbandry": "Animal Husbandry",


      // Seed Subcategories
      "vegetable_seed": "Vegetable Seeds",
      "oil_seed_crop": "Oil Seed Crops",
      "field_crop_seed": "Field Crop Seeds",
      "fruit_crop_seed": "Fruit Crop Seeds",
      "flower_seed": "Flower Seeds",

      // Plant Protection Subcategories
      "insecticides": "Insecticides",
      "bactericides": "Bactericides",
      "fungicides": "Fungicides",

      // Animal Husbandry Subcategories
      "animal_feed": "Animal Feed",

      "quantity": "Quantity",
      "add_to_cart": "Add to Cart",
      "original_product": "100% Original product.",
      "cod_available": "Cash on delivery is available on this product.",
      "easy_return": "Easy return and exchange policy within 7 days.",

      "easy_exchange": "Easy Exchange Policy",
      "easy_exchange_desc": "We offer a hassle-free exchange policy",

      "return_policy": "7 Days Return Policy",
      "return_policy_desc": "We provide a 7-day free return policy",

      "customer_support": "Best Customer Support",
      "customer_support_desc": "We provide 24/7 customer support",

      "quick_links": "Quick Links",
      "contact_us": "Contact Us",

      "newsletter_title": "Subscribe now & get 20% off",
      "newsletter_description": "Stay updated with our latest products and offers.",
      "newsletter_placeholder": "Enter your email",
      "subscribe": "SUBSCRIBE",

      "about": "About",
      "us": "Us",
      "about_us_desc": "AgriNext was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort.",
      "our_mission": "Our Mission",
      "mission_desc": "Our mission at AgriNext is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond",
      "choose": "Why",
      "us1": "Choose Us",
      "quality_assurance": "Quality Assurance",
      "quality_assurance_desc": "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
      "convenience": "Convenience",
      "convenience_desc": "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
      "exceptional_service": "Exceptional Customer Service",
      "exceptional_service_desc": "Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.",

      "contact_us_heading1": "CONTACT",
      "contact_us_heading2": "US",
      "our_store": "Our Store",
      "store_address1": "54709 Willms Station",
      "store_address2": "Suite 350, Delhi, India",
      "tel": "Tel",
      "email": "Email",
      "careers_at": "Careers at AgriNext",
      "careers_desc": "Learn more about our teams and job openings.",
      "explore_jobs": "Explore Jobs",

      "Easy_Exchange": "Easy Exchange",
      "Easy_Exchange_desc": "Hassle-free exchange within 30 days.",
      "Return_Policy": "Return Policy",
      "Return_Policy_desc": "asy returns for damaged or incorrect items.",
      "Customer_Support": "Customer Support",
      "Customer_support_desc": "24/7 customer service for your convenience.",

      "cart_heading1": "YOUR",
      "cart_heading2": "CART",
      "PROCEED TO CHECKOUT": "PROCEED TO CHECKOUT",
      "Cart_total_heading1": "CART",
      "Cart_total_heading2": "TOTALS",
      "Subtotal": "Subtotal",
      "Shipping_Fee": "Shipping Fee",
      "Total": "Total",
      "Order_heading_1": "MY",
      "Order_heading_2": "ORDERS",
      "Track Order": "Track Order",
      "place_holder_1": "DELIVERY",
      "place_holder_2": "INFORMATION",
      "PAYMENT": "PAYMENT",
      "METHOD": "METHOD",
      "PLACE ORDER": "PLACE ORDER",
      "CASH ON DELIVERY": "CASH ON DELIVERY",

      "First name": "First name",
      "Last name": "Last name",
      "Email address": "Email address",
      "Street": "Street",
      "City": "City",
      "State": "State",
      "Zipcode": "Zipcode",
      "Country": "Country",
      "Phone": "Phone",
      "sort_by":"Sort By",
      "only_in_stock":"Only in stock",
    }
  },
  hi: {
    translation: {
      "welcomeMessage_one": "आपके पास {{count}} सूचना है",
      "welcomeMessage_other": "आपके पास {{count}} सूचनाएँ हैं",
      "changeLanguage": "भाषा बदलें",
      "home": "होम",
      "Forgot your password?": "पासवर्ड भूल गए?",
      "collection": "संग्रह",
      "Name": "नाम",
      "about": "हमारे बारे में",
      "contact": "संपर्क करें",
      "logout": "लॉगआउट",
      "cart": "कार्ट",
      "login": "लॉग इन करें",
      "password": "पासवर्ड",
      "Login Here": "यहां लॉगिन करें",
      "Create account": "खाता बनाएं",
      "orders": "मेरे ऑर्डर",
      "copyright": "कॉपीराइट 2025 @ AgriNext.com - सभी अधिकार सुरक्षित।",
      "footer_description": "एग्रीनेक्स्ट एक अभिनव ई-कॉमर्स प्लेटफॉर्म है जो किसानों और खरीदारों को उच्च-गुणवत्ता वाले बीज, उपकरण और सतत समाधानों से जोड़ता है। हम कृषि उत्साही लोगों को स्मार्ट खेती करने और एक साथ विकसित होने के लिए सशक्त बनाते हैं। खेत से भविष्य तक, एग्रीनेक्स्ट वह स्थान है जहाँ परंपरा नवाचार से मिलती है। आइए, एक हरित और उज्जवल भविष्य की खेती करें!",
      "Best": "सर्वश्रेष्ठ",
      "Sellers": "विक्रेता",
      "latest": "नवीनतम",
      "collection": "संग्रह",
      "proceed_to_checkout": "अभी खरीदें",
      // Hero Section
      "hero_title": "जहाँ परंपरा मिलती है नवाचार से—",
      "hero_subtitle": "कल की फसल, आज",
      "hero_description": "किसानों को स्थायी भविष्य के लिए अत्याधुनिक समाधान प्रदान करना।",
      "explore_now": "अभी खोजें",

      // Collection Page
      "filters": "फिल्टर",
      "categories": "श्रेणियाँ",
      "subcategories": "उप-श्रेणियाँ",
      "sort_relevant": "क्रमबद्ध करें: प्रासंगिक",
      "sort_low_high": "क्रमबद्ध करें: कम से अधिक",
      "sort_high_low": "क्रमबद्ध करें: अधिक से कम",
      "all": "सभी",
      "collections": "संग्रह",
      "previous": "पिछला",
      "next": "अगला",

      // Product Categories
      "seed": "बीज",
      "plant_protection": "पौध संरक्षण",
      "animal_husbandry": "पशुपालन",

      // Seed Subcategories
      "vegetable_seed": "सब्जी बीज",
      "oil_seed_crop": "तेल बीज फसल",
      "field_crop_seed": "फील्ड क्रॉप बीज",
      "fruit_crop_seed": "फल फसल बीज",
      "flower_seed": "फूल बीज",

      // Plant Protection Subcategories
      "insecticides": "कीटनाशक",
      "bactericides": "जीवाणुनाशक",
      "fungicides": "फफूंदनाशक",

      // Animal Husbandry Subcategories
      "animal_feed": "पशु चारा",

      "quantity": "मात्रा",
      "add_to_cart": "कार्ट में जोड़ें",
      "original_product": "100% असली उत्पाद।",
      "cod_available": "इस उत्पाद पर कैश ऑन डिलीवरी उपलब्ध है।",
      "easy_return": "7 दिनों के भीतर आसान वापसी और विनिमय नीति।",

      "easy_exchange": "आसान विनिमय नीति",
      "easy_exchange_desc": "हम परेशानी मुक्त विनिमय नीति प्रदान करते हैं",

      "return_policy": "7 दिन की वापसी नीति",
      "return_policy_desc": "हम 7 दिनों की मुफ्त वापसी नीति प्रदान करते हैं",

      "customer_support": "सर्वश्रेष्ठ ग्राहक सहायता",
      "customer_support_desc": "हम 24/7 ग्राहक सहायता प्रदान करते हैं",

      "quick_links": "त्वरित लिंक",
      "contact_us": "हमसे संपर्क करें",

      "newsletter_title": "अभी सदस्यता लें और 20% की छूट पाएं",
      "newsletter_description": "हमारे नवीनतम उत्पादों और ऑफ़रों से अपडेट रहें।",
      "newsletter_placeholder": "अपना ईमेल दर्ज करें",
      "subscribe": "सदस्यता लें",

      "about": "हमारे",
      "us": "बारे में",
      "about_us_desc": "एग्रीनेक्स्ट नवाचार के प्रति जुनून और ऑनलाइन खरीदारी को क्रांतिकारी रूप से बदलने की इच्छा से जन्मा है। हमारी यात्रा एक सरल विचार के साथ शुरू हुई: एक ऐसा प्लेटफ़ॉर्म प्रदान करना जहाँ ग्राहक आसानी से उत्पादों की एक विस्तृत श्रृंखला की खोज, अन्वेषण और खरीदारी कर सकें।",
      "our_mission": "हमारा मिशन",
      "mission_desc": "एग्रीनेक्स्ट में हमारा मिशन ग्राहकों को विकल्प, सुविधा और विश्वास के साथ सशक्त बनाना है। हम एक सहज खरीदारी अनुभव प्रदान करने के लिए प्रतिबद्ध हैं, जो ब्राउज़िंग और ऑर्डरिंग से लेकर डिलीवरी और उससे आगे तक आपकी अपेक्षाओं से परे हो।",
      "choose": "क्यों",
      "us1": "चुनें हमें",
      "quality_assurance": "गुणवत्ता आश्वासन",
      "quality_assurance_desc": "हम प्रत्येक उत्पाद को सावधानीपूर्वक चुनते और परखते हैं ताकि यह हमारे कठोर गुणवत्ता मानकों को पूरा कर सके।",
      "convenience": "सुविधा",
      "convenience_desc": "हमारे उपयोगकर्ता-अनुकूल इंटरफ़ेस और परेशानी मुक्त ऑर्डरिंग प्रक्रिया के साथ, खरीदारी कभी भी इतनी आसान नहीं रही।",
      "exceptional_service": "असाधारण ग्राहक सेवा",
      "exceptional_service_desc": "हमारी समर्पित पेशेवरों की टीम आपकी हर कदम पर सहायता के लिए यहां है, यह सुनिश्चित करने के लिए कि आपकी संतुष्टि हमारी सर्वोच्च प्राथमिकता है।",


      "contact_us_heading1": "संपर्क",
      "contact_us_heading2": "करें",
      "our_store": "हमारा स्टोर",
      "store_address1": "54709 विलम्स स्टेशन",
      "store_address2": "सूट 350, दिल्ली, भारत",
      "tel": "टेल",
      "email": "ईमेल",
      "careers_at": "AgriNext में करियर",
      "careers_desc": "हमारी टीमों और नौकरी के अवसरों के बारे में और जानें।",
      "explore_jobs": "नौकरियाँ देखें",


      "Easy_Exchange": "आसान विनिमय",
      "Easy_Exchange_desc": "30 दिनों के भीतर बिना किसी झंझट के विनिमय।",
      "Return_Policy": "वापसी नीति",
      "Return_Policy_desc": "क्षतिग्रस्त या गलत आइटम के लिए आसान वापसी।",
      "Customer_Support": "ग्राहक सहायता",
      "Customer_support_desc": "आपकी सुविधा के लिए 24/7 ग्राहक सेवा।",


      "cart_heading1": "आपका",
      "cart_heading2": "कार्ट",
      "PROCEED TO CHECKOUT": "चेकआउट पर जाएं",
      "Cart_total_heading1": "कार्ट",
      "Cart_total_heading2": "कुल",
      "Subtotal": "उप-योग",
      "Shipping_Fee": "शिपिंग शुल्क",
      "Total": "कुल",

      "Order_heading_1": "मेरे",
      "Order_heading_2": "आदेश",
      "Track Order": "आदेश ट्रैक करें",

      "place_holder_1": "डिलीवरी",
      "place_holder_2": "जानकारी",
      "PAYMENT": "भुगतान",
      "METHOD": "तरीका",
      "PLACE ORDER": "ऑर्डर प्लेस करें",
      "CASH ON DELIVERY": "कैश ऑन डिलीवरी",

      "First name": "पहला नाम",
      "Last name": "अंतिम नाम",
      "Email address": "ईमेल पता",
      "Street": "गली",
      "City": "शहर",
      "State": "राज्य",
      "Zipcode": "पिन कोड",
      "Country": "देश",
      "Phone": "फोन"

    }
  },
  mr: {
    translation: {
      "welcomeMessage_one": "तुमच्याकडे {{count}} सूचना आहे",
      "welcomeMessage_other": "तुमच्याकडे {{count}} सूचना आहेत",
      "changeLanguage": "भाषा बदला",
      "home": "मुख्यपृष्ठ",
      "Name": "नाव",
      "collection": "संग्रह",
      "about": "आमच्याबद्दल",
      "contact": "संपर्क",
      "logout": "लॉगआउट",
      "password": "पासवर्ड",
      "Forgot your password?": "तुमचा पासवर्ड विसरलात?",
      "Login Here": "इथे लॉगिन करा",
      "Create account": "खाते तयार करा",
      "cart": "कार्ट",
      "login": "लॉगिन",
      "orders": "माझी ऑर्डर",
      "copyright": "कॉपीराइट 2025 @ AgriNext.com - सर्व हक्क राखीव.",
      "footer_description": "AgriNext हे एक नाविन्यपूर्ण ई-कॉमर्स व्यासपीठ आहे जे शेतकरी आणि खरेदीदारांना उच्च-गुणवत्तेच्या बिया, साधने आणि शाश्वत उपायांसह जोडते. आम्ही कृषी उत्साही लोकांना अधिक चांगले उगवण्यासाठी आणि एकत्र प्रगती करण्यासाठी सक्षम करतो. क्षेत्रापासून भविष्यातील शेतीपर्यंत, AgriNext हे परंपरा आणि नाविन्याचा संगम आहे. आमच्यासोबत हिरवेगार, उज्ज्वल उद्याचे पालन करा.",
      "Best": "सर्वोत्कृष्ट",
      "Sellers": "विक्रेते",
      "latest": "नवीनतम",
      "collection": "संग्रह",
      "proceed_to_checkout": "खरेदी करा",

      // Hero Section
      "hero_title": "जिथे परंपरा नाविन्याला भेटते—",
      "hero_subtitle": "उद्याची कापणी, आजच",
      "hero_description": "शाश्वत भविष्यासाठी अत्याधुनिक उपायांसह शेतकऱ्यांना सक्षम करणे.",
      "explore_now": "आता एक्सप्लोर करा",

      // Collection Page
      "filters": "गाळणी",
      "categories": "वर्ग",
      "subcategories": "उपवर्ग",
      "sort_relevant": "क्रम लावा: संबंधित",
      "sort_low_high": "क्रम लावा: कमी ते जास्त",
      "sort_high_low": "क्रम लावा: जास्त ते कमी",
      "all": "सर्व",
      "collections": "संग्रह",
      "previous": "मागील",
      "next": "पुढील",

      // Product Categories
      "seed": "बिया",
      "plant_protection": "वनस्पती संरक्षण",
      "animal_husbandry": "पशुपालन",

      // Seed Subcategories
      "vegetable_seed": "भाजीपाला बिया",
      "oil_seed_crop": "तेल बिया पिके",
      "field_crop_seed": "शेती पिकांच्या बिया",
      "fruit_crop_seed": "फळांच्या बिया",
      "flower_seed": "फुलांच्या बिया",

      // Plant Protection Subcategories
      "insecticides": "किटकनाशके",
      "bactericides": "बॅक्टेरिसाइड्स",
      "fungicides": "बुरशीनाशके",

      // Animal Husbandry Subcategories
      "animal_feed": "पशू खाद्य",

      "quantity": "प्रमाण",
      "add_to_cart": "कार्टमध्ये जोडा",
      "original_product": "100% मूळ उत्पादन.",
      "cod_available": "या उत्पादनावर कॅश ऑन डिलिव्हरी उपलब्ध आहे.",
      "easy_return": "7 दिवसांत सोपी परतावा आणि विनिमय धोरण.",

      "easy_exchange": "सोपे एक्सचेंज धोरण",
      "easy_exchange_desc": "आम्ही सोपी एक्सचेंज सुविधा देतो.",

      "return_policy": "7 दिवसांची परतावा धोरण",
      "return_policy_desc": "आम्ही 7 दिवस विनामूल्य परतावा धोरण देतो.",

      "customer_support": "सर्वोत्कृष्ट ग्राहक समर्थन",
      "customer_support_desc": "आम्ही 24/7 ग्राहक समर्थन प्रदान करतो.",

      "quick_links": "झटपट दुवे",
      "contact_us": "संपर्क साधा",

      "newsletter_title": "आता सदस्यता घ्या आणि 20% सूट मिळवा",
      "newsletter_description": "आमच्या नवीनतम उत्पादनांबद्दल अद्यतनित राहा.",
      "newsletter_placeholder": "तुमचा ईमेल टाका",
      "subscribe": "सदस्यता घ्या",

      "about": "आमच्याबद्दल",
      "us": "आम्ही",
      "contact_us_heading1": "संपर्क",
      "contact_us_heading2": "साधा",
      "our_store": "आमचे स्टोअर",
      "store_address1": "54709 विलम्स स्टेशन",
      "store_address2": "सूट 350, दिल्ली, भारत",
      "tel": "दूरध्वनी",
      "email": "ईमेल",
      "careers_at": "AgriNext मध्ये करिअर",
      "careers_desc": "आमच्या टीम्स आणि नोकरीच्या संधींबद्दल अधिक जाणून घ्या.",
      "explore_jobs": "नोकऱ्या एक्सप्लोर करा",

      "place_holder_1": "वितरण",
      "place_holder_2": "माहिती",
      "cart_heading1": "तुमचा",
      "cart_heading2": "कार्ट",

      "First name": "पहिले नाव",
      "Last name": "आडनाव",
      "Email address": "ईमेल पत्ता",
      "Street": "रस्ता",
      "City": "शहर",
      "State": "राज्य",
      "Zipcode": "पिन कोड",
      "Country": "देश",
      "Phone": "फोन",
      "PROCEED TO CHECKOUT": "चेकआउटसाठी पुढे जा",
      "Cart_total_heading1": "कार्ट",
      "Cart_total_heading2": "एकूण",
      "Subtotal": "उपएकूण",
      "Shipping_Fee": "शिपिंग शुल्क",
      "Total": "एकूण",
      "PAYMENT": "पेमेंट",
      "METHOD": "पद्धत",
      "PLACE ORDER": "ऑर्डर द्या",
      "CASH ON DELIVERY": "डिलिव्हरीवर रोख"
    }
  },
  bn: {
    translation: {
      "welcomeMessage_one": "আপনার {{count}} টি নোটিফিকেশন আছে",
      "welcomeMessage_other": "আপনার {{count}} টি নোটিফিকেশন আছে",
      "changeLanguage": "ভাষা পরিবর্তন করুন",
      "home": "হোম",
      "Name": "নাম",
      "collection": "সংগ্রহ",
      "about": "আমাদের সম্পর্কে",
      "contact": "যোগাযোগ",
      "logout": "লগআউট",
      "password": "পাসওয়ার্ড",
      "Forgot your password?": "আপনার পাসওয়ার্ড ভুলে গেছেন?",
      "Login Here": "এখানে লগইন করুন",
      "Create account": "অ্যাকাউন্ট তৈরি করুন",
      "cart": "কার্ট",
      "login": "লগইন",
      "orders": "আমার অর্ডার",
      "copyright": "কপিরাইট 2025 @ AgriNext.com - সমস্ত অধিকার সংরক্ষিত।",
      "footer_description": "AgriNext হল একটি উদ্ভাবনী ই-কমার্স প্ল্যাটফর্ম যা কৃষকদের এবং ক্রেতাদের উচ্চ-মানের বীজ, সরঞ্জাম এবং টেকসই সমাধানের সাথে সংযুক্ত করে। আমরা কৃষি প্রেমীদের আরও ভালভাবে চাষ করতে এবং একসাথে উন্নতি করতে সক্ষম করি। মাঠ থেকে ভবিষ্যৎ পর্যন্ত, AgriNext হল ঐতিহ্য এবং উদ্ভাবনের সংযোগস্থল। আমাদের সাথে একটি সবুজ, উজ্জ্বল আগামী গড়ে তুলুন।",
      "Best": "সেরা",
      "Sellers": "বিক্রেতা",
      "latest": "সর্বশেষ",
      "collection": "সংগ্রহ",
      "proceed_to_checkout": "এখন কিনুন",

      // Hero Section
      "hero_title": "যেখানে ঐতিহ্য এবং উদ্ভাবনের মিলন ঘটে—",
      "hero_subtitle": "আগামীর ফসল, আজই",
      "hero_description": "টেকসই ভবিষ্যতের জন্য অত্যাধুনিক সমাধান সহ কৃষকদের ক্ষমতায়ন করা।",
      "explore_now": "এখনই দেখুন",

      // Collection Page
      "filters": "ফিল্টার",
      "categories": "ক্যাটাগরি",
      "subcategories": "সাব ক্যাটাগরি",
      "sort_relevant": "সাজান: প্রাসঙ্গিক",
      "sort_low_high": "সাজান: কম থেকে বেশি",
      "sort_high_low": "সাজান: বেশি থেকে কম",
      "all": "সব",
      "collections": "সংগ্রহ",
      "previous": "আগে",
      "next": "পরবর্তী",

      // Product Categories
      "seed": "বীজ",
      "plant_protection": "উদ্ভিদ সুরক্ষা",
      "animal_husbandry": "পশুপালন",

      // Seed Subcategories
      "vegetable_seed": "সবজি বীজ",
      "oil_seed_crop": "তেল বীজ ফসল",
      "field_crop_seed": "মাঠ ফসল বীজ",
      "fruit_crop_seed": "ফল ফসল বীজ",
      "flower_seed": "ফুলের বীজ",

      // Plant Protection Subcategories
      "insecticides": "কীটনাশক",
      "bactericides": "ব্যাকটেরিসাইড",
      "fungicides": "ফাঙ্গিসাইড",

      // Animal Husbandry Subcategories
      "animal_feed": "পশুর খাদ্য",

      "quantity": "পরিমাণ",
      "add_to_cart": "কার্টে যোগ করুন",
      "original_product": "100% আসল পণ্য।",
      "cod_available": "এই পণ্যের জন্য ক্যাশ অন ডেলিভারি উপলব্ধ।",
      "easy_return": "7 দিনের মধ্যে সহজ রিটার্ন এবং এক্সচেঞ্জ পলিসি।",

      "easy_exchange": "সহজ এক্সচেঞ্জ পলিসি",
      "easy_exchange_desc": "আমরা সহজ এক্সচেঞ্জ পলিসি প্রদান করি।",

      "return_policy": "7 দিনের রিটার্ন পলিসি",
      "return_policy_desc": "আমরা 7 দিনের বিনামূল্যে রিটার্ন পলিসি প্রদান করি।",

      "customer_support": "সেরা গ্রাহক সহায়তা",
      "customer_support_desc": "আমরা 24/7 গ্রাহক সহায়তা প্রদান করি।",

      "quick_links": "দ্রুত লিঙ্ক",
      "contact_us": "যোগাযোগ করুন",

      "newsletter_title": "এখনই সাবস্ক্রাইব করুন এবং 20% ছাড় পান",
      "newsletter_description": "আমাদের নতুন পণ্য এবং অফার সম্পর্কে আপডেট থাকুন।",
      "newsletter_placeholder": "আপনার ইমেল দিন",
      "subscribe": "সাবস্ক্রাইব করুন",

      "about": "আমাদের সম্পর্কে",
      "us": "আমরা",
      "contact_us_heading1": "যোগাযোগ",
      "contact_us_heading2": "করুন",
      "our_store": "আমাদের স্টোর",
      "store_address1": "54709 উইলমস স্টেশন",
      "store_address2": "সুইট 350, দিল্লি, ভারত",
      "tel": "টেল",
      "email": "ইমেল",
      "careers_at": "AgriNext-এ ক্যারিয়ার",
      "careers_desc": "আমাদের টিম এবং চাকরির সুযোগ সম্পর্কে আরও জানুন।",
      "explore_jobs": "চাকরি দেখুন",

      "First name": "প্রথম নাম",
      "Last name": "শেষ নাম",
      "Email address": "ইমেল ঠিকানা",
      "Street": "রাস্তা",
      "City": "শহর",
      "State": "রাজ্য",
      "Zipcode": "পোস্টাল কোড",
      "Country": "দেশ",
      "Phone": "ফোন",
      "place_holder_1": "ডেলিভারি",
      "place_holder_2": "তথ্য",
      "cart_heading1": "আপনার",
      "cart_heading2": "কার্ট",
      "PROCEED TO CHECKOUT": "চেকআউটে এগিয়ে যান",
      "Cart_total_heading1": "কার্ট",
      "Cart_total_heading2": "মোট",
      "Subtotal": "উপমোট",
      "Shipping_Fee": "শিপিং ফি",
      "Total": "মোট",
      "PAYMENT": "পেমেন্ট",
      "METHOD": "পদ্ধতি",
      "PLACE ORDER": "অর্ডার করুন",
      "CASH ON DELIVERY": "ক্যাশ অন ডেলিভারি"
    }
  },
  ta: {
    translation: {
      "welcomeMessage_one": "உங்களிடம் {{count}} அறிவிப்புகள் உள்ளன",
      "welcomeMessage_other": "உங்களிடம் {{count}} அறிவிப்புகள் உள்ளன",
      "changeLanguage": "மொழியை மாற்று",
      "home": "முகப்பு",
      "Name": "பெயர்",
      "collection": "சேகரிப்பு",
      "about": "எங்களை பற்றி",
      "contact": "தொடர்பு கொள்ளுங்கள்",
      "logout": "வெளியேறு",
      "password": "கடவுச்சொல்",
      "Forgot your password?": "உங்கள் கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
      "Login Here": "இங்கே உள்நுழைக",
      "Create account": "கணக்கை உருவாக்கவும்",
      "cart": "வண்டி",
      "login": "உள்நுழைவு",
      "orders": "என் ஆர்டர்கள்",
      "copyright": "பதிப்புரிமை 2025 @ AgriNext.com - அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.",
      "footer_description": "AgriNext என்பது ஒரு புதுமையான இ-காமர்ஸ் தளம் ஆகும், இது விவசாயிகள் மற்றும் வாங்குபவர்களை உயர்தர விதைகள், கருவிகள் மற்றும் நிலையான தீர்வுகளுடன் இணைக்கிறது. விவசாய ஆர்வலர்களுக்கு திறமையாக வளர உதவுகிறோம். வெளி முதல் எதிர்காலம் வரை, AgriNext என்பது பாரம்பரியத்திற்கும் புதுமைக்கும் இடையிலான பாலமாகும்.",
      "Best": "சிறந்த",
      "Sellers": "விற்பனையாளர்கள்",
      "latest": "சமீபத்திய",
      "collection": "சேகரிப்பு",
      "proceed_to_checkout": "இப்போது வாங்கவும்",

      // Hero Section
      "hero_title": "பாரம்பரியமும் புதுமையும் சந்திக்கும் இடம்—",
      "hero_subtitle": "நாளை விளைவிக்க, இன்று",
      "hero_description": "நிலையான எதிர்காலத்திற்கான முன்னோக்கிய தீர்வுகளை விவசாயிகளுக்கு வழங்குகிறது.",
      "explore_now": "இப்பொழுது ஆராயுங்கள்",

      // Collection Page
      "filters": "வடிகட்டிகள்",
      "categories": "வகைகள்",
      "subcategories": "துணை வகைகள்",
      "sort_relevant": "வரிசைப்படுத்த: தொடர்புடையவை",
      "sort_low_high": "வரிசைப்படுத்த: குறைவிலிருந்து அதிகம்",
      "sort_high_low": "வரிசைப்படுத்த: அதிகத்திலிருந்து குறைவு",
      "all": "அனைத்து",
      "collections": "சேகரிப்புகள்",
      "previous": "முந்தைய",
      "next": "அடுத்தது",

      // Product Categories
      "seed": "விதைகள்",
      "plant_protection": "தாவர பாதுகாப்பு",
      "animal_husbandry": "விலங்கு வளர்ப்பு",

      // Seed Subcategories
      "vegetable_seed": "காய்கறி விதைகள்",
      "oil_seed_crop": "எண்ணெய் விதை பயிர்கள்",
      "field_crop_seed": "விவசாய விதைகள்",
      "fruit_crop_seed": "பழ வகை விதைகள்",
      "flower_seed": "மலர் விதைகள்",

      // Plant Protection Subcategories
      "insecticides": "பூச்சிக்கொல்லிகள்",
      "bactericides": "பாக்டீரியாக்களை அழிக்கும் மருந்துகள்",
      "fungicides": "பூஞ்சைக் கொல்லிகள்",

      // Animal Husbandry Subcategories
      "animal_feed": "விலங்கு தீவனம்",

      "quantity": "அளவு",
      "add_to_cart": "வண்டியில் சேர்",
      "original_product": "100% அசல் பொருள்.",
      "cod_available": "இந்தப் பொருளுக்கு காசோலையில்அளிக்கமுடியும்.",
      "easy_return": "7 நாட்களில் எளிதான திருப்பி வழங்கும் மற்றும் மாற்றம் செய்யும் கொள்கை.",

      "easy_exchange": "எளிதான பரிமாற்ற கொள்கை",
      "easy_exchange_desc": "எங்கள் எளிய பரிமாற்ற கொள்கையை அனுபவிக்கவும்.",

      "return_policy": "7 நாட்கள் திருப்பி கொள்கை",
      "return_policy_desc": "7 நாட்களில் இலவச திருப்பி கொள்கை வழங்குகிறோம்.",

      "customer_support": "சிறந்த வாடிக்கையாளர் ஆதரவு",
      "customer_support_desc": "24/7 வாடிக்கையாளர் ஆதரவு வழங்குகிறோம்.",

      "quick_links": "விரைவு இணைப்புகள்",
      "contact_us": "தொடர்பு கொள்ளுங்கள்",

      "newsletter_title": "இப்பொழுது பதிவு செய்யவும் & 20% தள்ளுபடி பெறுங்கள்",
      "newsletter_description": "எங்கள் புதிய பொருட்கள் மற்றும் சலுகைகளைப் பற்றிய தகவலுக்கு பதிவு செய்யுங்கள்.",
      "newsletter_placeholder": "உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்",
      "subscribe": "சந்தா பெறுக",

      "about": "எங்களை பற்றி",
      "us": "நாம்",
      "contact_us_heading1": "தொடர்பு",
      "contact_us_heading2": "கொள்ளுங்கள்",
      "our_store": "எங்கள் கடை",
      "store_address1": "54709 வில்லம்ஸ் ஸ்டேஷன்",
      "store_address2": "ஸ்யூட் 350, டெல்லி, இந்தியா",
      "tel": "தொலைபேசி",
      "email": "மின்னஞ்சல்",
      "careers_at": "AgriNext-ல் வேலை வாய்ப்பு",
      "careers_desc": "எங்கள் குழுவும் வேலை வாய்ப்புகளும் பற்றி மேலும் அறியவும்.",
      "explore_jobs": "வேலைகள் ஆராயுங்கள்",

      "First name": "முதல் பெயர்",
      "Last name": "கடைசி பெயர்",
      "Email address": "மின்னஞ்சல் முகவரி",
      "Street": "தெரு",
      "City": "நகரம்",
      "State": "மாநிலம்",
      "Zipcode": "ஜிப் குறியீடு",
      "Country": "நாடு",
      "Phone": "தொலைபேசி",
      "place_holder_1": "டெலிவரி",
      "place_holder_2": "தகவல்",
      "cart_heading1": "உங்கள்",
      "cart_heading2": "வண்டி",
      "PROCEED TO CHECKOUT": "செக் அவுட் செல்லவும்",
      "Cart_total_heading1": "வண்டி",
      "Cart_total_heading2": "மொத்தம்",
      "Subtotal": "கூட்டுத்தொகை",
      "Shipping_Fee": "கப்பல் கட்டணம்",
      "Total": "மொத்தம்"
    }
  },
  te: {
    translation: {
      "welcomeMessage_one": "మీకు {{count}} నోటిఫికేషన్ ఉంది",
      "welcomeMessage_other": "మీకు {{count}} నోటిఫికేషన్లు ఉన్నాయి",
      "changeLanguage": "భాషను మార్చు",
      "home": "హోం",
      "Name": "పేరు",
      "collection": "సేకరణ",
      "about": "మా గురించి",
      "contact": "సంప్రదించండి",
      "logout": "లాగ్ అవుట్",
      "password": "పాస్‌వర్డ్",
      "Forgot your password?": "మీ పాస్‌వర్డ్ మర్చిపోయారా?",
      "Login Here": "ఇక్కడ లాగిన్ అవ్వండి",
      "Create account": "ఖాతా సృష్టించండి",
      "cart": "కార్ట్",
      "login": "లాగిన్",
      "orders": "నా ఆర్డర్లు",
      "copyright": "కాపీరైట్ 2025 @ AgriNext.com - అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
      "footer_description": "AgriNext అనేది వినూత్న ఇ-కామర్స్ ప్లాట్‌ఫారమ్, ఇది రైతులను మరియు కొనుగోలుదారులను అధిక నాణ్యత గల విత్తనాలు, పరికరాలు మరియు స్థిరమైన పరిష్కారాలతో అనుసంధానిస్తుంది. వ్యవసాయ ఉత్సాహులను తెలివిగా పెరుగుతుండటానికి మేము శక్తివంతం చేస్తున్నాము. రంగం నుండి భవిష్యత్తు వరకు, AgriNext అనేది సంప్రదాయానికి మరియు వినూత్నానికి మధ్య సమ్మేళనం.",
      "Best": "ఉత్తమ",
      "Sellers": "విక్రేతలు",
      "latest": "తాజా",
      "collection": "సేకరణ",
      "proceed_to_checkout": "ఇప్పుడే కొనండి",

      // Hero Section
      "hero_title": "సంప్రదాయం మరియు వినూత్నం కలిసే స్థలం—",
      "hero_subtitle": "రేపటిని కోయడం, ఇవాళ",
      "hero_description": "సుస్థిర భవిష్యత్తు కోసం రైతులకు అధునాతన పరిష్కారాలను అందించడం.",
      "explore_now": "ఇప్పుడే అన్వేషించండి",

      // Collection Page
      "filters": "ఫిల్టర్స్",
      "categories": "వర్గాలు",
      "subcategories": "ఉపవర్గాలు",
      "sort_relevant": "క్రమబద్ధీకరించు: సంబంధిత",
      "sort_low_high": "క్రమబద్ధీకరించు: తక్కువ నుండి ఎక్కువ",
      "sort_high_low": "క్రమబద్ధీకరించు: ఎక్కువ నుండి తక్కువ",
      "all": "అన్నీ",
      "collections": "సేకరణలు",
      "previous": "మునుపటి",
      "next": "తరువాత",

      // Product Categories
      "seed": "విత్తనాలు",
      "plant_protection": "మొక్కల రక్షణ",
      "animal_husbandry": "పశుసంవర్ధన",

      // Seed Subcategories
      "vegetable_seed": "కూరగాయల విత్తనాలు",
      "oil_seed_crop": "ఆయిల్ సీడ్ పంటలు",
      "field_crop_seed": "ఫీల్డ్ క్రాప్ సీడ్స్",
      "fruit_crop_seed": "పండు పంట విత్తనాలు",
      "flower_seed": "పువ్వుల విత్తనాలు",

      // Plant Protection Subcategories
      "insecticides": "పురుగుమందులు",
      "bactericides": "బాక్టీరిసైడ్స్",
      "fungicides": "ఫంగీసైడ్స్",

      // Animal Husbandry Subcategories
      "animal_feed": "ప్రాణి ఆహారం",

      "quantity": "పరిమాణం",
      "add_to_cart": "కార్ట్‌లో జోడించండి",
      "original_product": "100% అసలైన ఉత్పత్తి.",
      "cod_available": "ఈ ఉత్పత్తికి క్యాష్ ఆన్ డెలివరీ అందుబాటులో ఉంది.",
      "easy_return": "7 రోజులలోపు సులభమైన రిటర్న్ మరియు ఎక్స్చేంజ్ పాలసీ.",

      "easy_exchange": "సులభమైన మార్పిడి పాలసీ",
      "easy_exchange_desc": "ఎలాంటి సమస్య లేకుండా మార్పిడి పాలసీ అందుబాటులో ఉంది.",

      "return_policy": "7 రోజుల రిటర్న్ పాలసీ",
      "return_policy_desc": "7 రోజుల ఉచిత రిటర్న్ పాలసీ అందించబడుతుంది.",

      "customer_support": "ఉత్తమ కస్టమర్ సపోర్ట్",
      "customer_support_desc": "24/7 కస్టమర్ సపోర్ట్ అందుబాటులో ఉంది.",

      "quick_links": "త్వరిత లింకులు",
      "contact_us": "మమ్మల్ని సంప్రదించండి",

      "newsletter_title": "ఇప్పుడే సబ్స్క్రైబ్ చేయండి & 20% తగ్గింపు పొందండి",
      "newsletter_description": "మా తాజా ఉత్పత్తులు మరియు ఆఫర్ల గురించి సమాచారం పొందడానికి సబ్‌స్క్రైబ్ చేయండి.",
      "newsletter_placeholder": "మీ ఇమెయిల్ అడ్రస్ ఎంటర్ చేయండి",
      "subscribe": "సబ్‌స్క్రైబ్ చేయండి",

      "about": "మా గురించి",
      "us": "మమ్మల్ని",
      "contact_us_heading1": "సంప్రదించండి",
      "contact_us_heading2": "మమ్మల్ని",
      "our_store": "మా దుకాణం",
      "store_address1": "54709 విల్మ్స్ స్టేషన్",
      "store_address2": "సూట్ 350, ఢిల్లీ, ఇండియా",
      "tel": "ఫోన్",
      "email": "ఇమెయిల్",
      "careers_at": "AgriNext‌లో ఉద్యోగాలు",
      "careers_desc": "మా జట్టు మరియు ఉద్యోగావకాశాలను గురించి తెలుసుకోండి.",
      "explore_jobs": "ఉద్యోగాలను అన్వేషించండి",

      "First name": "మొదటి పేరు",
      "Last name": "చివరి పేరు",
      "Email address": "ఇమెయిల్ అడ్రస్",
      "Street": "వీధి",
      "City": "నగరం",
      "State": "రాష్ట్రం",
      "Zipcode": "జిప్ కోడ్",
      "Country": "దేశం",
      "Phone": "ఫోన్",
      "place_holder_1": "డెలివరీ",
      "place_holder_2": "సమాచారం",
      "cart_heading1": "మీ",
      "cart_heading2": "కార్ట్",
      "PROCEED TO CHECKOUT": "చెకౌట్‌కి కొనసాగండి",
      "Cart_total_heading1": "కార్టు",
      "Cart_total_heading2": "మొత్తం",
      "Subtotal": "ఉపమొత్తం",
      "Shipping_Fee": "రవాణా రుసుము",
      "Total": "మొత్తం",
      "PAYMENT": "చెల్లింపు",
      "METHOD": "పద్ధతి",
      "PLACE ORDER": "ఆర్డర్ ఇవ్వండి",
      "CASH ON DELIVERY": "డెలివరీపై నగదు"
    }
  },
  gu: {
    translation: {
      "welcomeMessage_one": "તમારું {{count}} નોટિફિકેશન છે",
      "welcomeMessage_other": "તમારાં {{count}} નોટિફિકેશન્સ છે",
      "changeLanguage": "ભાષા બદલો",
      "home": "હોમ",
      "Name": "નામ",
      "collection": "સંગ્રહ",
      "about": "અમારા વિશે",
      "contact": "સંપર્ક કરો",
      "logout": "લૉગઆઉટ",
      "password": "પાસવર્ડ",
      "Forgot your password?": "તમે તમારો પાસવર્ડ ભૂલી ગયા છો?",
      "Login Here": "અહીં લૉગિન કરો",
      "Create account": "એકાઉન્ટ બનાવો",
      "cart": "કાર્ટ",
      "login": "લૉગિન",
      "orders": "મારા ઓર્ડર્સ",
      "copyright": "કૉપિરાઇટ 2025 @ AgriNext.com - બધા હક સાચવેલા છે.",
      "footer_description": "AgriNext એ એક નવીન ઇ-કોમર્સ પ્લેટફોર્મ છે જે ખેડૂતો અને ખરીદદારોને ઉચ્ચ ગુણવત્તાવાળા બીજ, સાધનો અને ટકાઉ ઉકેલો સાથે જોડે છે. અમે કૃષિ ઉત્સાહીઓને વધુ શાણપણથી ઉગાડવા અને સાથે સફળ થવા માટે સશક્ત બનાવીએ છીએ.",
      "Best": "શ્રેષ્ઠ",
      "Sellers": "વેચાણકર્તાઓ",
      "latest": "નવિનતમ",
      "collection": "સંગ્રહ",
      "proceed_to_checkout": "હમણાં જ ખરીદો",

      // Hero Section
      "hero_title": "જ્યાં પરંપરા અને નવીનતા મળે છે—",
      "hero_subtitle": "આજનું કાપણ, આવતીકાલ",
      "hero_description": "ખેડૂતો માટે ટકાઉ ભવિષ્ય માટેના અદ્યતન ઉકેલો.",
      "explore_now": "હમણાં જ અન્વેષણ કરો",

      // Collection Page
      "filters": "ફિલ્ટર્સ",
      "categories": "શ્રેણીઓ",
      "subcategories": "ઉપશ્રેણીઓ",
      "sort_relevant": "ક્રમબદ્ધ કરો: સંબંધિત",
      "sort_low_high": "ક્રમબદ્ધ કરો: ઓછું થી વધુ",
      "sort_high_low": "ક્રમબદ્ધ કરો: વધુ થી ઓછું",
      "all": "બધું",
      "collections": "સંગ્રહો",
      "previous": "પહેલાંનું",
      "next": "આગળનું",

      // Product Categories
      "seed": "બીજ",
      "plant_protection": "વનસ્પતિ સુરક્ષા",
      "animal_husbandry": "પશુપાલન",

      // Seed Subcategories
      "vegetable_seed": "શાકભાજી બીજ",
      "oil_seed_crop": "તેલ બીજ પાક",
      "field_crop_seed": "ખેત પેદાશ બીજ",
      "fruit_crop_seed": "ફળ પાક બીજ",
      "flower_seed": "ફૂલ બીજ",

      // Plant Protection Subcategories
      "insecticides": "જંતુનાશકો",
      "bactericides": "બેક્ટેરિસાઇડ્સ",
      "fungicides": "ફંગીસાઇડ્સ",

      // Animal Husbandry Subcategories
      "animal_feed": "પશુ આહાર",

      "quantity": "જથ્થો",
      "add_to_cart": "કાર્ટમાં ઉમેરો",
      "original_product": "100% મૌલિક ઉત્પાદન.",
      "cod_available": "આ ઉત્પાદનમાં રોકડ પર ડિલિવરી ઉપલબ્ધ છે.",
      "easy_return": "7 દિવસની સરળ રીટર્ન અને એક્સચેન્જ પોલિસી.",

      "easy_exchange": "સલાહકાર વિનિમય પોલિસી",
      "easy_exchange_desc": "આસાનીથી વિનિમય માટેની પોલિસી ઉપલબ્ધ છે.",

      "return_policy": "7 દિવસની રીટર્ન પોલિસી",
      "return_policy_desc": "અમે 7 દિવસની મફત રીટર્ન પોલિસી પ્રદાન કરીએ છીએ.",

      "customer_support": "શ્રેષ્ઠ ગ્રાહક સપોર્ટ",
      "customer_support_desc": "24/7 ગ્રાહક સપોર્ટ ઉપલબ્ધ છે.",

      "quick_links": "ઝડપી લિંક્સ",
      "contact_us": "અમને સંપર્ક કરો",

      "newsletter_title": "હમણાં સબ્સ્ક્રાઇબ કરો અને 20% ડિસ્કાઉન્ટ મેળવો",
      "newsletter_description": "અમારા નવા ઉત્પાદનો અને ઑફર્સ વિશે અપડેટ રહો.",
      "newsletter_placeholder": "તમારું ઈમેલ દાખલ કરો",
      "subscribe": "સબ્સ્ક્રાઇબ કરો",

      "about": "અમારા વિશે",
      "us": "અમે",
      "contact_us_heading1": "સંપર્ક",
      "contact_us_heading2": "અમને",
      "our_store": "અમારું સ્ટોર",
      "store_address1": "54709 વિલ્મ્સ સ્ટેશન",
      "store_address2": "સ્યુટ 350, દિલ્હી, ભારત",
      "tel": "ફોન",
      "email": "ઈમેલ",
      "careers_at": "AgriNext માં કરિયર્સ",
      "careers_desc": "અમારી ટીમ અને નોકરીના અવસર વિશે વધુ જાણો.",
      "explore_jobs": "જોબ્સ અન્વેષણ કરો",

      "First name": "પ્રથમ નામ",
      "Last name": "છેલ્લું નામ",
      "Email address": "ઈમેલ સરનામું",
      "Street": "ગલી",
      "City": "શહેર",
      "State": "રાજ્ય",
      "Zipcode": "ઝિપકોડ",
      "Country": "દેશ",
      "Phone": "ફોન",
      "PROCEED TO CHECKOUT": "ચેકઆઉટ પર ચાલુ રાખો",
      "Cart_total_heading1": "કાર્ટ",
      "Cart_total_heading2": "કુલ",
      "Subtotal": "ઉપકુલ",
      "Shipping_Fee": "શિપિંગ ફી",
      "Total": "કુલ"
    }
  },
  pa: {
    translation: {
      "welcomeMessage_one": "ਤੁਹਾਡੇ ਕੋਲ {{count}} ਨੋਟੀਫਿਕੇਸ਼ਨ ਹੈ",
      "welcomeMessage_other": "ਤੁਹਾਡੇ ਕੋਲ {{count}} ਨੋਟੀਫਿਕੇਸ਼ਨ ਹਨ",
      "changeLanguage": "ਭਾਸ਼ਾ ਬਦਲੋ",
      "home": "ਘਰ",
      "Name": "ਨਾਮ",
      "collection": "ਕਲੈਕਸ਼ਨ",
      "about": "ਸਾਡੇ ਬਾਰੇ",
      "contact": "ਸੰਪਰਕ ਕਰੋ",
      "logout": "ਲਾਗ ਆਉਟ",
      "password": "ਪਾਸਵਰਡ",
      "Forgot your password?": "ਕੀ ਤੁਸੀਂ ਆਪਣਾ ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ ਹੋ?",
      "Login Here": "ਇੱਥੇ ਲਾਗਇਨ ਕਰੋ",
      "Create account": "ਅਕਾਊਂਟ ਬਣਾਓ",
      "cart": "ਕਾਰਟ",
      "login": "ਲਾਗਇਨ",
      "orders": "ਮੇਰੇ ਆਰਡਰ",
      "copyright": "ਕਾਪੀਰਾਈਟ 2025 @ AgriNext.com - ਸਭ ਹੱਕ ਰਾਖਵੇਂ ਹਨ.",
      "footer_description": "AgriNext ਇੱਕ ਨਵਾਂ ਈ-ਕਾਮਰਸ ਪਲੇਟਫਾਰਮ ਹੈ ਜੋ ਕਿਸਾਨਾਂ ਅਤੇ ਖਰੀਦਦਾਰਾਂ ਨੂੰ ਉੱਚ ਗੁਣਵੱਤਾ ਵਾਲੇ ਬੀਜ, ਟੂਲਜ਼ ਅਤੇ ਟਿਕਾਊ ਹੱਲਾਂ ਨਾਲ ਜੋੜਦਾ ਹੈ. ਅਸੀਂ ਕਿਸਾਨਾਂ ਨੂੰ ਹੋਸ਼ਿਆਰੀ ਨਾਲ ਵਧਣ ਅਤੇ ਇੱਕਠੇ ਫਲਣ ਲਈ ਸਮਰਥ ਬਣਾਉਂਦੇ ਹਾਂ.",
      "Best": "ਸਭ ਤੋਂ ਵਧੀਆ",
      "Sellers": "ਵੇਚਣ ਵਾਲੇ",
      "latest": "ਨਵੀਂ",
      "collection": "ਸੰਗ੍ਰਹਿ",
      "proceed_to_checkout": "ਹੁਣੇ ਖਰੀਦੋ",

      // Hero Section
      "hero_title": "ਜਿੱਥੇ ਪਰੰਪਰਾ ਅਤੇ ਨਵੀਨਤਾ ਮਿਲਦੀਆਂ ਹਨ—",
      "hero_subtitle": "ਅੱਜ ਦੀ ਕਟਾਈ, ਕੱਲ੍ਹ",
      "hero_description": "ਕਿਸਾਨਾਂ ਲਈ ਟਿਕਾਊ ਭਵਿੱਖ ਲਈ ਅੱਗੇ ਤਕਨੀਕੀ ਹੱਲ.",
      "explore_now": "ਹੁਣੇ ਅਨੁਸੰਦਾਨ ਕਰੋ",

      // Collection Page
      "filters": "ਫਿਲਟਰ",
      "categories": "ਸ਼੍ਰੇਣੀਆਂ",
      "subcategories": "ਉਪ ਸ਼੍ਰੇਣੀਆਂ",
      "sort_relevant": "ਲਾਗੂ: ਸੰਬੰਧਤ",
      "sort_low_high": "ਲਾਗੂ: ਘੱਟ ਤੋਂ ਵੱਧ",
      "sort_high_low": "ਲਾਗੂ: ਵੱਧ ਤੋਂ ਘੱਟ",
      "all": "ਸਭ",
      "collections": "ਕਲੈਕਸ਼ਨ",
      "previous": "ਪਿੱਛੇ",
      "next": "ਅੱਗੇ",

      // Product Categories
      "seed": "ਬੀਜ",
      "plant_protection": "ਪੌਧੇ ਦੀ ਰੱਖਿਆ",
      "animal_husbandry": "ਪਸ਼ੂ ਪਾਲਣ",

      // Seed Subcategories
      "vegetable_seed": "ਸਬਜ਼ੀ ਬੀਜ",
      "oil_seed_crop": "ਤੈਲ ਬੀਜ ਫਸਲ",
      "field_crop_seed": "ਖੇਤ ਫਸਲ ਬੀਜ",
      "fruit_crop_seed": "ਫਲ ਫਸਲ ਬੀਜ",
      "flower_seed": "ਫੁੱਲ ਬੀਜ",

      // Plant Protection Subcategories
      "insecticides": "ਕੀਟਨਾਸ਼ਕ",
      "bactericides": "ਬੈਕਟੀਰੀਸਾਈਡ",
      "fungicides": "ਫੰਗੀਸਾਈਡ",

      // Animal Husbandry Subcategories
      "animal_feed": "ਪਸ਼ੂ ਖੁਰਾਕ",

      "quantity": "ਮਾਤਰਾ",
      "add_to_cart": "ਕਾਰਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ",
      "original_product": "100% ਅਸਲ ਉਤਪਾਦ.",
      "cod_available": "ਇਸ ਉਤਪਾਦ ਉੱਤੇ ਨਕਦ ਵਸੀਲਾ ਉਪਲਬਧ ਹੈ.",
      "easy_return": "7 ਦਿਨ ਦੀ ਆਸਾਨ ਵਾਪਸੀ ਅਤੇ ਐਕਸਚੇਂਜ ਨੀਤੀ.",

      "easy_exchange": "ਆਸਾਨ ਐਕਸਚੇਂਜ ਨੀਤੀ",
      "easy_exchange_desc": "ਆਸਾਨ ਐਕਸਚੇਂਜ ਲਈ ਨੀਤੀ ਉਪਲਬਧ ਹੈ.",

      "return_policy": "7 ਦਿਨ ਦੀ ਵਾਪਸੀ ਨੀਤੀ",
      "return_policy_desc": "ਅਸੀਂ 7 ਦਿਨ ਦੀ ਮੁਫਤ ਵਾਪਸੀ ਨੀਤੀ ਦਿੰਦੇ ਹਾਂ.",

      "customer_support": "ਸਭ ਤੋਂ ਵਧੀਆ ਗਾਹਕ ਸਹਾਇਤਾ",
      "customer_support_desc": "24/7 ਗਾਹਕ ਸਹਾਇਤਾ ਉਪਲਬਧ ਹੈ.",

      "quick_links": "ਤੇਜ਼ ਲਿੰਕ",
      "contact_us": "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",

      "newsletter_title": "ਹੁਣੇ ਸਬਸਕ੍ਰਾਈਬ ਕਰੋ ਅਤੇ 20% ਛੂਟ ਪ੍ਰਾਪਤ ਕਰੋ",
      "newsletter_description": "ਸਾਡੇ ਨਵੇਂ ਉਤਪਾਦਾਂ ਅਤੇ ਆਫਰਾਂ ਬਾਰੇ ਅੱਪਡੇਟ ਰਹੋ.",
      "newsletter_placeholder": "ਆਪਣਾ ਈਮੇਲ ਦਰਜ ਕਰੋ",
      "subscribe": "ਸਬਸਕ੍ਰਾਈਬ ਕਰੋ",

      "about": "ਸਾਡੇ ਬਾਰੇ",
      "us": "ਅਸੀਂ",
      "contact_us_heading1": "ਸੰਪਰਕ",
      "contact_us_heading2": "ਸਾਡੇ ਨਾਲ",
      "our_store": "ਸਾਡਾ ਸਟੋਰ",
      "store_address1": "54709 ਵਿਲਮਸ ਸਟੇਸ਼ਨ",
      "store_address2": "ਸੁਇਟ 350, ਦਿੱਲੀ, ਭਾਰਤ",
      "tel": "ਟੈਲੀਫੋਨ",
      "email": "ਈਮੇਲ",
      "careers_at": "AgriNext ਵਿੱਚ ਕਰੀਅਰ",
      "careers_desc": "ਸਾਡੀ ਟੀਮ ਅਤੇ ਨੌਕਰੀ ਦੇ ਮੌਕਿਆਂ ਬਾਰੇ ਹੋਰ ਜਾਣੋ.",
      "explore_jobs": "ਨੌਕਰੀਆਂ ਅਨੁਸੰਦਾਨ ਕਰੋ",

      "First name": "ਪਹਿਲਾ ਨਾਂ",
      "Last name": "ਆਖਰੀ ਨਾਂ",
      "Email address": "ਈਮੇਲ ਐਡਰੈੱਸ",
      "Street": "ਗਲੀ",
      "City": "ਸ਼ਹਿਰ",
      "State": "ਰਾਜ",
      "Zipcode": "ਜ਼ਿਪ ਕੋਡ",
      "Country": "ਦੇਸ਼",
      "Phone": "ਫੋਨ",
      "place_holder_1": "ડિલિવરી",
      "place_holder_2": "માહિતી",
      "cart_heading1": "તમારું",
      "cart_heading2": "કાર્ટ",
      "PROCEED TO CHECKOUT": "ਚੈਕਆਉਟ ਵੱਲ ਵਧੋ",
      "Cart_total_heading1": "ਕਾਰਟ",
      "Cart_total_heading2": "ਕੁੱਲ",
      "Subtotal": "ਉਪਕੁੱਲ",
      "Shipping_Fee": "ਸ਼ਿਪਿੰਗ ਫੀਸ",
      "Total": "ਕੁੱਲ",
      "PAYMENT": "ਭੁਗਤਾਨ",
      "METHOD": "ਤਰੀਕਾ",
      "PLACE ORDER": "ਆਰਡਰ ਦਿਓ",
      "CASH ON DELIVERY": "ਡਿਲਿਵਰੀ 'ਤੇ ਨਕਦ"
    }
  },
  awa: {
    translation: {
      "welcomeMessage_one": "तोहरे लगे {{count}} सूचना बा",
      "welcomeMessage_other": "तोहरे लगे {{count}} सूचनन बा",
      "changeLanguage": "भासा बदलीं",
      "home": "घर",
      "Name": "नाम",
      "collection": "संग्रह",
      "about": "हमरे बारे में",
      "contact": "संपर्क करें",
      "logout": "लॉगआउट",
      "password": "पासवर्ड",
      "Forgot your password?": "का तू अपना पासवर्ड भूल गइल बाड़ा?",
      "Login Here": "इहाँ लॉगिन करीं",
      "Create account": "अकाउंट बनाईं",
      "cart": "कार्ट",
      "login": "लॉगिन",
      "orders": "हमार ऑर्डर",
      "copyright": "कॉपीराइट 2025 @ AgriNext.com - सभे अधिकार सुरक्षित बा.",
      "footer_description": "AgriNext एगो नवाचारी ई-कॉमर्स प्लेटफार्म बा जवन किसानन अउर खरीदारन के उच्च गुणवत्ता वाला बीज, औजार अउर टिकाऊ समाधान से जोड़त बा. हमनी किसानन के बुद्धिमानी से बढ़े अउर मिल के फलल-फूलल खातिर सशक्त कर रहल बानीं.",
      "Best": "सबसे बढ़िया",
      "Sellers": "बेचइया",
      "latest": "नवका",
      "collection": "संग्रह",
      "proceed_to_checkout": "अब खरीदीं",

      // Hero Section
      "hero_title": "जहाँ परंपरा अउर नवाचार मिलेला—",
      "hero_subtitle": "आज के खेती, कल के भविष्य",
      "hero_description": "किसानन के खातिर टिकाऊ भविष्य ला अत्याधुनिक समाधान",
      "explore_now": "अबे देखीं",

      // Collection Page
      "filters": "फिल्टर",
      "categories": "श्रेणी",
      "subcategories": "उपश्रेणी",
      "sort_relevant": "छाँटन: प्रासंगिक",
      "sort_low_high": "छाँटन: कम से ज्यादा",
      "sort_high_low": "छाँटन: ज्यादा से कम",
      "all": "सब",
      "collections": "संग्रह",
      "previous": "पिछला",
      "next": "आगला",

      // Product Categories
      "seed": "बीज",
      "plant_protection": "पौधा सुरक्षा",
      "animal_husbandry": "पशुपालन",

      // Seed Subcategories
      "vegetable_seed": "सब्जी बीज",
      "oil_seed_crop": "तेल बीज फसल",
      "field_crop_seed": "फील्ड क्रॉप बीज",
      "fruit_crop_seed": "फल फसल बीज",
      "flower_seed": "फूल बीज",

      // Plant Protection Subcategories
      "insecticides": "कीटनाशक",
      "bactericides": "बैक्टीरीसाइड",
      "fungicides": "फंगीसाइड",

      // Animal Husbandry Subcategories
      "animal_feed": "पशु चारा",

      "quantity": "मात्रा",
      "add_to_cart": "कार्ट में जोड़ीं",
      "original_product": "100% असली प्रोडक्ट.",
      "cod_available": "एह प्रोडक्ट पर कैश ऑन डिलीवरी उपलब्ध बा.",
      "easy_return": "7 दिन में आसान रिटर्न अउर एक्सचेंज पॉलिसी.",

      "easy_exchange": "आसान एक्सचेंज पॉलिसी",
      "easy_exchange_desc": "हम आसान एक्सचेंज पॉलिसी देत बानीं.",

      "return_policy": "7 दिन के रिटर्न पॉलिसी",
      "return_policy_desc": "हम 7 दिन के फ्री रिटर्न पॉलिसी देत बानीं.",

      "customer_support": "सबसे बढ़िया ग्राहक सेवा",
      "customer_support_desc": "हम 24/7 ग्राहक सेवा देत बानीं.",

      "quick_links": "जल्दी लिंक",
      "contact_us": "संपर्क करीं",

      "newsletter_title": "अबे सब्सक्राइब करीं अउर 20% छूट पाईं",
      "newsletter_description": "हमार नवीनतम प्रोडक्ट अउर ऑफर के बारे में जानकार रहीं.",
      "newsletter_placeholder": "आपन ईमेल डालें",
      "subscribe": "सब्सक्राइब करीं",

      "about": "हमरे बारे में",
      "us": "हम",
      "contact_us_heading1": "संपर्क",
      "contact_us_heading2": "हमसे",
      "our_store": "हमार दुकान",
      "store_address1": "54709 विलम्स स्टेशन",
      "store_address2": "सुइट 350, दिल्ली, भारत",
      "tel": "टेलीफोन",
      "email": "ईमेल",
      "careers_at": "AgriNext में करियर",
      "careers_desc": "हमार टीम अउर नौकरी के अवसर के बारे में जानीं.",
      "explore_jobs": "नौकरी खोजीं",

      "First name": "पहिलका नाम",
      "Last name": "अंतिम नाम",
      "Email address": "ईमेल पता",
      "Street": "गली",
      "City": "शहर",
      "State": "राज्य",
      "Zipcode": "पिन कोड",
      "Country": "देश",
      "Phone": "फोन",
      "place_holder_1": "डेलिवरी",
      "place_holder_2": "जानकारी",
      "cart_heading1": "तोहार",
      "cart_heading2": "गाड़ी",
      "PROCEED TO CHECKOUT": "चेकआउट पइ बढ़ा",
      "Cart_total_heading1": "कार्ट",
      "Cart_total_heading2": "कुल",
      "Subtotal": "उपकुल",
      "Shipping_Fee": "शिपिंग फीस",
      "Total": "कुल",
      "PAYMENT": "भुगतान",
      "METHOD": "तरीका",
      "PLACE ORDER": "ऑर्डर दा",
      "CASH ON DELIVERY": "डिलिवरी पर नगद"
    }
  },
  bho: {
    translation: {
      "welcomeMessage_one": "रउरा लगे {{count}} नोटिफिकेशन बा",
      "welcomeMessage_other": "रउरा लगे {{count}} नोटिफिकेशन बा",
      "changeLanguage": "भाषा बदलीं",
      "home": "घर",
      "Name": "नाम",
      "collection": "कलेक्शन",
      "about": "हमरा बारे में",
      "contact": "संपर्क करीं",
      "logout": "लॉगआउट",
      "password": "पासवर्ड",
      "Forgot your password?": "का रउरा पासवर्ड भूल गइल बानी?",
      "Login Here": "इहाँ लॉगिन करीं",
      "Create account": "अकाउंट बनाई",
      "cart": "कार्ट",
      "login": "लॉगिन",
      "orders": "हमार ऑर्डर",
      "copyright": "कॉपीराइट 2025 @ AgriNext.com - सभे अधिकार सुरक्षित बा.",
      "footer_description": "AgriNext एगो नवाचारी ई-कॉमर्स प्लेटफार्म बा, जे किसान आ खरीदार के उच्च गुणवत्ता वाला बीज, औजार आ टिकाऊ समाधान से जोड़े ला. हमनी के लक्ष्य बा कि किसान लोगे के आधुनिक तकनीक के मदद से खेती आ कारोबार में उन्नति करावे.",
      "Best": "सबसे बढ़िया",
      "Sellers": "बेचइया",
      "latest": "नवीनतम",
      "collection": "संग्रह",
      "proceed_to_checkout": "अबे खरीदीं",

      // Hero Section
      "hero_title": "जहाँ परंपरा आ नवाचार मिलेला—",
      "hero_subtitle": "आज के खेती, कल के भविष्य",
      "hero_description": "किसान लोग खातिर टिकाऊ भविष्य ला अत्याधुनिक समाधान",
      "explore_now": "अबे देखीं",

      // Collection Page
      "filters": "फिल्टर",
      "categories": "श्रेणी",
      "subcategories": "उपश्रेणी",
      "sort_relevant": "छांटन: प्रासंगिक",
      "sort_low_high": "छांटन: कम से ज्यादा",
      "sort_high_low": "छांटन: ज्यादा से कम",
      "all": "सब",
      "collections": "कलेक्शन",
      "previous": "पिछला",
      "next": "आगला",

      // Product Categories
      "seed": "बीज",
      "plant_protection": "पौधा सुरक्षा",
      "animal_husbandry": "पशुपालन",

      // Seed Subcategories
      "vegetable_seed": "सब्जी बीज",
      "oil_seed_crop": "तेल बीज फसल",
      "field_crop_seed": "फील्ड क्रॉप बीज",
      "fruit_crop_seed": "फल फसल बीज",
      "flower_seed": "फूल बीज",

      // Plant Protection Subcategories
      "insecticides": "कीटनाशक",
      "bactericides": "बैक्टीरीसाइड",
      "fungicides": "फंगीसाइड",

      // Animal Husbandry Subcategories
      "animal_feed": "पशु चारा",

      "quantity": "मात्रा",
      "add_to_cart": "कार्ट में जोड़ीं",
      "original_product": "100% असली प्रोडक्ट.",
      "cod_available": "एह प्रोडक्ट पर कैश ऑन डिलीवरी उपलब्ध बा.",
      "easy_return": "7 दिन में आसान रिटर्न आ एक्सचेंज पॉलिसी.",

      "easy_exchange": "आसान एक्सचेंज पॉलिसी",
      "easy_exchange_desc": "हम आसान एक्सचेंज पॉलिसी दे तानी.",

      "return_policy": "7 दिन के रिटर्न पॉलिसी",
      "return_policy_desc": "हम 7 दिन के फ्री रिटर्न पॉलिसी दे तानी.",

      "customer_support": "सबसे बढ़िया ग्राहक सेवा",
      "customer_support_desc": "हम 24/7 ग्राहक सेवा प्रदान कर तानी.",

      "quick_links": "जल्दी लिंक",
      "contact_us": "संपर्क करीं",

      "newsletter_title": "अबे सब्सक्राइब करीं आ 20% छूट पाईं",
      "newsletter_description": "हमार नवीनतम प्रोडक्ट आ ऑफर के बारे में जानकार रहीं.",
      "newsletter_placeholder": "अपना ईमेल डालें",
      "subscribe": "सब्सक्राइब करीं",

      "about": "हमरा बारे में",
      "us": "हम",
      "contact_us_heading1": "संपर्क",
      "contact_us_heading2": "हमसे",
      "our_store": "हमार दुकान",
      "store_address1": "54709 विलम्स स्टेशन",
      "store_address2": "सुइट 350, दिल्ली, भारत",
      "tel": "टेलीफोन",
      "email": "ईमेल",
      "careers_at": "AgriNext में करियर",
      "careers_desc": "हमार टीम आ नौकरी के अवसर के बारे में जानल जाव.",
      "explore_jobs": "नौकरी खोजीं",

      "First name": "पहिलका नाम",
      "Last name": "अंतिम नाम",
      "Email address": "ईमेल पता",
      "Street": "गली",
      "City": "शहर",
      "State": "राज्य",
      "Zipcode": "पिन कोड",
      "Country": "देश",
      "Phone": "फोन",
      "place_holder_1": "डिलीवरी",
      "place_holder_2": "जानकारी",
      "cart_heading1": "रउरा के",
      "cart_heading2": "गाड़ी",
      "PROCEED TO CHECKOUT": "चेकआउट जाईं",
      "Cart_total_heading1": "कार्ट",
      "Cart_total_heading2": "कुल",
      "Subtotal": "उपकुल",
      "Shipping_Fee": "शिपिंग फी",
      "Total": "कुल",
      "PAYMENT": "भुगतान",
      "METHOD": "तरीका",
      "PLACE ORDER": "ऑर्डर करीं",
      "CASH ON DELIVERY": "डिलिवरी पर नगद"
    }
  }


};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    lng: localStorage.getItem("selectedLanguage") || "en", // Persist user selection
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
