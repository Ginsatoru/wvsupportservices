import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import PropTypes from 'prop-types';

// Default data in case none is provided
const DEFAULT_DATA = [
  { name: "USA", value: 300, flag: "🇺🇸" },
  { name: "UK", value: 200, flag: "🇬🇧" },
  { name: "India", value: 400, flag: "🇮🇳" },
  { name: "Canada", value: 150, flag: "🇨🇦" },
];

// Modern gradient colors
const DEFAULT_COLORS = [
  "#6366F1", // Indigo
  "#10B981", // Emerald  
  "#F59E0B", // Amber
  "#EF4444", // Red
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, darkMode, total }) => {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : 0;
  
  return (
    <div
      className={`px-4 py-3 rounded-xl shadow-xl border backdrop-blur-sm transition-all duration-200 ${
        darkMode
          ? "bg-gray-900/95 border-gray-600 text-white"
          : "bg-white/95 border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{data.flag || ''}</span>
        <p className="font-semibold">{data.name || 'Unknown'}</p>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Value: <span className="font-bold text-blue-600 dark:text-blue-400">{data.value || 0}</span>
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Share: <span className="font-bold text-emerald-600 dark:text-emerald-400">{percentage}%</span>
      </p>
    </div>
  );
};

// Custom legend component
const CustomLegend = ({ payload, darkMode }) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 ${
            darkMode
              ? "bg-gray-700/50 hover:bg-gray-700"
              : "bg-gray-100/50 hover:bg-gray-100"
          }`}
        >
          <div
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs font-medium flex items-center gap-1">
            <span>{entry.payload.flag || ''}</span>
            <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
              {entry.value || 'Unknown'}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

const TopCountries = ({ 
  data = DEFAULT_DATA, 
  colors = DEFAULT_COLORS, 
  darkMode = false,
  title = "Top Countries",
  description = "Distribution by user engagement"
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  
  // Safely handle invalid data
  const safeData = Array.isArray(data) && data.length > 0 ? data : DEFAULT_DATA;
  const safeColors = Array.isArray(colors) && colors.length > 0 ? colors : DEFAULT_COLORS;
  
  // Calculate totals with proper fallbacks
  const total = safeData.reduce((sum, item) => sum + (item?.value || 0), 0);
  const topCountry = safeData.length > 0 
    ? safeData.reduce((prev, current) => 
        (prev?.value || 0) > (current?.value || 0) ? prev : current, 
        safeData[0]
      )
    : { name: 'No data', value: 0, flag: '' };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <div
      className={`relative p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${
        darkMode
          ? "bg-gradient-to-br from-black-800 to-gray-900 shadow-2xl border border-gray-700"
          : "bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100"
      }`}
    >
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2
            className={`text-xl sm:text-2xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {description}
          </p>
        </div>
        
        {/* Summary stats */}
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
          <span
            className={`text-xs uppercase tracking-wide font-medium ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Leading Market
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg">{topCountry.flag || ''}</span>
            <span className="text-xl font-bold text-indigo-500">
              {topCountry.name || 'No data'}
            </span>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="relative">
        {safeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320} className="min-h-[280px]">
            <PieChart>
              <defs>
                {safeColors.map((color, index) => (
                  <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                  </linearGradient>
                ))}
              </defs>
              
              <Pie
                data={safeData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                className="drop-shadow-lg"
              >
                {safeData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`url(#gradient${index % safeColors.length})`}
                    stroke={darkMode ? "#374151" : "#F3F4F6"}
                    strokeWidth={2}
                    className={`transition-all duration-300 cursor-pointer ${
                      activeIndex === index ? "drop-shadow-2xl" : "drop-shadow-sm"
                    }`}
                    style={{
                      filter: activeIndex === index ? "brightness(1.1)" : "brightness(1)",
                      transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "center",
                    }}
                  />
                ))}
              </Pie>
              
              <Tooltip content={<CustomTooltip darkMode={darkMode} total={total} />} />
              <Legend content={<CustomLegend darkMode={darkMode} />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-80 flex items-center justify-center">
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No data available
            </p>
          </div>
        )}

        {/* Center total display */}
        {safeData.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {total.toLocaleString()}
              </div>
              <div
                className={`text-xs uppercase tracking-wide font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Total Users
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats grid */}
      {safeData.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          {safeData.map((country, index) => {
            const percentage = total > 0 ? ((country.value / total) * 100).toFixed(1) : 0;
            return (
              <div
                key={country.name || index}
                className={`text-center p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                  darkMode
                    ? "bg-gray-700/30 hover:bg-gray-700/50"
                    : "bg-gray-50/50 hover:bg-gray-100/50"
                }`}
              >
                <div className="text-lg mb-1">{country.flag || ''}</div>
                <div
                  className={`text-xs font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {country.name || 'Unknown'}
                </div>
                <div 
                  className="text-sm font-bold" 
                  style={{ color: safeColors[index % safeColors.length] }}
                >
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Subtle overlay effect */}
      <div
        className={`absolute inset-0 pointer-events-none rounded-2xl ${
          darkMode
            ? "bg-gradient-to-br from-transparent via-transparent to-gray-900/10"
            : "bg-gradient-to-br from-transparent via-transparent to-gray-900/5"
        }`}
      />
    </div>
  );
};

// PropTypes for better development experience
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
  description: PropTypes.string
};

// Default props
TopCountries.defaultProps = {
  data: DEFAULT_DATA,
  colors: DEFAULT_COLORS,
  darkMode: false,
  title: "Top Countries",
  description: "Distribution by user engagement"
};

export default TopCountries;