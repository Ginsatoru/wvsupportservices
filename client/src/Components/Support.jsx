import React from 'react';
import styled from 'styled-components';
import headerImage from './Images/header.png';

// ================ STYLED COMPONENTS ================
const MainContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    max-width: 95%; /* Increased width for tablets */
    padding: 1.5rem; /* Reduced padding for tablets */
  }

  @media (max-width: 576px) {
    max-width: 98%; /* Increased width for mobile */
    padding: 1rem; /* Reduced padding for mobile */
  }
`;

const SupportHeader = styled.header`
  text-align: center;
  padding: 4.9rem; /* Default padding */
  background: linear-gradient(rgba(15, 138, 190, 0.8), rgba(15, 138, 190, 0.9)), 
              url(${headerImage}) center/cover no-repeat;
  border-bottom: 4px solid #0f8abe;

  h1 {
  font-weight:bold;
      animation: slideIn 0.5s ease-in-out;
    color: white;
    font-size: 2.3rem; /* Default font size */
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem; /* Smaller font size for tablets */
    }

    @media (max-width: 576px) {
      font-size: 1.8rem; /* Even smaller font size for mobile */
    }
  }

  p {
    animation: slideIn 0.5s ease-in-out;
    color: white;
    font-size: 1.2rem; /* Default font size */
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 1rem; /* Smaller font size for tablets */
    }

    @media (max-width: 576px) {
      font-size: 0.9rem; /* Even smaller font size for mobile */
    }
  }

  @media (max-width: 768px) {
    padding: 3.5rem; /* Reduced padding for tablets */
  }

  @media (max-width: 576px) {
    padding: 2.5rem; /* Reduced padding for mobile */
  }
`;

// Shared Section Title
const SectionTitle = styled.h2`
    animation: slideIn 0.5s ease-in-out;
  padding-top: 5%;
  color: #0f8abe;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  position: relative;


  @media (max-width: 768px) {
    font-size: 2rem; /* Smaller font size for tablets */
  }

  @media (max-width: 576px) {
    font-size: 1.8rem; /* Even smaller font size for mobile */
  }
`;

// ===== SECTION 1: CARD STYLE =====
const CardContainer = styled.div`
  animation: slideIn 0.5s ease-in-out;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  margin: 3rem 0;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Single column for tablets */
    gap: 1.5rem; /* Adjusted gap for better spacing */
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr; /* Single column for mobile */
    gap: 1rem; /* Reduced gap for mobile */
  }
`;

const ImageSection = styled.div`
  position: relative;
  min-height: 400px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(15, 138, 190, 0.2) 0%, rgba(15, 138, 190, 0.05) 100%);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ContentSection = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
`;

const ServiceTitle = styled.h3`
  color: #0f8abe;
  font-size: 1.4rem;
  margin: 1.8rem 0 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;

  &::before {
    content: '•';
    color: #0f8abe;
    margin-right: 10px;
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Smaller font size for tablets */
  }

  @media (max-width: 576px) {
    font-size: 1rem; /* Even smaller font size for mobile */
  }
`;

const Description = styled.p`
  color: #52514a;
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1.2rem;
`;

const HighlightBox = styled.div`
  background: rgba(15, 138, 190, 0.08);
  border-left: 4px solid #0f8abe;
  padding: 1.2rem;
  border-radius: 0 8px 8px 0;
  margin: 1.5rem 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
  border-top: 3px solid #0f8abe;
  
  h4 {
    color: #0f8abe;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p {
    color: #52514a;
    font-size: 0.95rem;
    margin: 0;
    line-height: 1.5;
  }
`;

// ===== SECTION 2: STATS PANEL =====
const StatsSection = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 16px;
  padding: 3rem 2rem;
  margin: 4rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 100%;
    background: linear-gradient(to bottom, #0f8abe, #4fc3f7);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem; /* Adjusted gap for tablets */
  }

  @media (max-width: 576px) {
    gap: 1rem; /* Reduced gap for mobile */
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #0f8abe;
    font-size: 2.5rem;
    margin: 0;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 2rem; /* Smaller font size for tablets */
    }

    @media (max-width: 576px) {
      font-size: 1.8rem; /* Even smaller font size for mobile */
    }
  }

  p {
    color: #52514a;
    font-size: 1.1rem;
    margin: 0.5rem 0 0;

    @media (max-width: 768px) {
      font-size: 1rem; /* Adjust font size for tablets */
    }

    @media (max-width: 576px) {
      font-size: 0.9rem; /* Adjust font size for mobile */
    }
  }
`;

// ===== SECTION 3: PROCESS TIMELINE =====
const TimelineSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem 2rem;
  margin: 4rem 0;
  position: relative;
