import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      about: "About Us",
      contact: "Contact",
      project: "Projects",
      pages: "Pages",
      support: "Support",
      services: "Services",
      whoWeAre: "Who we are?",
      languageToggle: "Switch to Khmer",
      head: "Welcome to WV Support Services Cambodia",
      subtitle: "Cutting-edge IT solutions in Cambodia. We deliver premium support, network infrastructure, and software expertise to keep your business at the digital forefront from our Siem Reap headquarters.",
      language: "Languages",
      LearnMore: "Explore Our Services",
      Best: "Best Services",
      Our: "Our Services",
      get: "Get In Touch",
      Servicesub: "WV Support Services Cambodia delivers reliable IT support for RetailManager POS, Webstore Manager, online store integrations, and Multi-Store systems. We handle networking, troubleshooting, updates, and customization to keep your business running smoothly.",
    },
  },
  km: {
    translation: {
      get: "ទំនាក់ទំនង",
      Servicesub: "WV Support Services Cambodia ផ្តល់សេវាគាំទ្របច្ចេកវិទ្យាដោយជឿជាក់ សម្រាប់ប្រព័ន្ធ RetailManager POS, Webstore Manager, ការរួមបញ្ចូលហាងអនឡាញ និងប្រព័ន្ធ Multi-Store។ យើងដោះស្រាយបណ្តាញ ការជួសជុលបញ្ហា ការធ្វើបច្ចុប្បន្នភាព និងការផ្ទាល់ខ្លួនរបស់ប្រព័ន្ធ ដើម្បីធ្វើឱ្យអាជីវកម្មរបស់អ្នកដំណើរការបានយ៉ាងរលូន។",
      Our: "សេវាកម្មពួកយើង",
      Best: "សេវាកម្មល្អៗ",
      contact: "ទំនាក់ទំនង",
      LearnMore: "ស្វែងយល់ពីសេវាកម្ម",
      Languages: "ភាសារ",
      home: "ទំព័រដើម",
      about: "អំពីយើង",
      project: "គម្រោង",
      pages: "ទំព័រ",
      support: "ការគាំទ្រ",
      services: "សេវាកម្ម",
      whoWeAre: "យើងជានរណា?",
      languageToggle: "ប្តូរជាអង់គ្លេស",
      head: "ស្វាគម៍មកកាន់ WV Support Services Cambodia",
      subtitle: "ដំណោះស្រាយបច្ចេកវិទ្យាថ្មីៗនៅកម្ពុជា យើងផ្តល់សេវាគាំទ្រថ្នាក់ពិសេស ដំណាក់កាលបណ្ដាញ និងជំនាញផ្នែកទន់ ដើម្បីរក្សាឱ្យអាជីវកម្មរបស់អ្នកនៅជាចម្បងនៃយុគឌីជីថល ពីការិយាល័យធំរបស់យើងនៅសៀមរាប។",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
