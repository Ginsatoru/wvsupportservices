import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import PropTypes from 'prop-types';

// Empty state component
const EmptyState = ({ darkMode }) => (
  <div className={`h-80 flex flex-col items-center justify-center p-4 rounded-lg ${
    darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
  }`}>
    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
      darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'
    }`}>
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <h3 className={`text-lg font-medium mb-1 ${
      darkMode ? 'text-gray-300' : 'text-gray-700'
    }`}>
      No Data Available
    </h3>
    <p className={`text-sm ${
      darkMode ? 'text-gray-400' : 'text-gray-500'
    }`}>
      There's no country data to display
    </p>
  </div>
);

const TopCountries = ({ 
  data = null, 
  colors = [], 
  darkMode = false,
  title = "Top Countries",
  description = "Distribution by user engagement",
  isLoading = false
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  
  // Safely handle data states
  const hasData = data && Array.isArray(data) && data.length > 0;
  const displayData = hasData ? data : [];
  const displayColors = colors.length > 0 ? colors : [
    "#6366F1", "#10B981", "#F59E0B", "#EF4444", 
    "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"
  ];

  // Calculate totals only if we have data
  const total = hasData ? displayData.reduce((sum, item) => sum + (item?.value || 0), 0) : 0;
  const topCountry = hasData 
    ? displayData.reduce((prev, current) => 
        (prev?.value || 0) > (current?.value || 0) ? prev : current, 
        displayData[0]
      )
    : null;

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  if (isLoading) {
    return (
      <div className={`p-6 rounded-2xl ${
        darkMode
          ? "bg-gray-800/50 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}>
        <div className="animate-pulse">
          <div className={`h-6 w-1/3 rounded mb-4 ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}></div>
          <div className={`h-4 w-2/3 rounded mb-6 ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}></div>
          <div className="h-64 rounded-lg flex items-center justify-center">
            <div className={`h-32 w-32 rounded-full ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            }`}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative p-6 rounded-2xl transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
    >
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            {title}
          </h2>
          <p className={`text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            {description}
          </p>
        </div>
        
        {/* Summary stats - only show if we have data */}
        {hasData && topCountry && (
          <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
            <span className={`text-xs uppercase tracking-wide font-medium ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              Leading Market
            </span>
            <div className="flex items-center gap-2">
              <span className="text-lg">{topCountry.flag || ''}</span>
              <span className="text-xl font-bold text-indigo-500">
                {topCountry.name || 'No data'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chart container */}
      <div className="relative">
        {hasData ? (
          <>
            <ResponsiveContainer width="100%" height={320} className="min-h-[280px]">
              <PieChart>
                <defs>
                  {displayColors.map((color, index) => (
                    <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                    </linearGradient>
                  ))}
                </defs>
                
                <Pie
                  data={displayData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                >
                  {displayData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`url(#gradient${index % displayColors.length})`}
                      stroke={darkMode ? "#374151" : "#F3F4F6"}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            {/* Center total display */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {total.toLocaleString()}
                </div>
                <div className={`text-xs uppercase tracking-wide font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  Total Users
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyState darkMode={darkMode} />
        )}
      </div>

      {/* Stats grid - only show if we have data */}
      {hasData && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          {displayData.map((country, index) => {
            const percentage = total > 0 ? ((country.value / total) * 100).toFixed(1) : 0;
            return (
              <div
                key={country.name || index}
                className={`text-center p-3 rounded-lg ${
                  darkMode
                    ? "bg-gray-800/30 hover:bg-gray-700/50"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="text-lg mb-1">{country.flag || ''}</div>
                <div className={`text-xs font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}>
                  {country.name || 'Unknown'}
                </div>
                <div 
                  className="text-sm font-bold" 
                  style={{ color: displayColors[index % displayColors.length] }}
                >
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

TopCountries.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      flag: PropTypes.string
    })
  ),
  colors: PropTypes.arrayOf(PropTypes.string),
  darkMode: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  isLoading: PropTypes.bool
};

TopCountries.defaultProps = {
  data: null, // Explicitly null to distinguish from empty array
  colors: [],
  darkMode: false,
  title: "Top Countries",
  description: "Distribution by user engagement",
  isLoading: false
};

export default TopCountries;