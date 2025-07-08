import React from "react";
import { useInView } from "react-intersection-observer";

// Mock images for demonstration - replace with your actual imports
const mockImages = {
  pos: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
  webstore:
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
  multistore:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
  email:
    "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop",
  support:
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop",
  integration:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
};

const OurServices = () => {
  const services = [
    {
      title: "Point of Sale (POS) System",
      description:
        "Comprehensive retail management solution with inventory tracking, sales reporting, and customer management features.",
      image: mockImages.pos,
    },
    {
      title: "Webstore Manager",
      description:
        "Complete e-commerce platform to manage your online store, products, orders, and customer relationships seamlessly.",
      image: mockImages.webstore,
    },
    {
      title: "Multi-Store Management",
      description:
        "Centralized management system for multiple retail locations with unified reporting and inventory control.",
      image: mockImages.multistore,
    },
    {
      title: "Email Hosting Services",
      description:
        "Professional email hosting solutions with custom domains, security features, and reliable uptime for your business.",
      image: mockImages.email,
    },
    {
      title: "Technical Support",
      description:
        "24/7 technical assistance and troubleshooting for all our products with fast response times and expert guidance.",
      image: mockImages.support,
    },
    {
      title: "System Integration",
      description:
        "Seamless integration of all systems and third-party applications to create a unified business management ecosystem.",
      image: mockImages.integration,
    },
  ];

  return (
    <section className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-slate-600 text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase mb-3 animate-fade-in">
          Best Solutions
        </h2>
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2rem] xl:text-[2.25rem] font-bold mb-6 animate-fade-in-up"
          style={{ color: "#0f8abe" }}
        >
          Our Services
        </h1>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg lg:text-base xl:text-base max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
          Complete business management solutions including POS systems, webstore
          management, multi-store operations, and professional email hosting.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const [ref, inView] = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });

            return (
              <div
                key={index}
                ref={ref}
                className={`
                  group relative bg-white rounded-xl shadow-md border border-slate-200
                  transition-all duration-500 ease-out
                  hover:shadow-lg
                  ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }
                `}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 sm:h-52 md:h-48 lg:h-52 object-cover transition-all duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content Container */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 mb-4 transition-all duration-500 ease-out group-hover:text-[#0f8abe]">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default OurServices;
