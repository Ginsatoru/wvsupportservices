import React, { useState } from "react";
import { FaMapMarkerAlt, FaIndustry } from "react-icons/fa"; // Importing icons
import "./Projects.css";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = [
    "All",
    "POS Support",
    "Webstore Integration",
    "Multi-Store Management",
  ];

  const projectData = [
    {
      id: 1,
      title: "RetailChain POS Deployment",
      description: "Deployed POS systems across 50+ stores in Southeast Asia.",
      category: "POS Support",
      location: "Singapore, Malaysia, Thailand",
      industry: "Retail Fashion",
      image: "./src/Components/Images/pos.jpg",
      caseStudyLink: "https://www.aaapos.com/",
    },
    {
      id: 2,
      title: "E-Commerce Integration",
      description:
        "Integrated webstore with existing POS for seamless inventory management",
      category: "Webstore Integration",
      location: "Australia, New Zealand",
      industry: "Home Goods",
      image: "./src/Components/Images/ecommerce.jpg",
      caseStudyLink: "https://www.aaapos.com/",
    },
    {
      id: 3,
      title: "Multi-Store System",
      description:
        "Centralized management solution for franchise operations in 3 countries",
      category: "Multi-Store Management",
      location: "Japan, South Korea",
      industry: "Food & Beverage",
      image: "./src/Components/Images/system.jpg",
      caseStudyLink: "https://www.aaapos.com/",
    },
    {
      id: 4,
      title: "POS Upgrade & Migration",
      description: "Seamless migration to new POS platform with zero downtime",
      category: "POS Support",
      location: "United Kingdom",
      industry: "Specialty Retail",
      image: "./src/Components/Images/upgrade.jpg",
      caseStudyLink: "https://www.aaapos.com/",
    },
    {
      id: 5,
      title: "Omnichannel Retail Solution",
      description: "Integrated online & offline sales for unified experience",
      category: "Webstore Integration",
      location: "United States",
      industry: "Electronics",
      image: "./src/Components/Images/solution.jpg",
      caseStudyLink: "https://www.aaapos.com/",
    },
    {
      id: 6,
      title: "Franchise Support",
      description: "24/7 technical support for franchise network across Europe",
      category: "Multi-Store Management",
      location: "Germany, France, Spain",
      industry: "Health & Beauty",
      image: "./src/Components/Images/operation.jpg",
      caseStudyLink: "https://www.aaapos.com/",
    },
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projectData
      : projectData.filter((project) => project.category === activeFilter);

  return (
    <div className="projects-page">
      <div className="hero-projects">
        <div className="projects-content">
          <h1>Our Global Support Projects</h1>
          <p>
            Delivering exceptional technical support from Cambodia to clients
            worldwide
          </p>
        </div>
      </div>

      <div className="container">
        <div className="section-title">
          <h2>Featured Projects</h2>
          <p>
            Explore our international support initiatives and success stories
          </p>
        </div>

        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${
                activeFilter === filter ? "active" : ""
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <span className="project-category">{project.category}</span>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-meta">
                  <span
                    className="client-location"
                    style={{
                      color: "#52514a",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <FaMapMarkerAlt /> {project.location}
                  </span>
                  <span
                    className="client-industry"
                    style={{
                      color: "#52514a",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <FaIndustry /> {project.industry}
                  </span>
                </div>
                <a href={project.caseStudyLink} className="case-study-link">
                  Learn more ➔
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
