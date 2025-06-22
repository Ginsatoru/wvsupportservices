import React from 'react';
import styled from 'styled-components';
import troubleshootingImage from './Images/image5.png';
import retailSoftwareImage from './Images/RM.png';
import supportTeamImage from './Images/team.png';
import processImage from './Images/method.png';
import testimonial1 from './Images/sarah.png';
import testimonial2 from './Images/michael.png';

const Container = styled.section`
  font-family: 'Montserrat', sans-serif;
  background-color: white;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Heading = styled.h2`
  color: #0f8abe;
  font-size: 1.8rem;
  font-weight: 700;
  position: relative;
  line-height: 1.3;


  @media (min-width: 576px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 768px) {
    font-size: 2.3rem;
  }

  @media (min-width: 992px) {
    font-size: 2.5rem;
  }
`;

const SubHeading = styled.h3`
  color: #0f8abe;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1.8rem 0 1rem;
  line-height: 1.3;

  @media (min-width: 576px) {
    font-size: 1.5rem;
  }

  @media (min-width: 768px) {
    font-size: 1.7rem;
    margin: 2rem 0 1rem;
  }

  @media (min-width: 992px) {
    font-size: 1.8rem;
  }
`;

const Paragraph = styled.p`
  color: #52514a;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem 0;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
    margin: 2rem 0;
  }
`;

const ImageCard = styled.div`
  flex: 1;
  min-width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 576px) {
    min-width: 300px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  @media (min-width: 768px) {
    height: 220px;
  }
`;

const ImageCaption = styled.div`
  padding: 1rem;
  background: white;
  color: #52514a;
  font-size: 0.9rem;
  text-align: center;
`;

const HighlightBox = styled.div`
  background-color: #f5f9fc;
  border-left: 4px solid #0f8abe;
  padding: 1.2rem;
  margin: 1.5rem 0;
  border-radius: 0 4px 4px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 1.5rem;
    margin: 2rem 0;
    gap: 2rem;
  }
`;

const HighlightImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
  border-radius: 4px;
`;

const List = styled.ul`
  color: #52514a;
  margin: 1.2rem 0 1.2rem 1rem;
  padding-left: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.6rem;
  line-height: 1.5;
  font-size: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0.8rem;
    font-size: 1.1rem;
  }
`;

const TestimonialsContainer = styled.div`
  margin: 2.5rem 0;
  padding: 1.5rem 0;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;

  @media (min-width: 768px) {
    margin: 3rem 0;
    padding: 2rem 0;
  }
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }
`;

