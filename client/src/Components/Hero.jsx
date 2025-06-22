import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import "../Components/i18n";

// Animations
const slideIn = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const shine = keyframes`
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(30deg);
  }
  80% {
    transform: translateX(100%) translateY(100%) rotate(30deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(30deg);
  }
`;

// Main container
const HeroContainer = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

// Content wrapper
const HeroSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  min-height: 80vh;

  @media (max-width: 1024px) {
    flex-direction: column;
    width: 90%;
    min-height: auto;
  }
`;

const LeftContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1431px) {
    transform: scale(0.92);
    transform-origin: top left;
  }

  @media (max-width: 1024px) {
    width: 100%;
    align-items: center;
    text-align: center;
    transform: none;
  }
`;

// Right image section
const RightContent = styled.div`
  width: 55%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 1rem;

  @media (max-width: 1431px) {c
    transform: scale(1.1);
    transform-origin: botto left;
  }

  @media (max-width: 1024px) {
    width: 100%;
    order: -1;
    margin-bottom: 3rem;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 50rem;
  animation: ${slideIn} 0.6s ease-in-out forwards;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

  img {
    width: 100%;
    height: auto;
    display: block;
    position: relative;
    z-index: 1;
    border-radius: 1rem;
  }
`;

const ImageShine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 120%;
  height: 180%;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0) 70%
  );
  animation: ${shine} 5s infinite;
  z-index: 2;
  transform: translateX(-100%) translateY(-100%) rotate(30deg);
`;

// Title with special styling for "Welcome"
const Title = styled.h1`
  text-align: left;
  font-size: 3.5rem;
  font-weight: 700;
  animation: ${slideIn} 0.9s ease-out forwards;
  line-height: 1.2;
  margin-bottom: 1rem;
  width: 80%;

  span.company {
    color: #52514a;
    display: block;
    font-size: 2.5rem;
    background: #0f8abe;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  @media (max-width: 1200px) {
    font-size: 3rem;

    span.welcome {
      font-size: 3.5rem;
    }

    span.company {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    text-align: center;

    span.welcome {
      font-size: 2.8rem;
    }

    span.company {
      font-size: 1.8rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;

    span.welcome {
      font-size: 2.2rem;
    }

    span.company {
      font-size: 1.5rem;
    }
  }
`;

// Subtitle text
const Subtitle = styled.p`
  text-align: left;
  line-height: 1.6;
  animation: ${slideIn} 0.8s ease-out forwards;
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  max-width: 80%;

  @media (max-width: 1024px) {
    text-align: center;
    max-width: 100%;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

// Button container
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

// Base button styles
const Button = styled.button`
  padding: 8px 28px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  font-weight: 600;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  // Remove or comment this if transform conflicts
  // animation: ${slideIn} 0.7s ease-out forwards;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 28px;
  }
`;

// Learn More button
const LearnMoreButton = styled(Button)`
  background: #0f8abe;
  color: white;

  &:hover {
    background-color: #0f8abe;
  }
`;

// Contact button
const ContactButton = styled(Button)`
  background: white;
  color: #0f8abe;
  border: 2px solid #0f8abe;

  &:hover {
    background: rgba(15, 138, 190, 0.05);
  }
`;

const HeroComponent = ({
  imageSrc = "src/Components/Images/mainBack.jpg",
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <HeroContainer>
      <HeroSection>
        <LeftContent>
          <Title>
            <span className="company">WV Support Services Cambodia</span>
          </Title>
          <Subtitle>
            {t("subtitle")}
          </Subtitle>
          <ButtonGroup>
            <LearnMoreButton onClick={() => navigate("/Services")}>
              {t("LearnMore")}
            </LearnMoreButton>
            <ContactButton onClick={() => navigate("/contact")}>
              {t("get")}
            </ContactButton>
          </ButtonGroup>
        </LeftContent>
        <RightContent>
          <ImageContainer>
            <img src={imageSrc} alt="IT Support Services in Cambodia" />
            <ImageShine />
          </ImageContainer>
        </RightContent>
      </HeroSection>
    </HeroContainer>
  );
};

export default HeroComponent;
