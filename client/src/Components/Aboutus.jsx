import React, { useEffect } from "react";
import {
  FaBullseye,
  FaGlobeAsia,
  FaChartLine,
  FaHandsHelping,
  FaAward,
} from "react-icons/fa";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import headerImage from "./Images/header.png";
import missionImage from "./Images/mission.png";

// Animation keyframes
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
  
  body {
    font-family: 'Montserrat', sans-serif;
    color: #52514a;
    background-color: white;
    line-height: 1.7;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  .container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    @media (min-width: 576px) {
      max-width: 540px;
    }

    @media (min-width: 768px) {
      max-width: 720px;
    }

    @media (min-width: 992px) {
      max-width: 960px;
    }

    @media (min-width: 1200px) {
      max-width: 1140px;
    }
  }

  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.5s ease, transform 0.5s ease;
    transition-delay: 0.2s;
  }
  
  .animated {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Main container
const AboutUsContainer = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
`;

// Shared styles
const SectionTitle = styled.h2`
  font-family: "Montserrat", sans-serif;
  color: white;
  font-weight: 700; /* Changed from 600 to 700 for bolder text */
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  padding-bottom: 15px;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #0f8abe, #1ac8db);
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 19.2px;
  color: white;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0 15px;
  }
`;

const CTAButton = styled.button`
  background: white;
  color: #0f8abe;
  border: none;
  padding: 12px 30px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

// Hero Section
const HeroSection = styled.section`
  background: linear-gradient(rgba(15, 138, 190, 0.8), rgba(15, 138, 190, 0.9)),
    url(${headerImage}) center/cover no-repeat;
  color: white;
  padding: 0.4rem 1rem;
  text-align: center;
  min-height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: 25vh;
  }
    @media (max-width: 576px) {
    padding: 0.25rem 0.20rem;
    min-height: 20vh;
  }
`;

const HeroTitle = styled.h1`
  font-size: 35px;
  color: white;
  font-weight: 700; /* Added bold font weight */

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

// Mission Section
const MissionSection = styled.section`
  padding: 80px 0;
  background-color: white;

  @media (max-width: 768px) {
    padding: 50px 0;
  }
`;

const MissionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const MissionText = styled.div`
  flex: 1;
  margin-bottom: 0;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

const MissionImage = styled.div`
  flex: 1;
  height: 400px;
  background: url(${missionImage}) no-repeat center center;
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(15, 138, 190, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
  }
`;

const MissionList = styled.ul`
  margin: 20px 0;
  padding-left: 20px;
  list-style: none;
`;

const MissionListItem = styled.li`
  margin-bottom: 10px;
  position: relative;
  padding-left: 25px;

  &::before {
    content: "•";
    color: #0f8abe;
    font-size: 1.5rem;
    position: absolute;
    left: 0;
    top: -3px;
  }
`;

// Story Section
const StorySection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);

  @media (max-width: 768px) {
    padding: 50px 0;
  }
`;

const Timeline = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding: 40px 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #0f8abe, #1ac8db);

    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 50px;
  position: relative;

  &:nth-child(odd) {
    flex-direction: row-reverse;
    text-align: right;
  }

  @media (max-width: 768px) {
    flex-direction: row !important;
    text-align: left !important;
    margin-bottom: 30px;
  }
`;

const TimelineYear = styled.div`
  flex: 1;
  padding: 0 20px;
  font-size: 1.5rem;
  font-weight: 700; /* Added bold font weight */
  color: #0f8abe;
  display: flex;
  align-items: center;

  ${TimelineItem}:nth-child(odd) & {
    justify-content: flex-end;
  }

  ${TimelineItem}:nth-child(even) & {
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    justify-content: flex-start !important;
    flex: 0 0 80px;
    font-size: 1.2rem;
    padding: 0 10px 0 0;
  }
`;

const TimelineContent = styled.div`
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: #0f8abe;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    border: 3px solid white;

    ${TimelineItem}:nth-child(odd) & {
      right: -10px;
    }

    ${TimelineItem}:nth-child(even) & {
      left: -10px;
    }

    @media (max-width: 768px) {
      left: -10px !important;
      right: auto !important;
    }
  }

  @media (max-width: 768px) {
    margin-left: 40px;
  }

  h3 {
    margin-top: 0;
    color: #0f8abe;
    font-weight: 700; /* Added bold font weight */

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

// Vision Section
const VisionSection = styled.section`
  padding: 80px 0;
  background-color: white;

  @media (max-width: 768px) {
    padding: 50px 0;
  }
`;

const VisionStatement = styled.p`
  font-size: 1.2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 15px;
  }
`;

const VisionPillars = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
  padding: 0 15px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Pillar = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(15, 138, 190, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(15, 138, 190, 0.1);
    border-color: rgba(15, 138, 190, 0.2);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  h3 {
    color: #0f8abe;
    font-weight: 700; /* Added bold font weight */
  }
`;

const PillarIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #0f8abe, #1ac8db);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 24px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 20px;
  }
`;

const VisionClosing = styled.div`
  text-align: center;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  font-weight: 500;
  padding: 0 15px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// Team CTA