const TestimonialCard = styled.div`
  background: #f9f9f9;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const TestimonialContent = styled.p`
  font-style: italic;
  color: #52514a;
  margin-bottom: 1rem;
  position: relative;
  font-size: 0.95rem;
  
  &:before {
    content: '"';
    font-size: 2.5rem;
    color: #0f8abe;
    opacity: 0.2;
    position: absolute;
    left: -10px;
    top: -15px;
  }

  @media (min-width: 768px) {
    font-size: 1rem;
    
    &:before {
      font-size: 3rem;
      left: -15px;
    }
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const AuthorImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: #0f8abe;
  font-size: 0.95rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

const AuthorTitle = styled.span`
  font-size: 0.75rem;
  color: #777;

  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ProcessContainer = styled.div`
  margin: 2.5rem 0;

  @media (min-width: 768px) {
    margin: 3rem 0;
  }
`;

const ProcessSteps = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  margin-top: 1.5rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    margin-top: 2rem;
  }
`;

const ProcessStep = styled.div`
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #0f8abe;
  position: relative;
  padding-top: 2rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
    padding-top: 2.5rem;
  }
`;

const StepNumber = styled.div`
  position: absolute;
  top: -20px;
  left: 15px;
  width: 40px;
  height: 40px;
  background: #0f8abe;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
`;

const StepTitle = styled.h4`
  color: #0f8abe;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;

  @media (min-width: 576px) {
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
`;

const StepDescription = styled.p`
  color: #52514a;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 0.95rem;
  }
`;

const TroubleshootingExperience = () => {
  return (
    <Container>
      <Heading>RetailManager Troubleshooting Experience</Heading>
      <SubHeading>We'd love to tell you about us</SubHeading>
      
      <ImageContainer>
        <ImageCard>
          <Image src={retailSoftwareImage} alt="RetailManager software interface" />
          <ImageCaption>RetailManager POS System Interface</ImageCaption>
        </ImageCard>
        <ImageCard>
          <Image src={supportTeamImage} alt="Support team working" />
          <ImageCaption>Our Expert Support Team</ImageCaption>
        </ImageCard>
      </ImageContainer>
      
      <Paragraph>
        Our team brings unparalleled expertise in diagnosing and resolving RetailManager software issues, ensuring smooth customer operations and minimal downtime for your business. With every technical challenge we address, we're committed to delivering solutions that enhance your operational efficiency.
      </Paragraph>
      
      <HighlightBox>
        <HighlightImage src={troubleshootingImage} alt="Troubleshooting process" />
        <div>
          <Paragraph>
            Backed by 25+ years of collective experience in supporting RetailManager environments across various industries, we've developed a deep understanding of the unique challenges retailers face in today's competitive landscape.
          </Paragraph>
          <Paragraph>
            Our specialists are skilled in troubleshooting software errors, database inconsistencies, and system configuration issues with precision and speed.
          </Paragraph>
        </div>
      </HighlightBox>
      
      <SubHeading>Comprehensive Technical Support</SubHeading>
      
      <Paragraph>
        We provide end-to-end support for all RetailManager systems, including:
      </Paragraph>
      
      <List>
        <ListItem>Guiding users through transaction errors and payment processing issues</ListItem>
        <ListItem>Resolving connectivity problems between POS systems and backend servers</ListItem>
        <ListItem>Troubleshooting integration concerns with third-party applications</ListItem>
        <ListItem>Addressing inventory management and reporting discrepancies</ListItem>
        <ListItem>Optimizing system performance for high-volume retail environments</ListItem>
      </List>
      
      <SubHeading>Advanced Diagnostic Capabilities</SubHeading>
      
      <Paragraph>
        Our team excels in log analysis, applying patches, and implementing workarounds for known issues. We maintain up-to-date knowledge of all RetailManager versions and updates, ensuring we can support both legacy systems and the latest releases.
      </Paragraph>
      
      <Paragraph>
        For complex cases that require deeper investigation, we follow a structured escalation process while maintaining transparent communication with your team. Our approach combines technical expertise with excellent customer support, ensuring you understand each step of the resolution process.
      </Paragraph>

      <TestimonialsContainer>
        <SubHeading>What Our Clients Say</SubHeading>
        <Paragraph>
          Don't just take our word for it. Here's what RetailManager users say about our troubleshooting services:
        </Paragraph>
        
        <TestimonialGrid>
          <TestimonialCard>
            <TestimonialContent>
              The support team resolved our critical checkout system issue in under an hour during peak holiday season. Their expertise saved us thousands in potential lost sales.
            </TestimonialContent>
            <TestimonialAuthor>
              <AuthorImage src={testimonial1} alt="Sarah Johnson" />
              <AuthorInfo>
                <AuthorName>Sarah Johnson</AuthorName>
                <AuthorTitle>Retail Operations Manager, Fashion Outlet</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialContent>
              After struggling with inventory sync issues for months, their team identified and fixed the root cause in two days. We've had zero problems since.
            </TestimonialContent>
            <TestimonialAuthor>
              <AuthorImage src={testimonial2} alt="Michael Chen" />
              <AuthorInfo>
                <AuthorName>Michael Chen</AuthorName>
                <AuthorTitle>IT Director, Home & Living Stores</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialGrid>
      </TestimonialsContainer>

      <ProcessContainer>
        <SubHeading>Our Proven Troubleshooting Process</SubHeading>
        <Paragraph>
          We follow a systematic approach to ensure efficient and effective resolution of your RetailManager issues:
        </Paragraph>
        
        <ImageContainer>
          <ImageCard>
            <Image src={processImage} alt="Our troubleshooting process" />
            <ImageCaption>Our Structured Troubleshooting Methodology</ImageCaption>
          </ImageCard>
        </ImageContainer>
        
        <ProcessSteps>
          <ProcessStep>
            <StepNumber>1</StepNumber>
            <StepTitle>Initial Assessment</StepTitle>
            <StepDescription>
              We gather all relevant information about your issue, including error messages, recent changes, and system environment details.
            </StepDescription>
          </ProcessStep>
          
          <ProcessStep>
            <StepNumber>2</StepNumber>
            <StepTitle>Diagnosis</StepTitle>
            <StepDescription>
              Our experts analyze logs, replicate issues in test environments, and identify root causes using specialized diagnostic tools.
            </StepDescription>
          </ProcessStep>
          
          <ProcessStep>
            <StepNumber>3</StepNumber>
            <StepTitle>Solution Development</StepTitle>
            <StepDescription>
              We develop and test solutions, considering both immediate fixes and long-term prevention strategies.
            </StepDescription>
          </ProcessStep>
          
          <ProcessStep>
            <StepNumber>4</StepNumber>
            <StepTitle>Implementation</StepTitle>
            <StepDescription>
              Solutions are carefully implemented with minimal disruption, including user training if needed.
            </StepDescription>
          </ProcessStep>
          
          <ProcessStep>
            <StepNumber>5</StepNumber>
            <StepTitle>Follow-up</StepTitle>
            <StepDescription>
              We monitor the solution's effectiveness and provide additional support to ensure complete resolution.
            </StepDescription>
          </ProcessStep>
        </ProcessSteps>
      </ProcessContainer>
    </Container>
  );
};

export default TroubleshootingExperience;