`;

const Timeline = styled.ol`
  list-style: none;
  padding: 0;
  position: relative;
  max-width: 800px;
  margin: 3rem auto 0;

  @media (max-width: 768px) {
    max-width: 95%; /* Increased width for tablets */
  }

  @media (max-width: 576px) {
    max-width: 98%; /* Increased width for mobile */
  }
`;

const TimelineItem = styled.li`
  position: relative;
  padding-left: 100px;
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '${props => props.step}';
    position: absolute;
    left: 30px;
    top: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #0f8abe;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;

const TimelineContent = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 20px;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-right: 15px solid #f8f9fa;
  }

  h4 {
  font-weight:bold;
    color: #0f8abe;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.3rem;

    @media (max-width: 768px) {
      font-size: 1.2rem; /* Smaller font size for tablets */
    }

    @media (max-width: 576px) {
      font-size: 1rem; /* Even smaller font size for mobile */
    }
  }

  p {
    color: #52514a;
    margin: 0;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 1rem; /* Adjust font size for tablets */
    }

    @media (max-width: 576px) {
      font-size: 0.9rem; /* Adjust font size for mobile */
    }
  }
`;

// ================ COMPONENT ================
const Support = () => {
  return (
    <>
      <SupportHeader>
        <h1>Welcome to Our Support Services</h1>
        <p>
          We ensure your business runs smoothly. Our team is here to assist you with any technical challenges.
        </p>
      </SupportHeader>
      <MainContainer>
        {/* SECTION 1: CARD STYLE */}
        <SectionTitle>Premium Remote Support</SectionTitle>
        <CardContainer>
          <ImageSection>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Professional support team providing remote assistance" 
            />
          </ImageSection>
          
          <ContentSection>
            <ServiceTitle>Comprehensive Troubleshooting</ServiceTitle>
            <Description>
              Our specialized Remote Troubleshooting Support delivers rapid, dependable solutions for your RetailManager POS ecosystem. We handle everything from single-store setups to complex multi-store configurations and e-commerce integrations.
            </Description>
            
            <HighlightBox>
              <Description>
                Based in Siem Reap with dedicated Australia-facing support, our team combines technical expertise with cultural understanding to provide service that truly meets your business needs.
              </Description>
            </HighlightBox>
            
            <ServiceTitle>Our Support Advantages</ServiceTitle>
            
            <FeatureGrid>
              <FeatureCard>
                <h4>Rapid Response</h4>
                <p>Under 15 minute response for critical priority cases</p>
              </FeatureCard>
              <FeatureCard>
                <h4>Deep Expertise</h4>
                <p>Specialists in RetailManager POS and web integrations</p>
              </FeatureCard>
              <FeatureCard>
                <h4>Secure Access</h4>
                <p>Military-grade encryption for all remote sessions</p>
              </FeatureCard>
              <FeatureCard>
                <h4>Proactive Care</h4>
                <p>Preventive maintenance and monitoring options</p>
              </FeatureCard>
            </FeatureGrid>
            
            <Description>
              Beyond immediate issue resolution, we provide strategic guidance to optimize your system performance, reduce future downtime, and maximize your technology investment. Our support is designed to keep your retail operations running seamlessly 24/7.
            </Description>
          </ContentSection>
        </CardContainer>

        {/* SECTION 2: STATS PANEL */}
        <SectionTitle style={{ marginTop: '6rem' }}>Our Support By Numbers</SectionTitle>
        <StatsSection>
          <StatsGrid>
            <StatItem>
              <h3>24/7</h3>
              <p>Availability for critical issues</p>
            </StatItem>
            <StatItem>
              <h3>98%</h3>
              <p>First-contact resolution rate</p>
            </StatItem>
            <StatItem>
              <h3>15min</h3>
              <p>Average response time</p>
            </StatItem>
            <StatItem>
              <h3>500+</h3>
              <p>Systems supported annually</p>
            </StatItem>
          </StatsGrid>
        </StatsSection>

        {/* SECTION 3: PROCESS TIMELINE */}
        <SectionTitle>Our Support Process</SectionTitle>
        <TimelineSection>
          <Timeline>
            <TimelineItem step="1">
              <TimelineContent>
                <h4>Initial Contact</h4>
                <p>Reach us via phone, email, or our support portal. Our system automatically prioritizes your request based on urgency.</p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem step="2">
              <TimelineContent>
                <h4>Diagnostic Analysis</h4>
                <p>We perform remote diagnostics to identify the root cause, whether it's software, hardware, or integration related.</p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem step="3">
              <TimelineContent>
                <h4>Solution Implementation</h4>
                <p>After your approval, we implement the solution while maintaining full communication throughout the process.</p>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem step="4">
              <TimelineContent>
                <h4>Verification & Follow-up</h4>
                <p>We confirm the resolution with you and schedule any necessary follow-up to ensure continued stability.</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </TimelineSection>
      </MainContainer>
    </>
  );
};

export default Support;