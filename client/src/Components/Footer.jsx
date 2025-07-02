import emailjs from "@emailjs/browser";
import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaPhone,
  FaEnvelope,
  FaPaperPlane,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { db } from "./firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import ReCAPTCHA from "react-google-recaptcha";
import { useSettings } from '../context/SettingsContext';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const recaptchaRef = useRef(null);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // Get settings from context
  const { settings, loading: settingsLoading } = useSettings();

  const handleRecaptchaChange = (value) => {
    if (value) {
      setRecaptchaVerified(true);
      setStatusMessage(
        <span>
          <span className="highlight">✅ Verified! Click "Send" again</span>
        </span>
      );
    } else {
      setRecaptchaVerified(false);
      setStatusMessage(
        <span style={{ color: "red" }}>❌ Verification failed.</span>
      );
    }
  };

  const handleEmailSubmit = async () => {
    if (!email || !email.includes("@")) {
      setStatusMessage("❌ Please enter a valid email address.");
      return;
    }

    if (!recaptchaVerified) {
      setStatusMessage("❌ Please verify that you are a human.");
      return;
    }

    try {
      setLoading(true);
      // Add email to Firestore
      await addDoc(collection(db, "newsletter_emails"), {
        email: email,
        timestamp: serverTimestamp(),
      });

      // Send welcome email via EmailJS
      await emailjs.send(
        "service_2x5g8p6", // replace this
        "template_5faiov9", // replace this
        { to_email: email },
        "n9i79GtKbqRVdHvNV" // replace this
      );

      setShowModal(true); // Show modal
      setStatusMessage(null); // Clear any previous inline message
      setEmailSent(true);
      setEmail("");
      setRecaptchaVerified(false);
    } catch (error) {
      console.error("Error saving email or sending message:", error);
      setStatusMessage(
        `❌ ${error.message || "Something went wrong. Please try again."}`
      );
      setEmailSent(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSendClick = () => {
    if (!email || !email.includes("@")) {
      setStatusMessage("❌ Please enter a valid email address.");
      return;
    }

    if (!recaptchaVerified) {
      setShowRecaptcha(true); // Show reCAPTCHA only if not yet verified
      setStatusMessage(""); // Clear old messages
      return;
    }

    // If already verified, proceed to submit email
    handleEmailSubmit();
    recaptchaRef.current?.reset(); // optional: reset reCAPTCHA
    setShowRecaptcha(false);
  };

  // Loading state for settings
  if (settingsLoading) {
    return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <div className="animate-pulse">
              <div className="w-32 h-8 bg-gray-300 rounded mb-4"></div>
              <div className="w-full h-16 bg-gray-300 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="w-48 h-4 bg-gray-300 rounded"></div>
                <div className="w-56 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <Link to="/">
            {settings?.logo ? (
              <img
                src={settings.logo}
                className="footer-logo"
                alt={`${settings.companyName || 'Company'} Logo`}
              />
            ) : (
              <div className="footer-logo-placeholder">
                <span className="footer-logo-text">
                  {settings?.companyName?.charAt(0) || ""}
                </span>
              </div>
            )}
          </Link>
          <p className="footer-text">
            {settings?.companyDescription || 
             "There are support request and service record custom post types, allowing you to easily create and manage support requests and service records."
            }
          </p>
          <div className="contact-info">
            {settings?.phoneNumber && (
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>{settings.phoneNumber}</span>
              </div>
            )}
            {settings?.email && (
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>{settings.email}</span>
              </div>
            )}
          </div>
        </div>

        <div className="footer-row-sections">
          <div className="footer-section">
            <h3 className="footer-heading">About Us</h3>
            <ul className="footer-links">
              <li>
                <a onClick={() => window.location.href = '/Aboutus'}>About</a>
              </li>
              <li>
                <a onClick={() => window.location.href = '/Legal'}>Legal</a>
              </li>
              <li>
                <a onClick={() => window.location.href = '/contact'}>Contact</a>
              </li>
              <li>
                <a onClick={() => window.location.href = '/Project'}>Project</a>
              </li>
              <li>
                <a onClick={() => window.location.href = '/Careers'}>Careers</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Useful Links</h3>
            <ul className="footer-links">
              <li>
                <a href="https://www.aaapos.com/">Browse to AAAPOS</a>
              </li>
              <li>
                <a onClick={() => window.location.href = '/Partner'}>Partners</a>
              </li>
              <li>
                <a onClick={() => window.location.href = '/FAQ'}>FAQs</a>
              </li>
              <li>
                <a onClick={() => window.location.href = '/Support'}>Support</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-heading">Newsletter</h3>
          <p className="footer-text">
            Get the latest {settings?.companyName || 'company'} news delivered to your inbox.
          </p>

          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button
              className="send-button"
              onClick={handleSendClick}
              disabled={loading}
            >
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <FaPaperPlane className="send-icon" />
              )}
            </button>
          </div>

          {/* Show status message if exists */}
          {statusMessage && <p className="status-message">{statusMessage}</p>}

          {/* Show reCAPTCHA after user clicks Send */}
          {showRecaptcha && !recaptchaVerified && (
            <div className="recaptcha-container">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LdT4g0rAAAAAH7WF1kDQuZqqEg6zpqJjv73jVOt"
                onChange={handleRecaptchaChange}
              />
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>✅Thanks for Subscribing!</h2>
            <p>We'll keep you posted with the latest updates and news.</p>
            <button
              className="popup-close-btn"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <div className="copyright">
          Copyright ©2025 All rights reserved | This website is developed by
          AAAPOS team
        </div>
        <div className="social-links">
          <span>Follow us</span>
          <a href="https://facebook.com" aria-label="Facebook">
            <FaFacebookF className="social-icon" />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <FaLinkedinIn className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;