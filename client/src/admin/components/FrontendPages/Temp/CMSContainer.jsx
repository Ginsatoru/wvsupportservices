import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Trash2,
  Copy,
  Archive,
  Layout,
  Upload,
  X,
  Save,
  Eye,
  Edit,
  Filter,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import ItemList from "../ItemList";
import EditModal from "../EditModal";
import AddSectionModal from "../AddSectionModal";

const CMSContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const fileInputRef = useRef(null);

  // Sample data - would normally come from API
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Hero Banner",
      type: "Banner",
      status: "Published",
      lastModified: new Date().toISOString(),
      author: "Neil Riding",
      description: "Main landing page hero section with call-to-action",
      favorite: true,
      imageUrl: "https://example.com/hero-banner.jpg",
    },
  ]);

  // Normalize filter values to lowercase for comparison
  const filteredItems = items
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        item.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesType =
        typeFilter === "all" ||
        item.type.toLowerCase() === typeFilter.toLowerCase();
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "date")
        return new Date(b.lastModified) - new Date(a.lastModified);
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "conversions") return b.conversions - a.conversions;
      return 0;
    });

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedItems(
      selectedItems.length === filteredItems.length
        ? []
        : filteredItems.map((i) => i.id)
    );
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

  const handleSaveItem = (updatedItem) => {
    if (updatedItem.id) {
      // Update existing item
      setItems(
        items.map((item) =>
          item.id === updatedItem.id
            ? { ...updatedItem, lastModified: new Date().toISOString() }
            : item
        )
      );
    } else {
      // Add new item
      const newItem = {
        ...updatedItem,
        id: Math.max(...items.map((i) => i.id), 0) + 1,
        lastModified: new Date().toISOString(),
        status: "Published",
        views: 0,
        conversions: 0,
        favorite: false,
      };
      setItems([...items, newItem]);
    }
    setEditingItem(null);
    setShowAddModal(false);
  };

  const handleDeleteItems = () => {
    if (selectedItems.length > 0) {
      if (
        confirm(`Are you sure you want to delete ${selectedItems.length} item(s)?`)
      ) {
        setItems(items.filter((item) => !selectedItems.includes(item.id)));
        setSelectedItems([]);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 rounded-xl">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-200 dark:bg-gray-900 border-b rounded-t-xl border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Layout className="w-6 h-6 text-sky-400" />
                Content Management
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {filteredItems.length} sections • {selectedItems.length} selected
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-lg flex items-center gap-2 px-4 py-1.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl transition-colors"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className=" text-lg flex items-center gap-2 px-4 py-1.5 bg-sky-400 hover:bg-sky-500 text-white rounded-xl transition-colors"
              >
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                    showFilters
                      ? "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                  }`}
                  aria-expanded={showFilters}
                  aria-controls="filter-panel"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {showFilters ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  aria-label="Sort sections"
                >
                  <option value="name">Sort by Name</option>
                  <option value="date">Sort by Date</option>
                  <option value="views">Sort by Views</option>
                </select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    const itemsToDuplicate = items.filter((item) =>
                      selectedItems.includes(item.id)
                    );
                    setItems([
                      ...items,
                      ...itemsToDuplicate.map((item, index) => ({
                        ...item,
                        id: Math.max(...items.map((i) => i.id), 0) + index + 1,
                        name: `${item.name} (Copy)`,
                      })),
                    ]);
                    setSelectedItems([]);
                  }}
                  className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 text-sm"
                >
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
                <button className="flex items-center gap-2 text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 text-sm">
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
                <button
                  onClick={handleDeleteItems}
                  className="flex items-center gap-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div
              id="filter-panel"
              className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="status-filter"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="type-filter"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Type
                  </label>
                  <select
                    id="type-filter"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="banner">Banner</option>
                    <option value="content">Content</option>
                    <option value="section">Section</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="author-filter"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Author
                  </label>
                  <select
                    id="author-filter"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  >
                    <option>All Authors</option>
                    <option>Neil</option>
                    <option>Sam</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 bg-gray-200 dark:bg-gray-900">
          {/* List View */}
          <ItemList
            items={filteredItems}
            selectedItems={selectedItems}
            onSelect={toggleSelection}
            onSelectAll={selectAll}
            onEdit={setEditingItem}
            formatDate={formatDate}
          />

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 p-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No sections found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your search terms or create a new section
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-sky-400 hover:bg-sky-500 text-white rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                  Create New Section
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingItem && (
          <EditModal
            item={editingItem}
            onClose={() => setEditingItem(null)}
            onSave={handleSaveItem}
          />
        )}
      </AnimatePresence>

      {/* Add New Section Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddSectionModal
            onClose={() => setShowAddModal(false)}
            onSave={handleSaveItem}
          />
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.json,.csv,.xlsx"
        className="hidden"
        onChange={(e) => {
          console.log("Files selected:", e.target.files);
          // Handle file upload logic here
        }}
      />
    </div>
  );
};

export default CMSContainer;
