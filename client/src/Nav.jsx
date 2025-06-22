import React, { useState, useEffect } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Components/i18n";
import enFlag from "./Components/Images/en.png";
import khFlag from "./Components/Images/kh.png";
import { useSettings } from './context/SettingsContext';

function Nav() {
  const [menuActive, setMenuActive] = useState(false);
  const [pagesDropdownActive, setPagesDropdownActive] = useState(false);
  const [languageDropdownActive, setLanguageDropdownActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState("en");
  const { settings, loading } = useSettings();

  const getFontClass = () =>
    currentLang === "km" ? "khmer-text" : "english-text";

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
    setCurrentLang(savedLang);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [i18n]);

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
  };

  // Loading state
  if (loading) {
    return (
      <div className="nav">
        <div className="space">
          <div className="logo">
            <div className="animate-pulse">
              <div className="w-10 h-10 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded ml-2"></div>
            </div>
          </div>
          <button className="hamburger-btn">☰</button>
        </div>
      </div>
    );
  }

  return (
    <div className="nav">
      <body className={getFontClass()} />
      <div className="space">
        <div className="logo">
          <Link to="/" onClick={() => setMenuActive(false)}>
            {settings?.logo ? (
              <img 
                src={settings.logo} 
                alt={settings.companyName || "Company Logo"} 
                className="logo-image"
              />
            ) : (
              // Fallback if no logo is set
              <div className="logo-placeholder">
                <span className="logo-text">
                  {settings?.companyName?.charAt(0) || ""}
                </span>
              </div>
            )}
          </Link>
          
          <h3 className="company-name">
            {settings?.companyName || "WV Support Services Camdodia"}
          </h3>
        </div>

        <button className="hamburger-btn" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`menu ${menuActive ? "active" : ""}`}>
          <ul>
            <Link to="/" onClick={() => setMenuActive(false)}>
              <li>{t("home")}</li>
            </Link>
            <Link to="/Contact" onClick={() => setMenuActive(false)}>
              <li>{t("contact")}</li>
            </Link>
            <Link to="/Services" onClick={() => setMenuActive(false)}>
              <li className="text-menu">{t("services")}</li>
            </Link>
            <Link to="/Aboutus" onClick={() => setMenuActive(false)}>
              <li>{t("about")}</li>
            </Link>

            {/* Pages Dropdown */}
            <li>
              <div
                className={`dropdown ${pagesDropdownActive ? "active" : ""}`}
              >
                <span className="dropbtn" onClick={togglePagesDropdown}>
                  {t("pages")} ⮟
                </span>
                <div className="dropdown-content">
                  <Link to="/Project" onClick={() => setMenuActive(false)}>
                    <span className="text-menu">{t("project")}</span>
                  </Link>
                  <Link to="/Support" onClick={() => setMenuActive(false)}>
                    <span className="text-menu">{t("support")}</span>
                  </Link>
                  <Link to="/Whoweare" onClick={() => setMenuActive(false)}>
                    <span className="text-menu">{t("whoWeAre")}</span>
                  </Link>
                </div>
              </div>
            </li>

            {/* Language Dropdown */}
            <li>
              <div
                className={`dropdown ${languageDropdownActive ? "active" : ""}`}
              >
                <span className="dropbtn" onClick={toggleLanguageDropdown}>
                  {t("Languages")} ⮟
                </span>
                <div className="dropdown-content">
                  <span
                    className="text-menu"
                    onClick={() => changeLanguage("en")}
                  >
                    <img src={enFlag} alt="English" className="lang-icon" />{" "}
                    English
                  </span>
                  <span
                    className="text-menu"
                    onClick={() => changeLanguage("km")}
                  >
                    <img src={khFlag} alt="Khmer" className="lang-icon" /> Khmer
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;