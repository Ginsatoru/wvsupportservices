import React, { useEffect, useRef, useState } from "react";
import { FaTelegram, FaEnvelope, FaPhone } from "react-icons/fa";
import Pisey from "./Images/owner.png";
import Sam from "./Images/sam.png";
import Lyne from "./Images/lyne.png";
import Bo from "./Images/bo.png";
import Lucy from "./Images/lucy.png";
import Suth from "./Images/suth.png";
import Soeurn from "./Images/soeurn.png";
import Sim from "./Images/sim.png";
import Sok from "./Images/sok.png";

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
    <div className="bg-white">
      <div
        ref={sectionRef}
        className={`w-full max-w-[1580px] mx-auto py-12 md:py-16 transition-all duration-300 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="w-full text-center mb-8 md:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0f8abe] mb-4 font-montserrat">
            Meet Our Team
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto font-montserrat px-4">
            Our Cambodia-based experts providing global technical support
          </p>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className={`bg-white rounded-xl shadow-md border overflow-hidden transition-all duration-500 ease-in-out ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-[#0f8abe]/90 flex justify-center gap-2 sm:gap-3 p-2 sm:p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <a
                      href={`https://t.me/${member.contacts.telegram.replace("@", "")}`}
                      className="text-white text-base sm:text-lg hover:scale-125 transition-transform duration-200"
                    >
                      <FaTelegram />
                    </a>
                    <a
                      href={`mailto:${member.contacts.email}`}
                      className="text-white text-base sm:text-lg hover:scale-125 transition-transform duration-200"
                    >
                      <FaEnvelope />
                    </a>
                    <a
                      href={`tel:${member.contacts.phone}`}
                      className="text-white text-base sm:text-lg hover:scale-125 transition-transform duration-200"
                    >
                      <FaPhone />
                    </a>
                  </div>
                </div>
                <div className="p-3 sm:p-4 text-center">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg mb-1">{member.name}</h3>
                  <p className="text-[#0f8abe] font-medium text-xs sm:text-sm mb-1 sm:mb-2">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;