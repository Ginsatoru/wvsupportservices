// CareersPage.js
import React from "react";
import "./Careers.css";

const Careers = () => {
  return (
    <div className="careers-container">
      <header className="careers-header">
        <h1>Join Our Team</h1>
        <p>Be part of something amazing. Your future starts here!</p>
      </header>

      <section className="careers-intro">
        <h2>Why Work With Us?</h2>
        <p>
          At WV Support Services Cambodia, we believe in creativity, collaboration, and growth. 
          We are passionate about building a team that feels like family and achieving remarkable things together.
        </p>
      </section>

      <section className="careers-values">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Innovation:</strong> Always improving and embracing change.</li>
          <li><strong>Integrity:</strong> Doing the right thing, always.</li>
          <li><strong>Teamwork:</strong> Working together to achieve greatness.</li>
          <li><strong>Excellence:</strong> Delivering quality without compromise.</li>
        </ul>
      </section>

      <section className="careers-positions">
        <h2>Open Positions</h2>

        <div className="position-card">
          <h3>Frontend Developer</h3>
          <p>
            Seeking a creative React.js developer with a strong eye for design and attention to detail.
          </p>
          <button>Apply Now</button>
        </div>

        <div className="position-card">
          <h3>Backend Developer</h3>
          <p>
            Looking for a Node.js expert who loves building scalable and secure APIs.
          </p>
          <button>Apply Now</button>
        </div>

        <div className="position-card">
          <h3>UI/UX Designer</h3>
          <p>
            Searching for a talented designer to craft beautiful, user-centered experiences.
          </p>
          <button>Apply Now</button>
        </div>

        <div className="position-card">
          <h3>Marketing Specialist</h3>
          <p>
            Seeking a marketing wizard to help us grow and engage with the world.
          </p>
          <button>Apply Now</button>
        </div>
      </section>

      <footer className="careers-footer">
        <p>Don't see the right fit? <a href="mailto:support@aaapos.com">Send us your Resume!</a></p>
      </footer>
    </div>
  );
};

export default Careers;
