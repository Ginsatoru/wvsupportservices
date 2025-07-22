import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Users,
  Handshake,
  MessageSquare,
  Mail,
  HelpCircle,
  Search,
} from "lucide-react";

const CMSContainer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [sections] = useState([
    {
      id: "hero",
      name: "Hero Banner",
      type: "Banner",
      status: "Published",
      description: "Main landing page hero section with call-to-action",
      icon: <Layout className="w-5 h-5 text-sky-400" />,
      route: "/admin-panel/page/hero",
    },
    {
      id: "team",
      name: "Team Section",
      type: "Content",
      status: "Published",
      description: "Display your team members and their information",
      icon: <Users className="w-5 h-5 text-purple-400" />,
      route: "/admin-panel",
    },
    {
      id: "services",
      name: "Services",
      type: "Content",
      status: "Published",
      description: "Showcase your services or products",
      icon: <Handshake className="w-5 h-5 text-green-400" />,
      route: "/admin-panel/page/services",
    },
    {
      id: "testimonials",
      name: "Testimonials",
      type: "Content",
      status: "Published",
      description: "Customer reviews and testimonials",
      icon: <MessageSquare className="w-5 h-5 text-yellow-400" />,
      route: "/admin-panel/page/testimonials",
    },
    {
      id: "contact",
      name: "Contact Info",
      type: "Form",
      status: "Published",
      description: "Contact information and form",
      icon: <Mail className="w-5 h-5 text-red-400" />,
      route: "/admin-panel/page/contact",
    },
    {
      id: "faq",
      name: "FAQ Section",
      type: "Content",
      status: "Published",
      description: "Frequently asked questions",
      icon: <HelpCircle className="w-5 h-5 text-blue-400" />,
      route: "/admin-panel/page/faq",
    },
  ]);

  const filteredSections = sections.filter(
    (section) =>
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSectionClick = (route) => {
    navigate(route);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 rounded-xl">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-200 dark:bg-gray-900 border-b rounded-t-xl border-gray-300 dark:border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Layout className="w-6 h-6 text-sky-400" />
                Content Management
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {filteredSections.length} sections
              </p>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="bg-gray-200 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 px-6 py-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search sections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-1 focus:ring-sky-400 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 bg-gray-200 dark:bg-gray-900">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Section
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Page Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Visibility
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Manage</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSections.map((section) => (
                  <tr
                    key={section.id}
                    className="transition-all duration-200 ease-in-out cursor-pointer border-b border-transparent hover:bg-sky-50 dark:hover:bg-gray-700/40 hover:shadow-sm hover:border-sky-100 dark:hover:border-gray-600"
                    onClick={() => handleSectionClick(section.route)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                          {section.icon}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {section.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {section.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-gray-200 max-w-xs truncate">
                        {section.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          section.status === "Published"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {section.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {section.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      Visible
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSectionClick(section.route);
                        }}
                        className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors duration-150 ease-in-out px-2 py-1 rounded hover:bg-sky-50 dark:hover:bg-sky-900/20"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSections.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-8 max-w-md mx-auto">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No sections found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or create a new section
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CMSContainer;