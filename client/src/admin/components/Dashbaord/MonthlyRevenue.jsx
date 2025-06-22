import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Export the data so it can be imported in Dashboard.jsx
export const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4500 },
  { name: "May", revenue: 6000 },
  { name: "Jun", revenue: 7000 },
];

// Modern gradient colors for bars
const barColors = [
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#10B981", // Emerald
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#3B82F6", // Blue
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm ${
          darkMode
            ? "bg-gray-800/90 border-gray-700 text-white"
            : "bg-white/90 border-gray-200 text-gray-900"
        }`}
      >
        <p className="font-medium text-sm mb-1">{label}</p>
        <p className="text-lg font-bold text-emerald-500">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

// Properly named functional component
const MonthlyRevenue = ({ data = revenueData, darkMode = false }) => {
  const maxRevenue = Math.max(...data.map(item => item.revenue));
  
  return (
    <div
      className={`relative p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${
        darkMode
          ? "bg-gradient-to-br from-gray-850 to-gray-900 shadow-2xl border border-gray-700"
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
            Monthly Revenue
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Revenue trends over the past 6 months
          </p>
        </div>
        
        {/* Revenue summary */}
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
          <span
            className={`text-xs uppercase tracking-wide font-medium ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Peak Revenue
          </span>
          <span className="text-2xl font-bold text-emerald-500">
            ${maxRevenue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Chart container with improved responsive behavior */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={300} className="min-h-[250px]">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20,
            }}
            barCategoryGap="20%"
          >
            <defs>
              {/* Gradient definitions for modern look */}
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            
            <XAxis
              dataKey="name"
              stroke={darkMode ? "#9CA3AF" : "#6B7280"}
              fontSize={12}
              fontWeight={500}
              axisLine={false}
              tickLine={false}
              tick={{ dy: 8 }}
            />
            
            <YAxis
              stroke={darkMode ? "#9CA3AF" : "#6B7280"}
              fontSize={12}
              fontWeight={500}
              axisLine={false}
              tickLine={false}
              tick={{ dx: -8 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              width={60}
            />
            
            <Tooltip
              content={<CustomTooltip darkMode={darkMode} />}
              cursor={{
                fill: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                radius: 8,
              }}
            />
            
            <Bar
              dataKey="revenue"
              radius={[8, 8, 0, 0]}
              fill="url(#barGradient)"
              stroke={darkMode ? "#10B981" : "#059669"}
              strokeWidth={1}
              className="drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index % barColors.length]}
                  className="hover:brightness-110 transition-all duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        {/* Subtle grid overlay effect */}
        <div
          className={`absolute inset-0 pointer-events-none rounded-xl ${
            darkMode
              ? "bg-gradient-to-t from-gray-900/20 to-transparent"
              : "bg-gradient-to-t from-gray-50/30 to-transparent"
          }`}
        />
      </div>
      
      {/* Bottom info bar */}
      <div
        className={`mt-4 pt-4 border-t flex flex-wrap gap-4 text-xs ${
          darkMode
            ? "border-gray-700 text-gray-400"
            : "border-gray-200 text-gray-500"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
          <span>Multi-color bars for visual distinction</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span>Hover for detailed values</span>
        </div>
      </div>
    </div>
  );
};

export default MonthlyRevenue;