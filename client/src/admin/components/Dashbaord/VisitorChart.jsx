import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

export const visitorData = [
  { name: "Mon", visitors: 1200 },
  { name: "Tue", visitors: 2100 },
  { name: "Wed", visitors: 800 },
  { name: "Thu", visitors: 1600 },
  { name: "Fri", visitors: 2500 },
  { name: "Sat", visitors: 1800 },
  { name: "Sun", visitors: 2200 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className={`px-4 py-3 rounded-xl shadow-lg border backdrop-blur-sm ${
          darkMode 
            ? 'bg-gray-800/95 border-gray-600 text-white' 
            : 'bg-white/95 border-gray-200 text-gray-900'
        }`}
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)'
        }}
      >
        <p className="font-semibold text-sm mb-1">{label}</p>
        <p className="text-lg font-bold" style={{ color: payload[0].color }}>
          {payload[0].value.toLocaleString()} visitors
        </p>
      </div>
    );
  }
  return null;
};

// Custom dot component for line points
const CustomDot = ({ cx, cy, payload, darkMode }) => {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="url(#dotGradient)"
      stroke="#fff"
      strokeWidth={2}
      className="drop-shadow-sm hover:r-6 transition-all duration-200"
    />
  );
};

const VisitorChart = ({ data = visitorData, darkMode = false }) => {
  // Calculate some stats
  const totalVisitors = data.reduce((sum, day) => sum + day.visitors, 0);
  const avgVisitors = Math.round(totalVisitors / data.length);
  const maxDay = data.reduce((max, day) => day.visitors > max.visitors ? day : max, data[0]);
  
  return (
    <div className={`
      relative p-6 rounded-2xl transition-all duration-300 border
      ${darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-900 border-gray-700' 
        : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
      }
    `}
    style={{
      boxShadow: darkMode 
        ? '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        : '0 10px 30px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
    }}>
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Weekly Visitors
          </h2>
          <p className={`text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Tracking your site's weekly performance
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <div className={`px-3 py-2 rounded-lg backdrop-blur-sm border ${
            darkMode 
              ? 'bg-blue-900/30 border-blue-700/50 text-blue-300' 
              : 'bg-blue-50 border-blue-200 text-blue-700'
          }`}>
            <p className="text-xs font-medium opacity-80">Total</p>
            <p className="text-sm font-bold">{totalVisitors.toLocaleString()}</p>
          </div>
          
          <div className={`px-3 py-2 rounded-lg backdrop-blur-sm border ${
            darkMode 
              ? 'bg-green-900/30 border-green-700/50 text-green-300' 
              : 'bg-green-50 border-green-200 text-green-700'
          }`}>
            <p className="text-xs font-medium opacity-80">Average</p>
            <p className="text-sm font-bold">{avgVisitors.toLocaleString()}</p>
          </div>
          
          <div className={`px-3 py-2 rounded-lg backdrop-blur-sm border ${
            darkMode 
              ? 'bg-purple-900/30 border-purple-700/50 text-purple-300' 
              : 'bg-purple-50 border-purple-200 text-purple-700'
          }`}>
            <p className="text-xs font-medium opacity-80">Peak</p>
            <p className="text-sm font-bold">{maxDay.name}</p>
          </div>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300} className="sm:h-80">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <radialGradient id="dotGradient">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </radialGradient>
            </defs>
            
            <XAxis 
              dataKey="name" 
              stroke={darkMode ? "#9ca3af" : "#6b7280"}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              className="text-xs sm:text-sm"
            />
            <YAxis 
              stroke={darkMode ? "#9ca3af" : "#6b7280"}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
              className="text-xs sm:text-sm"
            />
            <Tooltip 
              content={<CustomTooltip darkMode={darkMode} />}
              cursor={{
                stroke: darkMode ? '#4b5563' : '#d1d5db',
                strokeWidth: 1,
                strokeDasharray: '4 4'
              }}
            />
            
            {/* Area fill */}
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="none"
              fill="url(#areaGradient)"
            />
            
            {/* Main line */}
            <Line 
              type="monotone" 
              dataKey="visitors" 
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={<CustomDot darkMode={darkMode} />}
              activeDot={{ 
                r: 6, 
                fill: '#6366f1',
                stroke: '#fff',
                strokeWidth: 2,
                filter: 'drop-shadow(0 2px 4px rgba(99, 102, 241, 0.3))'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
        
        {/* Grid overlay for better visual separation */}
        <div className={`absolute inset-0 pointer-events-none ${
          darkMode ? 'opacity-5' : 'opacity-10'
        }`}
        style={{
          backgroundImage: `linear-gradient(${darkMode ? '#fff' : '#000'} 1px, transparent 1px),
                           linear-gradient(90deg, ${darkMode ? '#fff' : '#000'} 1px, transparent 1px)`,
          backgroundSize: '50px 30px'
        }} />
      </div>
      
      {/* Bottom info */}
      <div className={`mt-4 pt-4 border-t text-center ${
        darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
      }`}>
        <p className="text-xs sm:text-sm">
          Data refreshed every hour • Last update: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default VisitorChart;