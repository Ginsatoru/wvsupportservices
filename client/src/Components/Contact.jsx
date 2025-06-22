import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
} from "react-icons/hi2";
import "./Contact.css";
// import ContactInfo from "./ContactInfo";
import { useSettings } from '../context/SettingsContext';

const Contact = () => {
  const { settings, loading } = useSettings();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const recaptchaRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert("Please verify the reCAPTCHA first.");
      return;
    }

    setIsLoading(true);

    emailjs
      .send(
        "service_o96w1qd",
        "template_t3yham8",
        formData,
        "n9i79GtKbqRVdHvNV"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSubmissionStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        recaptchaRef.current.reset();
        setRecaptchaValue(null);
      })
      .catch((err) => {
        console.error("FAILED...", err);
        setSubmissionStatus("error");
      })
      .finally(() => {
        setIsLoading(false);
      });

    setTimeout(() => setSubmissionStatus(null), 5000);
  };

  // Show loading state if settings are still loading
  if (loading || !settings) {
    return (
      <div className="whole-page">
        <div className="animate-pulse p-8 text-center">
          Loading contact page...
        </div>
      </div>
    );
  }

  // Dynamic contact methods using settings data
  const contactMethods = [
    {
      icon: <HiOutlineMapPin className="contact-icon" />,
      title: "Address:",
      description: settings.address || "Address not available",
    },
    {
      icon: <HiOutlinePhone className="contact-icon" />,
      title: "Phone:",
      description: settings.phoneNumber || "Phone not available",
    },
    {
      icon: <HiOutlineEnvelope className="contact-icon" />,
      title: "Email:",
      description: settings.email || "Email not available",
    },
  ];

  return (
    <div className="whole-page">
      <header className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We're here to help, anytime you need support or have a question.
        </p>
      </header>
      
      {/* <div className="contact-info-header text-center p-5">
        <ContactInfo />
      </div> */}
      
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-form-container">
            <h2>How Can We Assist You?</h2>

            {submissionStatus === "success" && (
              <div className="alert success">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your full email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Provide your main subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Tell us your issue</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your issue or question"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LdT4g0rAAAAAH7WF1kDQuZqqEg6zpqJjv73jVOt"
                  onChange={(value) => setRecaptchaValue(value)}
                />
              </div>

              <button
                type="submit"
                className={`submit-btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          <div className="contact-info">
            <h2>Other ways to reach us</h2>

            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-method">
                  <div className="method-icon">{method.icon}</div>
                  <h3>{method.title}</h3>
                  <p>{method.description}</p>
                </div>
              ))}
            </div>

            <div className="business-hours">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 7:00 AM - 4:00 PM</p>
              <p>Saturday: 7:00 AM - 1:30 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="contact-map">
          {settings.mapEmbedCode ? (
            // Use dynamic map embed code from settings
            <div dangerouslySetInnerHTML={{ __html: settings.mapEmbedCode }} />
          ) : (
            // Fallback to your existing iframe if no mapEmbedCode in settings
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d970.5500260653366!2d103.83897579630282!3d13.337825192552444!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1743737141343!5m2!1sen!2sau"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;