const TeamCTASection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  text-align: center;
  color: white;

  @media (max-width: 768px) {
    padding: 50px 0;
  }

  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
    transition-delay: 0.3s;
  }

  .animated {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TeamCTATitle = styled(SectionTitle)`
  color: white;
  font-weight: 700; /* Added bold font weight */
`;

const AboutUs = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.85;

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerPoint) {
          element.classList.add('animated');
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <AboutUsContainer>
        {/* Hero Section */}
        <HeroSection>
          <div className="container">
            <div className="animate-on-scroll animated">
              <HeroTitle>About WV Support Services Cambodia</HeroTitle>
              <Subtitle>
                Bridging Cambodian talent with global opportunities through
                exceptional IT support
              </Subtitle>
            </div>
          </div>
        </HeroSection>

        {/* Mission Section */}
        <MissionSection>
          <div className="container">
            <MissionContent>
              <MissionText className="animate-on-scroll">
                <SectionTitle style={{ color: "#0f8abe" }}>Our Mission</SectionTitle>
                <p>
                  WV Support Services Cambodia is a growing IT company that
                  specializes in providing troubleshooting and technical support
                  services for a wide range of Australian customers.
                </p>
                <p>
                  Our mission is to empower Cambodian talent by creating
                  meaningful job opportunities in a peaceful and professional
                  working environment. We are dedicated to:
                </p>
                <MissionList>
                  <MissionListItem>
                    Offering competitive benefits
                  </MissionListItem>
                  <MissionListItem>
                    Working with the latest technologies
                  </MissionListItem>
                  <MissionListItem>
                    Showcasing Cambodian innovation on a global stage
                  </MissionListItem>
                  <MissionListItem>
                    Delivering excellent customer service and satisfaction
                  </MissionListItem>
                </MissionList>
                <p>
                  At WV Support, we believe in bridging local potential with
                  international standards—building a future where Cambodian tech
                  talent thrives.
                </p>
              </MissionText>
              <MissionImage className="animate-on-scroll" />
            </MissionContent>
          </div>
        </MissionSection>

        {/* Story Section */}
        <StorySection>
          <div className="container">
            <SectionTitle style={{ color: "#0f8abe" }} className="animate-on-scroll">Our Story</SectionTitle>
            <Timeline>
              <TimelineItem>
                <TimelineYear className="animate-on-scroll">2021</TimelineYear>
                <TimelineContent className="animate-on-scroll">
                  <h3>Founded in Siem Reap</h3>
                  <p>
                    WV Support Services Cambodia was founded in 2021 and is
                    located in Siem Reap, Cambodia.
                  </p>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineYear className="animate-on-scroll">2024</TimelineYear>
                <TimelineContent className="animate-on-scroll">
                  <h3>Growing Strong</h3>
                  <p>
                    Since then, we've grown rapidly, proudly serving over 10,000
                    customers with a dedicated team of professionals committed
                    to delivering reliable IT support and solutions.
                  </p>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineYear className="animate-on-scroll">Today</TimelineYear>
                <TimelineContent className="animate-on-scroll">
                  <h3>Trusted Partner</h3>
                  <p>
                    Since 2021, WV Support Services Cambodia has been delivering
                    smart, reliable IT support from the heart of Siem
                    Reap—trusted by over 10,000 customers and growing every day.
                  </p>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </div>
        </StorySection>

        {/* Vision Section */}
        <VisionSection>
          <div className="container">
            <SectionTitle style={{ color: "#0f8abe" }} className="animate-on-scroll">Our Vision</SectionTitle>
            <VisionStatement className="animate-on-scroll">
              At WV Support Services Cambodia, our vision is to empower
              Cambodia's tech talent and become a trusted IT support partner for
              businesses across Australia and the region.
            </VisionStatement>

            <VisionPillars>
              <Pillar className="animate-on-scroll">
                <PillarIcon>
                  <FaHandsHelping />
                </PillarIcon>
                <h3>Empowerment</h3>
                <p>
                  Create quality job opportunities for Cambodians in the tech
                  and support sectors.
                </p>
              </Pillar>
              <Pillar className="animate-on-scroll">
                <PillarIcon>
                  <FaAward />
                </PillarIcon>
                <h3>Excellence</h3>
                <p>
                  Deliver consistent, reliable, and high-quality services to our
                  clients.
                </p>
              </Pillar>
              <Pillar className="animate-on-scroll">
                <PillarIcon>
                  <FaGlobeAsia />
                </PillarIcon>
                <h3>Global Reach</h3>
                <p>
                  Build strong, long-term partnerships with businesses
                  abroad—especially in Australia and New Zealand.
                </p>
              </Pillar>
              <Pillar className="animate-on-scroll">
                <PillarIcon>
                  <FaChartLine />
                </PillarIcon>
                <h3>Growth</h3>
                <p>
                  Foster a learning culture that encourages continuous
                  professional and personal development.
                </p>
              </Pillar>
              <Pillar className="animate-on-scroll">
                <PillarIcon>
                  <FaBullseye />
                </PillarIcon>
                <h3>Impact</h3>
                <p>
                  Drive positive change by connecting local talent with global
                  opportunities.
                </p>
              </Pillar>
            </VisionPillars>

            <VisionClosing className="animate-on-scroll">
              <p>
                We believe in building a future where Cambodian innovation is
                recognized and valued on a global stage.
              </p>
            </VisionClosing>
          </div>
        </VisionSection>

        {/* Team CTA */}
        <TeamCTASection>
          <div className="container">
            <TeamCTATitle className="animate-on-scroll">Join Our Growing Team</TeamCTATitle>
            <p className="animate-on-scroll" style={{ color: "#52514a" }}>
              We're always looking for talented Cambodian professionals to join
              our team.
            </p>
            <CTAButton className="animate-on-scroll" onClick={() => window.location.href = '/Careers'}>Explore Careers</CTAButton>
          </div>
        </TeamCTASection>
      </AboutUsContainer>
    </>
  );
};

export default AboutUs;