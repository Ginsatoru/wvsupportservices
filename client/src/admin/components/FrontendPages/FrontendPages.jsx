import React, { useState, useRef } from "react";
import {
  Edit,
  Eye,
  Plus,
  Search,
  MoreVertical,
  Calendar,
  User,
  Filter,
  Download,
  Upload,
  Settings,
  Bell,
  Home,
  BarChart3,
  Layout,
  Globe,
  Image,
  FileText,
  Menu,
  ChevronDown,
  Trash2,
  Copy,
  Archive,
  Star,
  Clock,
} from "lucide-react";

export default function CMSPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid, list, kanban
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const fileInputRef = useRef(null);

  const sections = [
    {
      id: 1,
      name: "Hero Banner",
      type: "Banner",
      status: "Published",
      lastModified: "2024-06-19T10:30:00",
      author: "John Doe",
      description:
        "Main landing page hero section with call-to-action and video background",
      views: 1524,
      conversions: 89,
      favorite: true,
      thumbnail: "🎯",
    },
    {
      id: 2,
      name: "About Us",
      type: "Content",
      status: "Published",
      lastModified: "2024-06-18T14:20:00",
      author: "Jane Smith",
      description:
        "Comprehensive company overview, mission, and team introduction",
      views: 892,
      conversions: 45,
      favorite: false,
      thumbnail: "👥",
    },
    {
      id: 3,
      name: "Services Grid",
      type: "Grid",
      status: "Review",
      lastModified: "2024-06-17T09:15:00",
      author: "Mike Johnson",
      description:
        "Interactive service offerings with pricing and feature comparisons",
      views: 675,
      conversions: 124,
      favorite: true,
      thumbnail: "⚡",
    },
    {
      id: 4,
      name: "Contact Form",
      type: "Form",
      status: "Draft",
      lastModified: "2024-06-16T16:45:00",
      author: "Sarah Wilson",
      description:
        "Multi-step contact form with file upload and appointment booking",
      views: 234,
      conversions: 67,
      favorite: false,
      thumbnail: "📧",
    },
    {
      id: 5,
      name: "Testimonials",
      type: "Carousel",
      status: "Published",
      lastModified: "2024-06-15T11:30:00",
      author: "Alex Brown",
      description: "Customer testimonials with ratings and photo galleries",
      views: 1103,
      conversions: 78,
      favorite: false,
      thumbnail: "⭐",
    },
    {
      id: 6,
      name: "Product Showcase",
      type: "Gallery",
      status: "Scheduled",
      lastModified: "2024-06-14T13:20:00",
      author: "Emma Davis",
      description: "Interactive product gallery with 360° views and AR preview",
      views: 456,
      conversions: 92,
      favorite: true,
      thumbnail: "🛍️",
    },
  ];

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: false },
    { icon: Layout, label: "Content", active: true },
    { icon: Image, label: "Media", active: false },
    { icon: FileText, label: "Pages", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: Globe, label: "SEO", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  const getStatusInfo = (status) => {
    const statusMap = {
      Published: {
        color: "bg-green-500",
        bgColor: "bg-green-50 dark:bg-green-900/20",
        textColor: "text-green-700 dark:text-green-300",
        icon: "✓",
      },
      Draft: {
        color: "bg-gray-500",
        bgColor: "bg-gray-50 dark:bg-gray-800",
        textColor: "text-gray-700 dark:text-gray-300",
        icon: "📝",
      },
      Review: {
        color: "bg-yellow-500",
        bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
        textColor: "text-yellow-700 dark:text-yellow-300",
        icon: "👁️",
      },
      Scheduled: {
        color: "bg-blue-500",
        bgColor: "bg-blue-50 dark:bg-blue-900/20",
        textColor: "text-blue-700 dark:text-blue-300",
        icon: "⏰",
      },
    };
    return statusMap[status] || statusMap["Draft"];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  const filteredSections = sections
    .filter((section) => {
      const matchesSearch =
        section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || section.status.toLowerCase() === statusFilter;
      const matchesType =
        typeFilter === "all" || section.type.toLowerCase() === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return new Date(b.lastModified) - new Date(a.lastModified);
        case "views":
          return b.views - a.views;
        case "conversions":
          return b.conversions - a.conversions;
        default:
          return 0;
      }
    });

  const toggleSelection = (id) => {
    setSelectedSections((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedSections(
      selectedSections.length === filteredSections.length
        ? []
        : filteredSections.map((s) => s.id)
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 rounded-xl">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className=" bg-gray-200 dark:bg-gray-900 border-b rounded-t-xl border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Layout className="w-6 h-6 text-sky-400" />
                Content Management
              </h1>
              <p className="text-sm text-gray-500  dark:text-gray-400 mt-1">
                {filteredSections.length} sections • {selectedSections.length}{" "}
                selected
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl transition-colors"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-xl transition-colors">
                <Plus className="w-4 h-4" />
                New Section
              </button>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <div className="bg-gray-200 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Search */}
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

              {/* Filters */}
              <div className="flex items-center gap-2 ">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                    showFilters
                      ? "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  <ChevronDown
                    className={`w-4 h-4 transition-transform  ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none"
                >
                  <option className="bg-white hover:bg-sky-400 dark:bg-gray-800 dark:hover:bg-sky-400">
                    Sort by Name
                  </option>
                  <option className="bg-white hover:bg-sky-400 dark:bg-gray-800 dark:hover:bg-sky-400">
                    Sort by Date
                  </option>
                  <option className="bg-white hover:bg-sky-400 dark:bg-gray-800 dark:hover:bg-sky-400">
                    Sort by Views
                  </option>
                  <option className="bg-white hover:bg-sky-400 dark:bg-gray-800 dark:hover:bg-sky-400">
                    Sort by Conversions
                  </option>
                </select>
              </div>

              {/* Bulk Actions */}
              {selectedSections.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-sky-50 dark:bg-sky-900/30 rounded-xl">
                  <button className="flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 text-sm">
                    <Copy className="w-4 h-4" />
                    Duplicate
                  </button>
                  <button className="flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 text-sm">
                    <Archive className="w-4 h-4" />
                    Archive
                  </button>
                  <button className="flex items-center gap-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              {["grid", "list"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded-xl text-sm capitalize transition-colors ${
                    viewMode === mode
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Type
                  </label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="banner">Banner</option>
                    <option value="content">Content</option>
                    <option value="grid">Grid</option>
                    <option value="form">Form</option>
                    <option value="carousel">Carousel</option>
                    <option value="gallery">Gallery</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Author
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm">
                    <option>All Authors</option>
                    <option>John Doe</option>
                    <option>Jane Smith</option>
                    <option>Mike Johnson</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Performance
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-sm">
                    <option>All Performance</option>
                    <option>High Converting</option>
                    <option>Most Viewed</option>
                    <option>Low Performance</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 bg-gray-200 dark:bg-gray-900">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[
              {
                label: "Total Views",
                value: "4.8K",
                change: "+12%",
                color: "text-blue-600 dark:text-blue-400",
              },
              {
                label: "Conversions",
                value: "495",
                change: "+8%",
                color: "text-green-600 dark:text-green-400",
              },
              {
                label: "Avg. Performance",
                value: "82%",
                change: "+5%",
                color: "text-purple-600 dark:text-purple-400",
              },
              {
                label: "Active Sections",
                value: sections.filter((s) => s.status === "Published").length,
                change: "+2",
                color: "text-sky-600 dark:text-sky-400",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.label}
                </p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className={`text-sm font-medium ${stat.color}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Sections Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSections.map((section) => {
                const statusInfo = getStatusInfo(section.status);
                const isSelected = selectedSections.includes(section.id);

                return (
                  <div
                    key={section.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl border-2 transition-all duration-200 hover:shadow-lg group ${
                      isSelected
                        ? "border-sky-400 shadow-md"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    {/* Card Header */}
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelection(section.id)}
                            className="w-4 h-4 text-sky-400 border-gray-300 dark:border-gray-600 rounded focus:ring-sky-400"
                          />
                          <div className="text-2xl">{section.thumbnail}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                              {section.name}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {section.type}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {section.favorite && (
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          )}
                          <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {section.description}
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {section.views}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Views
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {section.conversions}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Conversions
                          </p>
                        </div>
                      </div>

                      {/* Status & Meta */}
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}
                        >
                          <span>{statusInfo.icon}</span>
                          {section.status}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          {formatDate(section.lastModified)}
                        </div>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {section.author}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-sky-400 hover:bg-sky-500 text-white text-sm font-medium rounded-xl transition-colors">
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                        <button className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-xl transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-xl transition-colors">
                          <BarChart3 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List View */
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedSections.length === filteredSections.length
                    }
                    onChange={selectAll}
                    className="w-4 h-4 text-sky-400 border-gray-300 dark:border-gray-600 rounded focus:ring-sky-400 mr-4"
                  />
                  <div className="grid grid-cols-12 gap-4 w-full text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="col-span-4">Section</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Performance</div>
                    <div className="col-span-2">Author</div>
                    <div className="col-span-1">Modified</div>
                    <div className="col-span-1">Actions</div>
                  </div>
                </div>
              </div>

              {filteredSections.map((section) => {
                const statusInfo = getStatusInfo(section.status);
                const isSelected = selectedSections.includes(section.id);

                return (
                  <div
                    key={section.id}
                    className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      isSelected ? "bg-sky-50 dark:bg-sky-900/20" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelection(section.id)}
                        className="w-4 h-4 text-sky-400 border-gray-300 dark:border-gray-600 rounded focus:ring-sky-400 mr-4"
                      />
                      <div className="grid grid-cols-12 gap-4 w-full items-center">
                        <div className="col-span-4 flex items-center gap-3">
                          <div className="text-xl">{section.thumbnail}</div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {section.name}
                              </h3>
                              {section.favorite && (
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              )}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {section.type}
                            </p>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}
                          >
                            <span>{statusInfo.icon}</span>
                            {section.status}
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {section.views} views
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {section.conversions} conversions
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              {section.author}
                            </span>
                          </div>
                        </div>

                        <div className="col-span-1">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(section.lastModified)}
                          </div>
                        </div>

                        <div className="col-span-1">
                          <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-gray-400 hover:text-sky-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-gray-400 hover:text-sky-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                              <MoreVertical className="w-4 h-4 text-gray-400 hover:text-sky-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredSections.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No sections found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-sky-400 hover:bg-sky-500 text-white font-medium rounded-xl transition-colors">
                  <Plus className="w-5 h-5" />
                  Create New Section
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".json,.csv,.xlsx"
        className="hidden"
        onChange={(e) => {
          // Handle file upload logic here
          console.log("Files selected:", e.target.files);
        }}
      />
    </div>
  );
}
