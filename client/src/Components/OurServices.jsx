import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useInView } from "react-intersection-observer"; // Import useInView
import support from "./Images/support.png";
import remote from "./Images/remote.png";
import software from "./Images/software.png";
import integration from "./Images/integration.png";
import networking from "./Images/networking.png";
import training from "./Images/training.png";
import { useTranslation } from "react-i18next";
import "../Components/i18n";

// Slide-in animation
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  width: 100%;
  min-height: 95vh;
  background-color: white;
  padding: 20px 0;

  @media (max-width: 1629px) {
    min-height: 110vh;
    padding: 10px 0;
  }
`;

const MainText = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 90%;

  h2 {
    padding-top: 3%;
    animation: ${slideIn} 0.6s ease-in-out forwards;
    margin-bottom: 10px;
    color: #52514a;
    font-size: 15px;

    @media (max-width: 1440px) {
      font-size: 20px;
    }
    @media (max-width: 1024px) {
      font-size: 18px;
    }
    @media (max-width: 820px) {
      font-size: 18px;
    }
  }

  h1 {
    animation: ${slideIn} 0.5s ease-in-out forwards;
    margin-bottom: 12px;
    font-weight: bold;
    color: #0f8abe;
    font-size: 32px;

    @media (max-width: 1440px) {
      font-size: 30px;
    }
    @media (max-width: 1024px) {
      font-size: 28px;
    }
    @media (max-width: 820px) {
      font-size: 26px;
    }
    @media (max-width: 480px) {
      font-size: 22px;
    }
    @media (max-width: 360px) {
      font-size: 20px;
    }
  }

  p {
    animation: ${slideIn} 0.4s ease-in-out forwards;
    margin: 0 auto;
    width: 60%;
    color: #52514a;
    font-size: 17px;

    @media (max-width: 1440px) {
      font-size: 16px;
      width: 70%;
    }
    @media (max-width: 1024px) {
      font-size: 15px;
      width: 80%;
    }
    @media (max-width: 820px) {
      font-size: 16px;
      width: 80%;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

const Cards = styled.div`
  padding-top: 2%;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  cursor: pointer;

  @media (max-width: 1440px) {
    gap: 20px;
  }
  @media (max-width: 1024px) {
    gap: 16px;
  }
  @media (max-width: 820px) {
    gap: 15px;
  }
  @media (max-width: 768px) {
    gap: 20px;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
`;

const Card = styled.div`
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s ease;
  border: solid 1px #52514a1e;
  border-radius: 8px;
  width: 28.5%;
  min-width: 260px;
  min-height: 200px;
  color: #52514a;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left; /* Added to ensure text alignment is left by default */

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover {
    color: white;
    background-color: #0f8abe;

    img {
      filter: brightness(0) invert(1);
    }
  }

  @media (max-width: 1440px) {
    width: 30%;
  }
  @media (max-width: 1200px) {
    width: 32%;
  }
  @media (max-width: 1024px) {
    width: 45%;
    min-width: 220px;
    padding: 18px;
  }
  @media (max-width: 820px) {
    width: 45%;
    padding: 15px;
  }
  @media (max-width: 768px) {
    width: 48%;
    padding: 20px;
  }
  @media (max-width: 600px) {
    width: 100%;
    min-width: unset;
    min-height: 220px;
    padding: 15px;
  }
  @media (max-width: 360px) {
    min-height: 200px;
    padding: 15px;
  }
`;

const ContentSpace = styled.div`
  padding-top: 7%;
  margin: 0 auto;
  width: 90%;
  padding: 20px 0;
  text-align: left; /* Ensure content is left-aligned */

  img {
    transition: 0.4s ease;
    filter: brightness(0) saturate(100%) invert(35%) sepia(72%) saturate(569%)
      hue-rotate(164deg) brightness(94%) contrast(101%);
    margin-bottom: 15px;
    width: 3.5rem;

    @media (max-width: 1024px) {
      max-width: 100px;
    }

    @media (max-width: 820px) {
      width: 3rem;
    }

    @media (max-width: 480px) {
      width: 3rem;
    }
  }

  h1 {
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 20px;
    text-align: left; /* Ensure heading is left-aligned */

    @media (max-width: 820px) {
      font-size: 18px;
    }

    @media (max-width: 768px) {
      font-size: 18px;
    }

    @media (max-width: 360px) {
      font-size: 16px;
    }
  }

  p {
    font-size: 14px;
    text-align: left; /* Ensure paragraph is left-aligned */

    @media (max-width: 820px) {
      font-size: 13px;
    }

    @media (max-width: 360px) {
      font-size: 11px;
    }
  }
`;

const OurServices = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const services = [
    {
      title: "RetailManager POS Support",
      description:
        "Fast and efficient remote troubleshooting to resolve software issues and minimize downtime.",
      image: support,
      path: "/pos",
    },
    {
      title: "Remote Troubleshooting",
      description:
        "Quick remote troubleshooting via TeamViewer to resolve issues without on-site visits.",
      image: remote,
      path: "/Remote",
    },
    {
      title: "Software Updates & Maintenance",
      description:
        "Ensure smooth updates and system maintenance for your RetailManager POS.",
      image: software,
      path: "/software",
    },
    {
      title: "Third-Party Integrations",
      description:
        "We assist with app integrations to enhance your RetailManager POS experience.",
      image: integration,
      path: "/integrations",
    },
    {
      title: "Networking & Connectivity Support",
      description:
        "Diagnose and fix network issues to ensure reliable POS operations.",
      image: networking,
      path: "/networking",
    },
    {
      title: "Customer Assistance & Training",
      description:
        "Our team provides guidance and training on RetailManager POS best practices.",
      image: training,
      path: "/training",
    },
  ];

  return (
    <Section>
      <MainText>
        <h2>{t("Best")}</h2>
        <h1>{t("Our")}</h1>
        <p>{t("Servicesub")}</p>
      </MainText>

      <Cards>
        {services.map((service, index) => {
          const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.2,
          });

          return (
            <Card
              key={index}
              ref={ref}
              className={inView ? "visible" : ""}
              onClick={() => navigate(service.path)}
            >
              <ContentSpace>
                <img src={service.image} alt={service.title} />
                <h1>{service.title}</h1>
                <p>{service.description}</p>
              </ContentSpace>
            </Card>
          );
        })}
      </Cards>
    </Section>
  );
};

export default OurServices;