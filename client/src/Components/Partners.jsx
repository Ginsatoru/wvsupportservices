import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion"; // Import framer-motion
import { useInView } from "react-intersection-observer"; // Import useInView

// Colors
const colors = {
  primary: "#0f8abe",
  white: "#ffffff",
  gray100: "#f8f9fa",
  gray200: "#e9ecef",
  gray600: "#6c757d",
  gray800: "#343a40",
};

// Font family
const fontFamily = "Montserrat, sans-serif";

// Partner Section Container
const PartnerSection = styled.section`
  padding: 4rem 1rem; /* Increased padding from 4rem to 6rem */
  background-color: ${colors.gray100};
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);

  @media (min-width: 768px) {
    padding: 5rem 2rem; /* Increased padding for larger screens */
  }
`;

const SectionHeader = styled(motion.div)`
  /* Motion applied here */
  max-width: 800px;
  margin: 0 auto 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  /* Motion applied here */
  font-size: 1.8rem;
  font-weight: 700;
  color: #0f8abe;
  margin-bottom: 1.5rem;
  font-family: ${fontFamily};

  @media (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  /* Motion applied here */
  font-size: 1rem;
  color: ${colors.gray600};
  line-height: 1.6;
  font-family: ${fontFamily};

  @media (min-width: 768px) {
    font-size: 1.15rem;
  }
`;

const PartnersGrid = styled(motion.div)`
  /* Motion applied here */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const PartnerCard = styled(motion.div)`
  /* Motion applied here */

  background-color: ${colors.white};
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.gray200};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  img {
    max-width: 100%;
    max-height: 60px;
    width: auto;
    height: auto;
    filter: grayscale(100%);
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  &:hover img {
    filter: grayscale(0%);
    opacity: 1;
  }

  @media (max-width: 640px) {
    height: 100px;
    padding: 1.5rem;
  }
`;

// Partner logos (replace with actual image imports or SVGs)
const TyroLogo = () => <img src="https://upload.wikimedia.org/wikipedia/en/1/15/Tyro_Payments_Logo.png" alt="TYRO" />
const LinklyLogo = () => (
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk32QK8LPYg79sPiXj6pUVwrUHeTJ_DvXi4w&s" alt="Linkly" />
);
const MicrosoftLogo = () => (
  <img src="https://nforceit.com.au/wp-content/uploads/2023/09/nforceit-partner-microsoft-logo.png" alt="microsoft" />
);
const FirebaseLogo = () => (
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/New_Firebase_logo.svg/1200px-New_Firebase_logo.svg.png" alt="firebase" />
);

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger animation for children
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Partners = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 }); // Hook to detect when in view

  return (
    <PartnerSection>
      <SectionHeader
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <SectionTitle variants={fadeUp}>Our Trusted Partners</SectionTitle>
        <SectionSubtitle variants={fadeUp}>
          We collaborate with industry leaders to deliver the best solutions for
          your business
        </SectionSubtitle>
      </SectionHeader>

      <PartnersGrid
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <PartnerCard variants={fadeUp}>
          <TyroLogo />
        </PartnerCard>
        <PartnerCard variants={fadeUp}>
          <LinklyLogo />
        </PartnerCard>
        <PartnerCard variants={fadeUp}>
          <MicrosoftLogo />
        </PartnerCard>
        <PartnerCard variants={fadeUp}>
          <FirebaseLogo />
        </PartnerCard>
      </PartnersGrid>
    </PartnerSection>
  );
};

export default Partners;
