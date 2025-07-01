import React, { useEffect, useRef, useState } from "react";
import "./Team.css";
import { FaTelegram, FaEnvelope, FaPhone } from "react-icons/fa";
import Pisey from "./Images/owner.png"
import Sam from "./Images/sam.png"
import Lyne from "./Images/lyne.png"
import Bo from "./Images/bo.png"
import Lucy from "./Images/Lucy.png"
import Suth from "./Images/suth.png"
import Soeurn from "./Images/soeurn.png"
import Sim from "./Images/sim.png"
import Sok from "./Images/sok.png"

const Team = () => {
  const teamMembers = [
    {
      id: 9,
      name: "Pisey",
      position: "Manager",
      image: Pisey,
      contacts: {
        telegram: "@dara_sok",
        email: "dara@wvsupport.com",
        phone: "+855 12 345 681",
      },
    },

    {
      id: 1,
      name: "Sam",
      position: "Team Leader",
      image: Sam,
      contacts: {
        telegram: "@sophal_chen",
        email: "sophal@wvsupport.com",
        phone: "+855 12 345 678",
      },
    },
    {
      id: 2,
      name: "Lyne",
      position: "Customer Support & Developer",
      image: Lyne,
      contacts: {
        telegram: "@vannak_lim",
        email: "vannak@wvsupport.com",
        phone: "+855 12 345 679",
      },
    },
    {
      id: 3,
      name: "Bo",
      position: "Customer Support & Developer",
      image: Bo,
      contacts: {
        telegram: "@Gin_Satoru",
        email: "naibo2002@gmail.com",
        phone: "+855 87 968 850",
      },
    },
    {
      id: 4,
      name: "Lucy",
      position: "Administrator",
      image: Lucy,
      contacts: {
        telegram: "@dara_sok",
        email: "dara@wvsupport.com",
        phone: "+855 12 345 681",
      },
    },
    {
      id: 6,
      name: "Suth",
      position: "Admin & Accountant",
      image: Suth,
      contacts: {
        telegram: "@dara_sok",
        email: "dara@wvsupport.com",
        phone: "+855 12 345 681",
      },
    },
    {
      id: 5,
      name: "Soeurn",
      position: "Developer",
      image: Soeurn,
      contacts: {
        telegram: "@dara_sok",
        email: "dara@wvsupport.com",
        phone: "+855 12 345 681",
      },
    },
    {
      id: 7,
      name: "Sim",
      position: "Customer Service",
      image: Sim,
      contacts: {
        telegram: "@dara_sok",
        email: "dara@wvsupport.com",
        phone: "+855 12 345 681",
      },
    },
    {
      id: 8,
      name: "Sok",
      position: "Customer Service",
      image: Sok,
      contacts: {
        telegram: "@dara_sok",
        email: "dara@wvsupport.com",
        phone: "+855 12 345 681",
      },
    },
  ];

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
    <div className="main-team">
    <div
      ref={sectionRef}
      className={`team-section ${isVisible ? "fade-in" : "fade-out"}`}
    >
      <div className="team-header">
        <h1>Meet Our Team</h1>
        <p>Our Cambodia-based experts providing global technical support</p>
      </div>

      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div
            key={member.id}
            className={`team-card ${isVisible ? "card-visible" : "card-hidden"}`}
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <div className="card-image">
              <img src={member.image} alt={member.name} />
              <div className="contact-overlay">
                <a
                  href={`https://t.me/${member.contacts.telegram.replace(
                    "@",
                    ""
                  )}`}
                  className="contact-btn"
                >
                  <FaTelegram />
                </a>
                <a
                  href={`mailto:${member.contacts.email}`}
                  className="contact-btn"
                >
                  <FaEnvelope />
                </a>
                <a
                  href={`tel:${member.contacts.phone}`}
                  className="contact-btn"
                >
                  <FaPhone />
                </a>
              </div>
            </div>
            <div className="card-content">
              <h3>{member.name}</h3>
              <p className="position">{member.position}</p>
              <p className="bio">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Team;
