import React from "react";
import {
  Monitor,
  Shield,
  Globe,
  Headphones,
  Search,
  Wrench,
  Check,
  Quote,
  Clock,
  Lock,
  Users,
  Database,
  Printer,
  Network,
  GraduationCap,
} from "lucide-react";

const RetailManagerPOSSupport = () => {
  return (
    <div className="min-h-screen bg-white font-['Montserrat'] antialiased">
      {/* Header Section with Image Background */}
      <div 
        className="relative py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden"
        style={{
          background: "linear-gradient(rgba(15, 138, 190, 0.85), rgba(15, 138, 190, 0.9)), url('https://web-assets.bcg.com/dc/eb/b3a2abf44e32b5cfba378b05a77c/the-next-normal-outlook-for-australian-retail-in-2022.jpg') center/cover no-repeat"
        }}
      >
        <div className="relative max-w-4xl mx-auto z-10">
          <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm p-6 rounded-2xl mb-8 transition-all duration-500 hover:scale-105 hover:bg-white/30">
            <Monitor className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            RetailManager <span className="text-blue-200">POS</span> Support
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Premium 24/7 support with{" "}
            <span className="font-semibold text-blue-200">
              97% satisfaction rate
            </span>
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-16">
        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: <Clock className="h-8 w-8 text-[#0f8abe]" />,
              title: "Fast Response",
              description: "Under 10 minute average response time for critical issues",
              stats: "98% uptime guarantee",
            },
            {
              icon: <Lock className="h-8 w-8 text-[#0f8abe]" />,
              title: "Secure Support",
              description: "Military-grade encrypted remote sessions",
              stats: "100% security compliance",
            },
            {
              icon: <Globe className="h-8 w-8 text-[#0f8abe]" />,
              title: "Global Coverage",
              description: "Support in multiple languages and timezones",
              stats: "24/7 availability",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-2 border border-gray-100 hover:border-[#0f8abe]/20 group"
            >
              <div className="bg-[#0f8abe]/10 p-4 rounded-xl inline-flex mb-6 transition-all duration-300 group-hover:bg-[#0f8abe]/20 group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#0f8abe] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
              <div className="bg-gray-50 px-4 py-2 rounded-xl inline-block transition-all duration-300 group-hover:bg-[#0f8abe]/10 group-hover:text-[#0f8abe]">
                <span className="font-medium text-gray-700 group-hover:text-[#0f8abe] transition-colors duration-300">
                  {feature.stats}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-sm p-12 mb-24 border border-gray-100 transition-all duration-300 hover:shadow-md">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Support Process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <Headphones className="h-6 w-6 text-white" />,
                step: "1",
                title: "Report Issue",
                description: "Contact us via phone, chat, or email",
              },
              {
                icon: <Search className="h-6 w-6 text-white" />,
                step: "2",
                title: "Diagnose",
                description: "We analyze your system remotely",
              },
              {
                icon: <Wrench className="h-6 w-6 text-white" />,
                step: "3",
                title: "Resolve",
                description: "Immediate solution implementation",
              },
              {
                icon: <Check className="h-6 w-6 text-white" />,
                step: "4",
                title: "Verify",
                description: "We confirm everything works perfectly",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="group text-center transition-all duration-300 ease-out hover:-translate-y-2"
              >
                <div className="bg-[#0f8abe] w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0f8abe]/90 group-hover:shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 transition-colors duration-300 group-hover:text-[#0f8abe]">
                  {step.title}
                </h3>
                <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Areas */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Comprehensive Coverage
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="h-8 w-8 text-white" />,
                title: "Software Support",
                items: [
                  "System errors & crashes",
                  "Performance optimization",
                  "Updates & installations",
                  "Database maintenance",
                ],
              },
              {
                icon: <Printer className="h-8 w-8 text-white" />,
                title: "Hardware Support",
                items: [
                  "Printer/scanner setup",
                  "Peripheral configuration",
                  "Network troubleshooting",
                  "POS hardware issues",
                ],
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-white" />,
                title: "Training",
                items: [
                  "New staff onboarding",
                  "Feature walkthroughs",
                  "Best practices",
                  "Custom reporting",
                ],
              },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-2 hover:border-[#0f8abe]/20 group"
              >
                <div className="bg-[#0f8abe] text-white p-6 flex items-center transition-all duration-300 group-hover:bg-[#0f8abe]/90">
                  <div className="mr-4 transition-transform duration-300 group-hover:scale-110">{category.icon}</div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <li 
                        key={itemIndex} 
                        className="flex items-start group/item transition-all duration-200 hover:translate-x-2"
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-[#0f8abe]/20 rounded-full flex items-center justify-center mt-1 mr-3 transition-all duration-200 group-hover/item:bg-[#0f8abe]/30">
                          <svg
                            className="h-3 w-3 text-[#0f8abe] transition-colors duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700 group-hover/item:text-[#0f8abe] transition-colors duration-200 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Trusted by Retailers Worldwide
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Their team resolved our critical system outage in just 8 minutes! We've never experienced such fast support.",
                name: "Sarah Johnson",
                company: "Fashion Boutique Chain",
              },
              {
                quote:
                  "The bilingual support has been invaluable for our international stores. Truly a global service.",
                name: "Michael Chen",
                company: "Grocery Supermarkets",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 transition-all duration-300 ease-out hover:shadow-lg hover:-translate-y-2 hover:border-[#0f8abe]/20 group"
              >
                <div className="text-[#0f8abe] mb-6 transition-all duration-300 group-hover:scale-110">
                  <Quote className="h-10 w-10" />
                </div>
                <p className="text-lg text-gray-600 italic mb-6 transition-colors duration-300 group-hover:text-gray-800 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="transition-colors duration-300 group-hover:text-[#0f8abe]">
                  <p className="font-bold text-gray-800 group-hover:text-[#0f8abe] transition-colors duration-300">{testimonial.name}</p>
                  <p className="text-gray-500 group-hover:text-gray-600 transition-colors duration-300">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-[#0f8abe] to-[#0f8abe]/90 rounded-2xl p-12 text-center text-white shadow-lg transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-2">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Ready for Stress-Free POS Support?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Join thousands of retailers who trust our expert team
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white hover:bg-gray-50 text-[#0f8abe] font-bold py-4 px-8 rounded-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg flex items-center justify-center hover:scale-105 group">
              <Headphones className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" /> 
              Get Instant Support
            </button>
            <button className="border-2 border-white hover:bg-white hover:bg-opacity-20 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 ease-out hover:-translate-y-1 flex items-center justify-center hover:scale-105 group backdrop-blur-sm">
              <Users className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110" /> 
              View Pricing Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailManagerPOSSupport;