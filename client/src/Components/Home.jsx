import React from "react";
import Team from "./Team";
import Gallery from "./Gallery";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./i18n";
import FeaturesSection from "./FeaturesSection";
import Achievements from "./Achievements";
import OurServices from "./OurServices";
import RetailManagerTroubleshooting from "./RetailManagerTroubleshooting";
import CustomerSupportExperience from "./CustomerSupportExperience";
import Partners from "./Partners";
import Hero from "./Hero";
import WelcomeMessage from "./WelcomePop";

function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <section className="main">
        <section className="team-section-wrapper">
          <Hero />
        </section>

        <section className="team-section-wrapper">
          <WelcomeMessage />
        </section>

        {/* First page */}

        <section className="team-section-wrapper">
          <OurServices />
        </section>

        {/* Second page */}

        <section className="team-section-wrapper">
          <RetailManagerTroubleshooting />
        </section>

        {/* Fouth page */}

        <section className="team-section-wrapper">
          <CustomerSupportExperience />
        </section>

        {/* Fift page */}

        <section className="team-section-wrapper">
          <FeaturesSection />
        </section>

        <section className="team-section-wrapper">
          <Team />
        </section>

        {/* Sixth Page */}

        <section className="team-section-wrapper">
          <Partners />
        </section>

        <section className="team-section-wrapper">
          <Gallery />
        </section>

        {/* Seven page */}

        <section className="team-section-wrapper">
          <Achievements />
        </section>
      </section>
    </>
  );
}

export default Home;
