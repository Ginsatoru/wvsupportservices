import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSettings } from "./context/SettingsContext";
import enFlag from "./Components/Images/en.png";
import khFlag from "./Components/Images/kh.png";

function Nav() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [menuActive, setMenuActive] = useState(false);
  const [pagesDropdownActive, setPagesDropdownActive] = useState(false);
  const [languageDropdownActive, setLanguageDropdownActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState("en");
  const { settings, loading } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
    setCurrentLang(savedLang);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initialize scroll state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [i18n, isHomePage]);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    setPagesDropdownActive(false);
    setLanguageDropdownActive(false);
  };

  const togglePagesDropdown = (e) => {
    if (!isMobile) return;
    e.preventDefault();
    setPagesDropdownActive(!pagesDropdownActive);
    setLanguageDropdownActive(false);
  };

  const toggleLanguageDropdown = (e) => {
    if (!isMobile) return;
    e.preventDefault();
    setLanguageDropdownActive(!languageDropdownActive);
    setPagesDropdownActive(false);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setCurrentLang(lang);
    setLanguageDropdownActive(false);
    if (menuActive) setMenuActive(false);
  };

  if (loading) {
    return (
      <>
        <nav
          className={`w-full z-50 bg-[#0f8abe] shadow-md ${
            isHomePage ? "fixed" : "sticky top-0"
          }`}
        >
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-2 animate-pulse">
              <div className="w-10 h-10 bg-white/30 rounded-full"></div>
              <div className="w-32 h-4 bg-white/30 rounded"></div>
            </div>
            <div className="w-8 h-8 bg-white/30 rounded"></div>
          </div>
        </nav>
        {/* Spacer for non-home pages */}
        {!isHomePage && <div className="h-16 md:h-20"></div>}
      </>
    );
  }

  // Determine navbar positioning and styling based on page
  const getNavbarClasses = () => {
    if (isHomePage) {
      // Home page: fixed overlay with transparent/blue background based on scroll
      return `fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0f8abe] shadow-md" : "bg-transparent shadow-none"
      }`;
    } else {
      // Other pages: sticky top navigation with blue background
      return "sticky top-0 w-full z-50 bg-[#0f8abe] shadow-md";
    }
  };

  const textColor = isHomePage && !isScrolled ? "text-white" : "text-white";
  const hoverTextColor = "hover:text-blue-100";
  const mobileMenuBg = isHomePage && !isScrolled ? "bg-[#0f8abe]/90" : "bg-[#0f8abe]";

  return (
    <>
      <nav className={getNavbarClasses()}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20 md:max-w-9xl mx-auto">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Link
                to="/"
                className="flex items-center"
                onClick={() => setMenuActive(false)}
              >
                {settings?.logo ? (
                  <img
                    src={settings.logo}
                    alt={settings.companyName || "Company Logo"}
                    className={`h-8 md:h-7 transition-all duration-300 ${
                      isHomePage && !isScrolled ? "opacity-90" : "opacity-100"
                    }`}
                  />
                ) : (
                  <div
                    className={`flex items-center justify-center h-10 w-10 rounded-full ${
                      isHomePage && !isScrolled ? "bg-white" : "bg-white"
                    }`}
                  >
                    <span
                      className={`${
                        isHomePage && !isScrolled
                          ? "text-[#0f8abe]"
                          : "text-[#0f8abe]"
                      } font-bold text-lg`}
                    >
                      {settings?.companyName?.charAt(0) || ""}
                    </span>
                  </div>
                )}
                <h3
                  className={`ml-2 text-lg md:text-2xl font-semibold ${textColor}`}
                >
                  {settings?.companyName || "WV Support Services Cambodia"}
                </h3>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 text-lg">
              <Link
                to="/"
                className={`font-medium transition-colors ${textColor} ${hoverTextColor}`}
              >
                {t("home")}
              </Link>
              <Link
                to="/Contact"
                className={`font-medium transition-colors ${textColor} ${hoverTextColor}`}
              >
                {t("contact")}
              </Link>
              <Link
                to="/Services"
                className={`font-medium transition-colors ${textColor} ${hoverTextColor}`}
              >
                {t("services")}
              </Link>
              <Link
                to="/Aboutus"
                className={`font-medium transition-colors ${textColor} ${hoverTextColor}`}
              >
                {t("about")}
              </Link>

              {/* Pages Dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center font-medium transition-colors ${textColor} ${hoverTextColor}`}
                >
                  {t("pages")}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
                  <div className="py-1">
                    <Link
                      to="/Project"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0f8abe]"
                    >
                      {t("project")}
                    </Link>
                    <Link
                      to="/Support"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0f8abe]"
                    >
                      {t("support")}
                    </Link>
                    <Link
                      to="/Whoweare"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0f8abe]"
                    >
                      {t("whoWeAre")}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Language Dropdown - Updated Style */}
              <div className="relative group ml-2">
                <button
                  className={`flex items-center font-medium transition-colors ${textColor} ${hoverTextColor} px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30`}
                >
                  {currentLang === "en" ? (
                    <img src={enFlag} alt="English" className="w-5 h-3.5 mr-2" />
                  ) : (
                    <img src={khFlag} alt="Khmer" className="w-5 h-3.5 mr-2" />
                  )}
                  <span className="mr-1">{currentLang === "en" ? "EN" : "KH"}</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage("en")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0f8abe] w-full text-left"
                    >
                      <img src={enFlag} alt="English" className="w-5 h-3.5 mr-2" />
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage("km")}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0f8abe] w-full text-left"
                    >
                      <img src={khFlag} alt="Khmer" className="w-5 h-3.5 mr-2" />
                      Khmer
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-md focus:outline-none ${textColor} ${hoverTextColor}`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuActive ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            menuActive ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } ${mobileMenuBg}`}
        >
          <div className="px-4 pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setMenuActive(false)}
                className={`py-2 px-3 rounded-md transition-colors ${
                  isHomePage && !isScrolled
                    ? "text-white hover:bg-white/20"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {t("home")}
              </Link>
              <Link
                to="/Contact"
                onClick={() => setMenuActive(false)}
                className={`py-2 px-3 rounded-md transition-colors ${
                  isHomePage && !isScrolled
                    ? "text-white hover:bg-white/20"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {t("contact")}
              </Link>
              <Link
                to="/Services"
                onClick={() => setMenuActive(false)}
                className={`py-2 px-3 rounded-md transition-colors ${
                  isHomePage && !isScrolled
                    ? "text-white hover:bg-white/20"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {t("services")}
              </Link>
              <Link
                to="/Aboutus"
                onClick={() => setMenuActive(false)}
                className={`py-2 px-3 rounded-md transition-colors ${
                  isHomePage && !isScrolled
                    ? "text-white hover:bg-white/20"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {t("about")}
              </Link>

              {/* Mobile Pages Dropdown */}
              <div className="relative">
                <button
                  onClick={togglePagesDropdown}
                  className={`flex items-center justify-between w-full py-2 px-3 rounded-md transition-colors ${
                    isHomePage && !isScrolled
                      ? "text-white hover:bg-white/20"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {t("pages")}
                  <svg
                    className={`h-4 w-4 transform transition-transform ${
                      pagesDropdownActive ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    pagesDropdownActive ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="pl-4 py-1 space-y-1">
                    <Link
                      to="/Project"
                      onClick={() => setMenuActive(false)}
                      className={`block py-2 px-3 rounded-md transition-colors ${
                        isHomePage && !isScrolled
                          ? "text-white hover:bg-white/20"
                          : "text-white hover:bg-white/20"
                      }`}
                    >
                      {t("project")}
                    </Link>
                    <Link
                      to="/Support"
                      onClick={() => setMenuActive(false)}
                      className={`block py-2 px-3 rounded-md transition-colors ${
                        isHomePage && !isScrolled
                          ? "text-white hover:bg-white/20"
                          : "text-white hover:bg-white/20"
                      }`}
                    >
                      {t("support")}
                    </Link>
                    <Link
                      to="/Whoweare"
                      onClick={() => setMenuActive(false)}
                      className={`block py-2 px-3 rounded-md transition-colors ${
                        isHomePage && !isScrolled
                          ? "text-white hover:bg-white/20"
                          : "text-white hover:bg-white/20"
                      }`}
                    >
                      {t("whoWeAre")}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Language Dropdown - Updated Style */}
              <div className="relative">
                <button
                  onClick={toggleLanguageDropdown}
                  className={`flex items-center justify-between w-full py-2 px-3 rounded-md transition-colors ${
                    isHomePage && !isScrolled
                      ? "text-white hover:bg-white/20"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  <div className="flex items-center">
                    {currentLang === "en" ? (
                      <img src={enFlag} alt="English" className="w-5 h-3.5 mr-2" />
                    ) : (
                      <img src={khFlag} alt="Khmer" className="w-5 h-3.5 mr-2" />
                    )}
                    <span>{t("Languages")}</span>
                  </div>
                  <svg
                    className={`h-4 w-4 transform transition-transform ${
                      languageDropdownActive ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    languageDropdownActive ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <div className="pl-4 py-1 space-y-1">
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`flex items-center w-full py-2 px-3 rounded-md transition-colors ${
                        isHomePage && !isScrolled
                          ? "text-white hover:bg-white/20"
                          : "text-white hover:bg-white/20"
                      }`}
                    >
                      <img src={enFlag} alt="English" className="w-5 h-3.5 mr-2" />
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage("km")}
                      className={`flex items-center w-full py-2 px-3 rounded-md transition-colors ${
                        isHomePage && !isScrolled
                          ? "text-white hover:bg-white/20"
                          : "text-white hover:bg-white/20"
                      }`}
                    >
                      <img src={khFlag} alt="Khmer" className="w-5 h-3.5 mr-2" />
                      Khmer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer div for non-home pages to prevent content overlap */}
      {!isHomePage && <div className="h-0 md:h-0"></div>}
    </>
  );
}

export default Nav;