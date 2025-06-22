import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaGlobe,
  FaMobileAlt,
  FaPaintBrush,
  FaWordpress,
  FaTools,
  FaShoppingCart,
  FaRocket,
  FaShieldAlt,
  FaHandshake,
  FaChartLine,
  FaQuoteLeft,
  FaUserTie,
  FaServer,
  // FaReact,
  // FaNodeJs,
  // FaAngular,
  // FaVuejs,
  // FaApple,
  // FaAndroid,
  // FaWindows,
  // FaLaravel,
  // FaBootstrap,
  // FaFigma,
} from "react-icons/fa";
import { IoMdTrendingUp } from "react-icons/io";
import { GiProgression } from "react-icons/gi";
import headerImage from "./Images/header.png";

import reactIcon from "./Images/react.png";
import nodeIcon from "./Images/nodejs.png";
import angularIcon from "./Images/angular.png";
import vueIcon from "./Images/vue.png";
import iosIcon from "./Images/ios.png";
import androidIcon from "./Images/android.png";
import windowsIcon from "./Images/windows.png";
import wordpressIcon from "./Images/wordpress.png";
import laravelIcon from "./Images/laravel.png";
import bootstrapIcon from "./Images/bootstrap.png";
import figmaIcon from "./Images/figma.png";
import canvaIcon from "./Images/canva.png";

const HeroSection = styled.div`
  background: linear-gradient(rgba(15, 138, 190, 0.8), rgba(15, 138, 190, 0.9)),
    url(${headerImage}) center/cover no-repeat;
  color: white;
  padding: 5.1rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  @keyframes slideIn {
    from {
      transform: translateX(-50px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  animation: slideIn 0.5s ease-in-out;
`;

const HeroSubtitle = styled.p`
  @keyframes slideIn {
    from {
      transform: translateX(-50px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  animation: slideIn 0.5s ease-in-out;
  font-size: 1.2rem;
  opacity: 0.9;
  color: #fff;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 20px;
`;

const ServiceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 50%;
`;

const ServiceTitle = styled.h3`
  font-weight: 600;
  font-size: 1.3rem;
  color: #52514a;
  margin-bottom: 1rem;
`;

const ServiceDescription = styled.p`
  color: #52514a;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const ServiceDetails = styled.p`
  color: #52514a;
  font-size: 0.85rem;
  line-height: 1.6;
`;

// New Technologies Section Styles
const TechnologiesSection = styled.section`
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  text-align: center;
`;

const TechImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const TechGrid = styled.div`
  max-width: 1170px;
  margin: 3rem auto 0;
`;

const TechGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TechItem = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: 0.3s ease;

  &:hover {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
`;

const TechIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  margin-bottom: 1rem;
`;

const TechName = styled.h4`
  font-size: 1.25rem;
  color: #1a1a2e;
  margin-bottom: 0;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const ProcessSection = styled.section`
  padding: 4rem 0;
  background: #f9fbfd;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #0f8abe;
  margin-bottom: 1rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
  line-height: 1.2;
`;

const SectionSubtitle = styled.p`
  color: #52514a;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 3rem auto;
  line-height: 1.6;
`;

const ProcessSteps = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ProcessStep = styled.div`
  flex: 1;
  min-width: 250px;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const StepIcon = styled.div`
  font-size: 2rem;
  color: #3498db;
  margin-bottom: 1.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 50%;
`;

const StepTitle = styled.h3`
font-weight:600;
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  color: #52514a;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const WhyChooseUsSection = styled.section`
  padding: 5rem 0;
  background: #f8fafc;
  text-align: center;
`;

const WhyChooseUsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const WhyChooseUsTitle = styled.h2`
  font-size: 2rem;
  color: #0f8abe;
  margin-bottom: 1.5rem;
  font-weight: 700;
  position: relative;
  display: inline-block;
`;

const WhyChooseUsSubtitle = styled.p`
  color: #52514a;
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 3rem auto;
  line-height: 1.6;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
`;

const BenefitCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  }
`;

const BenefitIcon = styled.div`
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1.5rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 50%;
`;

const BenefitTitle = styled.h3`
font-weight:600;
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const BenefitDescription = styled.p`
  color: #52514a;
  line-height: 1.7;
  font-size: 1rem;
`;

const CtaSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  color: #0f8abe;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: #of8abe;
    border-radius: 50%;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: -80px;
    left: -80px;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }
`;

const CtaContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const CtaTitle = styled.h2`
  line-height: 1.2;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const CtaSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: #52514a;
`;

const CtaButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2.5rem;
  background: white;
  color: #3498db;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    background: #f8f9fa;
  }
`;

const services = [
  {
    title: "Web Development",
    description:
      "Fast, responsive, and scalable websites tailored to your needs.",
    icon: <FaGlobe />,
    route: "/web-development",
    details:
      "Custom website design, CMS integration, and performance optimization.",
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile apps that perform seamlessly.",
    icon: <FaMobileAlt />,
    route: "/mobile-app-development",
    details: "Mobile apps for iOS and Android with a focus on performance.",
  },
  {
    title: "UI/UX Design",
    description: "Beautiful, user-focused designs for great experiences.",
    icon: <FaPaintBrush />,
    route: "/ui-design",
    details:
      "Intuitive interfaces and user experiences aligned with your brand.",
  },
  {
    title: "WordPress",
    description: "Custom WordPress websites for your business needs.",
    icon: <FaWordpress />,
    route: "/wordpress",
    details: "Theme customization, plugin development, and SEO optimization.",
  },
  {
    title: "IT Support",
    description: "Expert IT support for smoother operations.",
    icon: <FaTools />,
    route: "/ITsupport",
    details: "Troubleshooting, system maintenance, and 24/7 monitoring.",
  },
  {
    title: "Web Hosting",
    description: "Web hosting stores your website files on a server.",
    icon: <FaServer />,
    route: "/web-hosting",
    details: "This makes your site accessible to visitors online anytime.",
  },
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Our Services</HeroTitle>
          <HeroSubtitle>
            Discover the digital solutions we offer to power your business.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            as={service.route ? Link : "div"}
            to={service.route ? service.route : undefined}
            style={{ cursor: service.route ? "pointer" : "default" }}
          >
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <ServiceDetails>{service.details}</ServiceDetails>
          </ServiceCard>
        ))}
      </ServicesGrid>

      {/* New Technologies Section */}
      <TechnologiesSection>
        <SectionTitle>Technologies We Work With</SectionTitle>
        <SectionSubtitle>
          Our expertise spans across the most popular and powerful technologies
          in the industry
        </SectionSubtitle>

        <TechGrid>
          <TechGroup>
            <TechItem data-aos="fade-up" data-aos-delay="0">
              <TechIcon>
                <TechImage src={reactIcon} alt="React JS" />
              </TechIcon>
              <TechName>React JS</TechName>
            </TechItem>
            <TechItem data-aos="fade-up" data-aos-delay="100">
              <TechIcon>
                <TechImage src={nodeIcon} alt="Node JS" />
              </TechIcon>
              <TechName>Node JS</TechName>
            </TechItem>
            <TechItem data-aos="fade-up" data-aos-delay="200">
              <TechIcon>
                <TechImage src={angularIcon} alt="Angular" />
              </TechIcon>
              <TechName>Angular</TechName>
            </TechItem>
            <TechItem data-aos="fade-up" data-aos-delay="300">
              <TechIcon>
                <TechImage src={vueIcon} alt="Vue.js" />
              </TechIcon>
              <TechName>Vue.js</TechName>
            </TechItem>
          </TechGroup>

          <TechGroup>
            <TechItem data-aos="fade-up" data-aos-delay="0">
              <TechIcon>
                <TechImage src={iosIcon} alt="iOS" />
              </TechIcon>
              <TechName>iOS</TechName>
            </TechItem>
            <TechItem data-aos="fade-up" data-aos-delay="100">
              <TechIcon>
                <TechImage src={androidIcon} alt="Android" />
              </TechIcon>
              <TechName>Android</TechName>
            </TechItem>
            <TechItem data-aos="fade-up" data-aos-delay="200">
              <TechIcon>
                <TechImage src={windowsIcon} alt="Windows" />
              </TechIcon>
              <TechName>Windows</TechName>
            </TechItem>
            <TechItem data-aos="fade-up" data-aos-delay="300">
              <TechIcon>
                <TechImage src={canvaIcon} alt="Figma" />
              </TechIcon>
              <TechName>Figma</TechName>
            </TechItem>
          </TechGroup>

          <TechGroup>
            <TechItem data-aos="fade-up" data-aos-delay="0">
              <TechIcon>
                <TechImage src={wordpressIcon} alt="WordPress" />
              </TechIcon>
              <TechName>WordPress</TechName>
            </TechItem>
            <TechItem data-aos="fade-up" data-aos-delay="100">
              <TechIcon>
                <TechImage src={laravelIcon} alt="Laravel" />
              </TechIcon>
              <TechName>Laravel</TechName>
            </TechItem>
            <TechItem data-aos="fade-up" data-aos-delay="200">
              <TechIcon>
                <TechImage src={bootstrapIcon} alt="Bootstrap" />
              </TechIcon>
              <TechName>Bootstrap</TechName>
            </TechItem>
            <TechItem data-aos="fade-up" data-aos-delay="300">
              <TechIcon>
                <TechImage src={figmaIcon} alt="Figma" />
              </TechIcon>
              <TechName>Figma</TechName>
            </TechItem>
          </TechGroup>
        </TechGrid>
      </TechnologiesSection>

      <ProcessSection>
        <SectionTitle>Our Working Process</SectionTitle>
        <SectionSubtitle>
          We follow a proven methodology to deliver exceptional results for
          every project
        </SectionSubtitle>
        <ProcessSteps>
          <ProcessStep data-aos="fade-up" data-aos-delay="0">
            <StepIcon>
              <FaHandshake />
            </StepIcon>
            <StepTitle>Discovery</StepTitle>
            <StepDescription>
              We start by understanding your business goals, target audience,
              and project requirements.
            </StepDescription>
          </ProcessStep>
          <ProcessStep data-aos="fade-up" data-aos-delay="100">
            <StepIcon>
              <FaPaintBrush />
            </StepIcon>
            <StepTitle>Design</StepTitle>
            <StepDescription>
              Our designers create wireframes and prototypes to visualize the
              user experience.
            </StepDescription>
          </ProcessStep>
          <ProcessStep data-aos="fade-up" data-aos-delay="200">
            <StepIcon>
              <FaRocket />
            </StepIcon>
            <StepTitle>Development</StepTitle>
            <StepDescription>
              Our developers bring the design to life with clean, efficient code
              and modern technologies.
            </StepDescription>
          </ProcessStep>
          <ProcessStep data-aos="fade-up" data-aos-delay="300">
            <StepIcon>
              <FaShieldAlt />
            </StepIcon>
            <StepTitle>Testing & Launch</StepTitle>
            <StepDescription>
              Rigorous testing ensures quality before we deploy your solution to
              the world.
            </StepDescription>
          </ProcessStep>
        </ProcessSteps>
      </ProcessSection>

      <WhyChooseUsSection>
        <WhyChooseUsContainer>
          <WhyChooseUsTitle data-aos="fade-up">Why Choose Us?</WhyChooseUsTitle>
          <WhyChooseUsSubtitle data-aos="fade-up" data-aos-delay="100">
            We combine technical expertise with creative thinking to deliver
            solutions that drive real business results.
          </WhyChooseUsSubtitle>

          <BenefitsGrid>
            <BenefitCard data-aos="fade-up" data-aos-delay="0">
              <BenefitIcon>
                <IoMdTrendingUp />
              </BenefitIcon>
              <BenefitTitle>Proven Results</BenefitTitle>
              <BenefitDescription>
                We've helped hundreds of clients achieve measurable success
                through our data-backed strategies and execution.
              </BenefitDescription>
            </BenefitCard>

            <BenefitCard data-aos="fade-up" data-aos-delay="100">
              <BenefitIcon>
                <GiProgression />
              </BenefitIcon>
              <BenefitTitle>Scalable Solutions</BenefitTitle>
              <BenefitDescription>
                Our architectures grow with your business, ensuring you never
                outpace your technology infrastructure.
              </BenefitDescription>
            </BenefitCard>

            <BenefitCard data-aos="fade-up" data-aos-delay="200">
              <BenefitIcon>
                <FaChartLine />
              </BenefitIcon>
              <BenefitTitle>Data-Driven Approach</BenefitTitle>
              <BenefitDescription>
                Every decision is informed by analytics and user research to
                maximize ROI and user satisfaction.
              </BenefitDescription>
            </BenefitCard>
          </BenefitsGrid>
        </WhyChooseUsContainer>
      </WhyChooseUsSection>

      <CtaSection>
        <CtaContainer data-aos="fade-up">
          <CtaTitle>Ready to Transform Your Business?</CtaTitle>
          <CtaSubtitle>
            Let's discuss how we can help you achieve your digital goals. Our
            team is ready to bring your vision to life.
          </CtaSubtitle>
          <CtaButton to="/contact">Get Started Today</CtaButton>
        </CtaContainer>
      </CtaSection>
    </>
  );
};

export default Services;
