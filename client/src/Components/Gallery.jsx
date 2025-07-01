import React, { useState, useEffect, useRef, useCallback } from "react";
import { FiMapPin } from "react-icons/fi";
import { FaIndustry } from "react-icons/fa";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Image5 from "./Images/image5.png"
import Image2 from "./Images/image2.png"
import Image3 from "./Images/image3.png"
import Image1 from "./Images/image1.png"
import Image4 from "./Images/image4.png"
import Image6 from "./Images/image6.png"

const galleryData = [
    {
      id: 1,
      title: "RetailChain Global POS Deployment",
      description: "Implemented and supported POS systems for 30K+ stores across Asia-Pacific",
      category: "POS Support",
      location: "Australia, New Zealand, Papua New Guinea, and more",
      industry: "Retail Fashion",
      image: Image1,
      fullImage: Image1,
    },
    {
      id: 2,
      title: "E-Commerce Platform Integration",
      description: "Integrated webstore with existing POS for seamless inventory management",
      category: "Webstore Integration",
      location: "Australia, New Zealand",
      industry: "Home Goods",
      image: Image2,
      fullImage: Image2,
    },
    {
      id: 3,
      title: "Multi-Store Management System",
      description: "Centralized management solution for franchise operations in 3 countries",
      category: "Multi-Store Management",
      location: "Australia, Cambodia",
      industry: "Home Decoration",
      image: Image3,
      fullImage: Image3
    },
    {
      id: 4,
      title: "POS System Upgrade & Migration",
      description: "Seamless migration to new POS platform with zero downtime",
      category: "POS Support",
      location: "United Kingdom",
      industry: "Specialty Retail",
      image: Image4,
      fullImage: Image4,
    },
    {
      id: 5,
      title: "Omnichannel Retail Solution",
      description: "Integrated online and offline sales channels for unified customer experience",
      category: "Webstore Integration",
      location: "United States",
      industry: "Electronics",
      image: Image5,
      fullImage: Image5,
    },
    {
      id: 6,
      title: "Franchise Operations Support",
      description: "24/7 technical support for franchise network across Europe",
      category: "Multi-Store Management",
      location: "Germany, France, Spain",
      industry: "Health & Beauty",
      image: Image6,
      fullImage: Image6,
    }
  ];

// Styled Components
const GalleryPage = styled.div`
  padding: 5rem 0;
  background-color: white;
`;

const Container = styled.div`
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 2.2rem;

  h2 {
    font-size: 2.2rem;
    color: #0f8abe;
    margin-bottom: 2rem;
    font-weight:700;
  }

  p {
    font-size: 1.1rem;
    color: #666;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
`;

const FilterButton = styled.button`
  padding: 0.3rem 1.5rem;
  border: none;
  border-radius: 30px;
  background-color: #e0e0e0;
  color: #555;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size:0.85rem;
  
  ${props => props.$active && css`
    background-color: #0f8abe;
    color: white;
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  aspect-ratio: 4/3;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 1.5rem;
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${GalleryItem}:hover & {
    transform: translateY(0);
  }
`;

const ImageCategory = styled.span`
  display: inline-block;
  background-color: #0f8abe;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const ImageTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 8px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #0f8abe;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: contain;
`;

const ImageDetails = styled.div`
  padding: 1.5rem;

  h3 {
    color: #0f8abe;
    margin-bottom: 1rem;
  }

  p {
    color: #555;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const ImageMeta = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;

  span {
    display: flex;
    align-items: center;
    color: #666;
  }
`;

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: { opacity: 0, scale: 0.9 }
};

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryRef = useRef(null);

  const filters = [
    "All",
    "POS Support",
    "Webstore Integration",
    "Multi-Store Management",
  ];

  

  const filteredImages = activeFilter === "All" 
    ? galleryData 
    : galleryData.filter((item) => item.category === activeFilter);

  const openImage = useCallback((image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  }, []);

  const closeImage = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  }, []);

  // Handle escape key to close modal
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
    <GalleryPage ref={galleryRef}>
      <Container>
        <SectionTitle>
          <h2>Project Gallery</h2>
          <p>
            Browse through our international support initiatives and success
            stories
          </p>
        </SectionTitle>

        <FilterButtons>
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              $active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </FilterButton>
          ))}
        </FilterButtons>

        <GalleryGrid>
          {filteredImages.map((item) => (
            <GalleryItem
              key={item.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              onClick={() => openImage(item)}
            >
              <ImageContainer>
                <GalleryImage 
                  src={item.image} 
                  alt={item.title} 
                  loading="lazy"
                />
              </ImageContainer>
              <ImageOverlay>
                <ImageCategory>{item.category}</ImageCategory>
                <ImageTitle>{item.title}</ImageTitle>
              </ImageOverlay>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </Container>

      <AnimatePresence>
        {selectedImage && (
          <ModalBackdrop
            onClick={closeImage}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ModalContent
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeImage} aria-label="Close modal">
                &times;
              </CloseButton>
              <ModalImage
                src={selectedImage.fullImage || selectedImage.image}
                alt={selectedImage.title}
              />
              <ImageDetails>
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.description}</p>
                <ImageMeta>
                  <span>
                    <FiMapPin style={{ color: "#0f8abe", marginRight: "4px" }} />
                    {selectedImage.location}
                  </span>
                  <span>
                    <FaIndustry style={{ color: "#0f8abe", marginRight: "4px" }} />
                    {selectedImage.industry}
                  </span>
                </ImageMeta>
              </ImageDetails>
            </ModalContent>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </GalleryPage>
  );
};

export default Gallery;