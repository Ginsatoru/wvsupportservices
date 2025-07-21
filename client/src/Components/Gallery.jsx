import React, { useState, useCallback, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import { FaIndustry } from "react-icons/fa";
import Image1 from "./Images/image1.png";
import Image2 from "./Images/image2.png";
import Image3 from "./Images/image3.png";
import Image4 from "./Images/image4.png";
import Image5 from "./Images/image5.png";
import Image6 from "./Images/image6.png";
import Image7 from "./Images/image7.png";
import Image8 from "./Images/image8.png";
import Image9 from "./Images/image9.png";
import Image10 from "./Images/image10.png";

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryData = [
    // First row images
    {
      id: 1,
      title: "RetailChain Global POS Deployment",
      description: "Implemented POS systems for 30K+ stores across Asia-Pacific",
      category: "POS Support",
      location: "Australia, New Zealand, Papua New Guinea",
      industry: "Retail Fashion",
      image: Image1,
      fullImage: Image1,
    },
    {
      id: 2,
      title: "E-Commerce Platform Integration",
      description: "Integrated webstore with existing POS systems",
      category: "Webstore Integration",
      location: "Australia, New Zealand",
      industry: "Home Goods",
      image: Image2,
      fullImage: Image2,
    },
    {
      id: 3,
      title: "Multi-Store Management System",
      description: "Centralized management for franchise operations",
      category: "Multi-Store Management",
      location: "Australia, Cambodia",
      industry: "Home Decoration",
      image: Image3,
      fullImage: Image3
    },
    {
      id: 7,
      title: "Inventory Synchronization Solution",
      description: "Real-time inventory updates across all channels",
      category: "Webstore Integration",
      location: "Canada, USA",
      industry: "Sporting Goods",
      image: Image7,
      fullImage: Image7
    },
    {
      id: 8,
      title: "POS Hardware Upgrade Project",
      description: "Modernized POS terminals for 500+ locations",
      category: "POS Support",
      location: "Japan, South Korea",
      industry: "Convenience Stores",
      image: Image8,
      fullImage: Image8
    },
    // Second row images
    {
      id: 4,
      title: "POS System Upgrade & Migration",
      description: "Migration to new POS with zero downtime",
      category: "POS Support",
      location: "United Kingdom",
      industry: "Specialty Retail",
      image: Image4,
      fullImage: Image4,
    },
    {
      id: 5,
      title: "Omnichannel Retail Solution",
      description: "Integrated online and offline sales channels",
      category: "Webstore Integration",
      location: "United States",
      industry: "Electronics",
      image: Image5,
      fullImage: Image5,
    },
    {
      id: 6,
      title: "Franchise Operations Support",
      description: "24/7 support for franchise network",
      category: "Multi-Store Management",
      location: "Germany, France, Spain",
      industry: "Health & Beauty",
      image: Image6,
      fullImage: Image6,
    },
    {
      id: 9,
      title: "Mobile POS Implementation",
      description: "Deployed mobile POS for pop-up stores and events",
      category: "POS Support",
      location: "Brazil, Argentina",
      industry: "Fashion Retail",
      image: Image9,
      fullImage: Image9
    },
    {
      id: 10,
      title: "Global E-commerce Unification",
      description: "Standardized webstore platform across 15 countries",
      category: "Webstore Integration",
      location: "Europe, North America",
      industry: "Luxury Goods",
      image: Image10,
      fullImage: Image10
    }
  ];

  // Split images into two rows (5 images each)
  const firstRowImages = galleryData.slice(0, 5);
  const secondRowImages = galleryData.slice(5);

  const filteredFirstRow = activeFilter === "All" 
    ? firstRowImages 
    : firstRowImages.filter((item) => item.category === activeFilter);

  const filteredSecondRow = activeFilter === "All" 
    ? secondRowImages 
    : secondRowImages.filter((item) => item.category === activeFilter);

  const openImage = useCallback((image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  }, []);

  const closeImage = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeImage();
      }
    };

    if (selectedImage) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, closeImage]);

  return (
    <div className="py-12 md:py-20 bg-white">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f8abe] mb-4 md:mb-6 font-montserrat">
            Project Gallery
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto font-montserrat px-2">
            Browse through our international support initiatives and success stories
          </p>
        </div>

        {/* First Row - Responsive */}
        <div className="relative w-full overflow-hidden mb-4 md:mb-6">
          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex space-x-4 md:space-x-6 animate-scroll-continuous hover:pause-animation">
            {[...filteredFirstRow, ...filteredFirstRow].map((item, index) => (
              <div 
                key={`first-${item.id}-${index}`}
                className="flex-shrink-0 w-64 h-48 sm:w-72 sm:h-56 md:w-80 md:h-64 rounded-xl overflow-hidden shadow-md cursor-pointer relative group"
                onClick={() => openImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                  <span className="bg-[#0f8abe] text-white text-[10px] md:text-xs px-2 py-0.5 md:px-3 md:py-1 rounded-full mb-1 md:mb-2 self-start">
                    {item.category}
                  </span>
                  <h3 className="text-white text-sm sm:text-base md:text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Responsive */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div className="flex space-x-4 md:space-x-6 animate-scroll-continuous hover:pause-animation">
            {[...filteredSecondRow, ...filteredSecondRow].map((item, index) => (
              <div 
                key={`second-${item.id}-${index}`}
                className="flex-shrink-0 w-64 h-48 sm:w-72 sm:h-56 md:w-80 md:h-64 rounded-xl overflow-hidden shadow-md cursor-pointer relative group"
                onClick={() => openImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                  <span className="bg-[#0f8abe] text-white text-[10px] md:text-xs px-2 py-0.5 md:px-3 md:py-1 rounded-full mb-1 md:mb-2 self-start">
                    {item.category}
                  </span>
                  <h3 className="text-white text-sm sm:text-base md:text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal - Responsive */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg md:rounded-xl max-w-full sm:max-w-3xl md:max-w-4xl w-full max-h-[90vh] overflow-auto relative">
            <button
              onClick={closeImage}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-[#0f8abe] text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl z-10 hover:bg-[#0d79a8] transition-colors"
            >
              &times;
            </button>
            <img
              src={selectedImage.fullImage || selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-h-[40vh] sm:max-h-[50vh] md:max-h-[500px] object-contain"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0f8abe] mb-2 sm:mb-4">
                {selectedImage.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{selectedImage.description}</p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
                <span className="flex items-center text-xs sm:text-sm text-gray-700">
                  <FiMapPin className="text-[#0f8abe] mr-1 sm:mr-2" />
                  {selectedImage.location}
                </span>
                <span className="flex items-center text-xs sm:text-sm text-gray-700">
                  <FaIndustry className="text-[#0f8abe] mr-1 sm:mr-2" />
                  {selectedImage.industry}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style global="true">{`
        @keyframes scroll-continuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-continuous {
          animation: scroll-continuous 30s linear infinite;
          width: max-content;
        }
        .hover\:pause-animation:hover {
          animation-play-state: paused;
        }
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        /* Touch devices - reduce animation speed */
        @media (hover: none) {
          .animate-scroll-continuous {
            animation-duration: 60s;
          }
        }
        
        /* Very small devices */
        @media (max-width: 400px) {
          .animate-scroll-continuous {
            animation-duration: 40s;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;