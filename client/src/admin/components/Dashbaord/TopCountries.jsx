import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

export const countryData = [
  { name: "USA", value: 300, flag: "🇺🇸" },
  { name: "UK", value: 200, flag: "🇬🇧" },
  { name: "India", value: 400, flag: "🇮🇳" },
  { name: "Canada", value: 150, flag: "🇨🇦" },
];

// Modern gradient colors
export const COLORS = [
  "#6366F1", // Indigo
  "#10B981", // Emerald  
  "#F59E0B", // Amber
  "#EF4444", // Red
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, darkMode }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = countryData.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((data.value / total) * 100).toFixed(1);
    
    return (
      <div
        className={`px-4 py-3 rounded-xl shadow-xl border backdrop-blur-sm transition-all duration-200 ${
          darkMode
            ? "bg-gray-900/95 border-gray-600 text-white"
            : "bg-white/95 border-gray-200 text-gray-900"
        }`}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{data.flag}</span>
          <p className="font-semibold">{data.name}</p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Value: <span className="font-bold text-blue-600 dark:text-blue-400">{data.value}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Share: <span className="font-bold text-emerald-600 dark:text-emerald-400">{percentage}%</span>
        </p>
      </div>
    );
  }
  return null;
};

// Custom legend component
const CustomLegend = ({ payload, darkMode }) => {
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
            <span>{entry.payload.flag}</span>
            <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
              {entry.value}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

const TopCountries = ({ data = countryData, colors = COLORS, darkMode = false }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const topCountry = data.reduce((prev, current) => 
    prev.value > current.value ? prev : current
  );

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
            Top Countries
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Distribution by user engagement
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
            <span className="text-lg">{topCountry.flag}</span>
            <span className="text-xl font-bold text-indigo-500">
              {topCountry.name}
            </span>
          </div>
        </div>
      </div>

      {/* Chart container */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={320} className="min-h-[280px]">
          <PieChart>
            <defs>
              {colors.map((color, index) => (
                <linearGradient key={index} id={`gradient${index}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                </linearGradient>
              ))}
            </defs>
            
            <Pie
              data={data}
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
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient${index})`}
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
            
            <Tooltip content={<CustomTooltip darkMode={darkMode} />} />
            <Legend content={<CustomLegend darkMode={darkMode} />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center total display */}
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
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        {data.map((country, index) => {
          const percentage = ((country.value / total) * 100).toFixed(1);
          return (
            <div
              key={country.name}
              className={`text-center p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                darkMode
                  ? "bg-gray-700/30 hover:bg-gray-700/50"
                  : "bg-gray-50/50 hover:bg-gray-100/50"
              }`}
            >
              <div className="text-lg mb-1">{country.flag}</div>
              <div
                className={`text-xs font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {country.name}
              </div>
              <div className="text-sm font-bold" style={{ color: colors[index] }}>
                {percentage}%
              </div>
            </div>
          );
        })}
      </div>

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

export default TopCountries;