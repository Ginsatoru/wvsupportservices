import React from "react";
import { Star, User, Eye, Edit, Image as ImageIcon } from "lucide-react";

const ItemList = ({ items, selectedItems, onSelect, onSelectAll, onEdit, formatDate }) => {
  const allSelected = items.length > 0 && selectedItems.length === items.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* List Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            className="w-4 h-4 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 mr-3"
          />
          <div className="grid grid-cols-12 gap-3 w-full text-xs font-medium text-gray-500 dark:text-gray-400">
            <div className="col-span-5">Content</div>
            <div className="col-span-3">Type</div>
            <div className="col-span-2">Last Updated</div>
            <div className="col-span-2">Actions</div>
          </div>
        </div>
      </div>

      {/* List Items */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {items.map((item) => {
          const isSelected = selectedItems.includes(item.id);

          return (
            <div
              key={item.id}
              className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                isSelected ? "bg-blue-50 dark:bg-blue-900/10" : ""
              }`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onSelect(item.id)}
                  className="w-4 h-4 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 mr-3"
                />
                <div className="grid grid-cols-12 gap-3 w-full items-center">
                  {/* Content Column */}
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                          {item.name}
                        </h3>
                        {item.favorite && (
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Type Column */}
                  <div className="col-span-3">
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded">
                      {item.type}
                    </span>
                  </div>

                  {/* Date Column */}
                  <div className="col-span-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(item.lastModified)}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="col-span-2 flex justify-start">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-1 text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemList;