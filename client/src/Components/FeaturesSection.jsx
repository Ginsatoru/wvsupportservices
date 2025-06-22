import React, { useEffect, useRef, useState } from "react";
import "./FeaturesSection.css";
import Organization from "./Images/Organization.png";
import Marketing from "./Images/Marketing.png";
import Risk from "./Images/Risk.png";
import Success from "./Images/Success.png";
import Market from "./Images/Market.png";
import { Link } from "react-router-dom";

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div className="main-feature">
      <div
        ref={sectionRef}
        className={`features-section ${isVisible ? "fade-in" : "fade-out"}`}
      >
        {/* Left Side */}
        <div className="left-div">
          <h2>Our Main Features</h2>
          <p className="intro">
            WV Support discovered AAAPOS needing reliable assistance. Without
            proper support, systems risk being misused or altered. We help keep
            everything running as originally designed.
          </p>

          <div className="card-grid">
            <div className="feature-card">
              <img
                className="card-img small"
                src={Organization}
                alt="Organization"
              />
              <h3>Organization</h3>
              <p>
                A well-structured system ensures smooth, efficient operation.
              </p>
            </div>
            <div className="feature-card">
              <img
                className="card-img small"
                src={Marketing}
                alt="Marketing Strategy"
              />
              <h3>Marketing Strategy</h3>
              <p>
                A smart marketing strategy targets the right audience for
                maximum impact.
              </p>
            </div>
            <div className="feature-card">
              <img className="card-img small" src={Risk} alt="Risk Analysis" />
              <h3>Risk Analysis</h3>
              <p>
                Identifying potential issues early helps prevent bigger problems
                later.
              </p>
            </div>
            <div className="feature-card">
              <img
                className="card-img small"
                src={Market}
                alt="Capital Market"
              />
              <h3>Capital Market</h3>
              <p>
                A well-organized system ensures smooth and efficient operations.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="right-div">
          <img className="card-img big" src={Success} alt="Success Story" />
          <h2>Read Our Success Story for Inspiration</h2>
          <p>
            Far beyond the digital noise, there exists WV Support—a place where
            real solutions live. Thriving in clarity and care, it rests at the
            edge of seamless service and trusted support, across a vast ocean of
            technology.
          </p>
          <p>
            On her way, she encountered a ticket. The ticket warned her that, in
            the world of support, messages are often revised countless times—
            until all that remains is clarity and the core of what truly
            matters: the solution.
          </p>
          <Link to="/Contact">
            <button>Contact Us</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
