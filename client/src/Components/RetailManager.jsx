import React from "react";
import { Star, CheckCircle, Users, Clock, Shield, Zap } from "lucide-react";
import {
  FaLaptop,
  FaUserFriends,
  FaCreditCard,
  FaLink,
  FaTools,
  FaChartBar,
  FaBolt,
  FaSearch,
} from "react-icons/fa";
import posSystemImage from "./Images/RM.png"; // Replace with your actual image path
import supportTeamImage from "./Images/team.png"; // Replace with your actual image path
import troubleshootingImage from "./Images/trouble.png"; // New image for expertise section
import { Link } from "react-router-dom";

const TroubleshootingExperience = () => {
  return (
    <div className="font-['Montserrat'] bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Compact Hero Section */}
      <section className="relative bg-white shadow-xl rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f8abe]/5 to-[#0f8abe]/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              RetailManager
              <span className="text-[#0f8abe] block mt-1 md:mt-2 text-2xl md:text-3xl lg:text-4xl">
                Troubleshooting Experience
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Expert solutions for your retail software challenges with 25+
              years of experience
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href="https://www.aaapos.com/support/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#0f8abe] text-white px-6 py-3 rounded-xl font-semibold text-base hover:bg-[#0d7bb5] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Support Now
              </a>
              <a
                href="https://www.aaapos.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border-2 border-[#0f8abe] text-[#0f8abe] px-6 py-3 rounded-xl font-semibold text-base hover:bg-[#0f8abe] hover:text-white transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              We'd love to tell you about us
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Our team brings unparalleled expertise in diagnosing and resolving
              RetailManager software issues, ensuring smooth customer operations
              and minimal downtime for your business.
            </p>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-2xl md:text-3xl font-bold text-[#0f8abe] mb-1 md:mb-2">
                  25+
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  Years Experience
                </div>
              </div>
              <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-2xl md:text-3xl font-bold text-[#0f8abe] mb-1 md:mb-2">
                  500+
                </div>
                <div className="text-gray-600 font-medium text-sm md:text-base">
                  Clients Served
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="group cursor-pointer">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="h-40 md:h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={posSystemImage}
                    alt="RetailManager POS System Interface"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-center text-sm md:text-base">
                    RetailManager POS System
                  </h3>
                </div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="h-40 md:h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={supportTeamImage}
                    alt="Our Expert Support Team"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-center text-sm md:text-base">
                    Our Expert Support Team
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Highlight */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0f8abe]/5 to-[#0f8abe]/10 rounded-3xl p-8 md:p-12 border-l-8 border-[#0f8abe]">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div className="w-32 h-32 bg-[#0f8abe]/20 rounded-full flex items-center justify-center text-[#0f8abe] mx-auto overflow-hidden">
                  <img
                    src={troubleshootingImage}
                    alt="Troubleshooting Expertise"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Backed by 25+ Years of Experience
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We've developed a deep understanding of the unique challenges
                  retailers face in today's competitive landscape. Our
                  specialists are skilled in troubleshooting software errors,
                  database inconsistencies, and system configuration issues with
                  precision and speed.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-[#0f8abe] font-medium">
                    <Shield className="w-5 h-5" />
                    <span>Secure Solutions</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0f8abe] font-medium">
                    <Zap className="w-5 h-5" />
                    <span>Fast Resolution</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#0f8abe] font-medium">
                    <Users className="w-5 h-5" />
                    <span>Expert Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Comprehensive Technical Support
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide end-to-end support for all RetailManager systems,
            ensuring your business runs smoothly
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <FaCreditCard className="text-3xl text-[#0f8abe] mb-3" />,
              title: "Transaction & Payment Issues",
              description:
                "Guiding users through transaction errors and payment processing issues",
            },
            {
              icon: <FaLink className="text-3xl text-[#0f8abe] mb-3" />,
              title: "Connectivity Solutions",
              description:
                "Resolving connectivity problems between POS systems and backend servers",
            },
            {
              icon: <FaTools className="text-3xl text-[#0f8abe] mb-3" />,
              title: "Integration Support",
              description:
                "Troubleshooting integration concerns with third-party applications",
            },
            {
              icon: <FaChartBar className="text-3xl text-[#0f8abe] mb-3" />,
              title: "Inventory Management",
              description:
                "Addressing inventory management and reporting discrepancies",
            },
            {
              icon: <FaBolt className="text-3xl text-[#0f8abe] mb-3" />,
              title: "Performance Optimization",
              description:
                "Optimizing system performance for high-volume retail environments",
            },
            {
              icon: <FaSearch className="text-3xl text-[#0f8abe] mb-3" />,
              title: "Advanced Diagnostics",
              description:
                "Log analysis, patches, and workarounds for complex issues",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-t-4 border-[#0f8abe]"
            >
              <div className="flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-center text-lg">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Proven Troubleshooting Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We follow a systematic approach to ensure efficient and effective
              resolution of your RetailManager issues
            </p>
          </div>

          <div className="mb-12">
            <div className="bg-gradient-to-r from-[#0f8abe]/10 to-[#0f8abe]/20 rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <FaTools className="text-5xl text-[#0f8abe]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Our Structured Troubleshooting Methodology
              </h3>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                number: "1",
                title: "Initial Assessment",
                description:
                  "We gather all relevant information about your issue, including error messages, recent changes, and system environment details.",
              },
              {
                number: "2",
                title: "Diagnosis",
                description:
                  "Our experts analyze logs, replicate issues in test environments, and identify root causes using specialized diagnostic tools.",
              },
              {
                number: "3",
                title: "Solution Development",
                description:
                  "We develop and test solutions, considering both immediate fixes and long-term prevention strategies.",
              },
              {
                number: "4",
                title: "Implementation",
                description:
                  "Solutions are carefully implemented with minimal disruption, including user training if needed.",
              },
              {
                number: "5",
                title: "Follow-up",
                description:
                  "We monitor the solution's effectiveness and provide additional support to ensure complete resolution.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 relative pt-12 border-t-4 border-[#0f8abe]"
              >
                <div className="absolute -top-5 left-6 w-10 h-10 bg-[#0f8abe] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-[#0f8abe] mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what RetailManager users say
            about our troubleshooting services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              content:
                "The support team resolved our critical checkout system issue in under an hour during peak holiday season. Their expertise saved us thousands in potential lost sales.",
              author: "Sarah Johnson",
              title: "Retail Operations Manager, Fashion Outlet",
              avatar: "https://randomuser.me/api/portraits/women/68.jpg", // Example image
            },
            {
              content:
                "After struggling with inventory sync issues for months, their team identified and fixed the root cause in two days. We've had zero problems since.",
              author: "Michael Chen",
              title: "IT Director, Home & Living Stores",
              avatar: "https://randomuser.me/api/portraits/men/44.jpg", // Example image
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-l-4 border-[#0f8abe]"
            >
              {/* Star rating */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex text-[#0f8abe] text-xl">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.561-.955L10 0l2.952 5.955 6.561.955-4.757 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Testimonial content */}
              <blockquote className="text-gray-600 text-lg italic leading-relaxed mb-6 relative">
                <span className="text-[#0f8abe] text-6xl opacity-20 absolute -top-4 -left-2">
                  "
                </span>
                {testimonial.content}
              </blockquote>

              {/* Author info with image */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover shadow-md"
                />
                <div>
                  <div className="font-semibold text-[#0f8abe] text-lg">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f8abe] mb-6">
            Ready to Resolve Your RetailManager Issues?
          </h2>
          <p className="text-xl text-gray-900 mb-8 leading-relaxed">
            Our expert team is standing by to help you get back to business
            quickly and efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-[#0f8abe] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg inline-block text-center"
            >
              Contact Support Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TroubleshootingExperience;
