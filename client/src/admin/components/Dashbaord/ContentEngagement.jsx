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

// Updated data structure for content engagement
export const contentData = [
  { name: "Jan", views: 12000, reads: 8000, interactions: 3500 },
  { name: "Feb", views: 9000, reads: 6000, interactions: 2800 },
  { name: "Mar", views: 15000, reads: 9500, interactions: 4200 },
  { name: "Apr", views: 13500, reads: 8500, interactions: 3800 },
  { name: "May", views: 18000, reads: 11000, interactions: 5200 },
  { name: "Jun", views: 21000, reads: 13000, interactions: 6800 },
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

// Custom tooltip component for content metrics
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
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center mt-1">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium mr-2">{entry.name}:</span>
            <span className="text-sm font-bold">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Updated component for Content Engagement
const ContentEngagement = ({ data = contentData, darkMode = false }) => {
  const maxViews = Math.max(...data.map(item => item.views));
  
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
            Content Engagement
          </h2>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Audience interaction over the past 6 months
          </p>
        </div>
        
        {/* Summary */}
        <div className="mt-4 sm:mt-0 flex flex-col sm:items-end">
          <span
            className={`text-xs uppercase tracking-wide font-medium ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Peak Views
          </span>
          <span className="text-2xl font-bold text-emerald-500">
            {maxViews.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Chart container */}
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
            barCategoryGap="15%"
            barGap={4}
          >
            <defs>
              {/* Gradient definitions */}
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="readsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="interactionsGradient" x1="0" y1="0" x2="0" y2="1">
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
              width={60}
            />
            
            <Tooltip
              content={<CustomTooltip darkMode={darkMode} />}
              cursor={{
                fill: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                radius: 8,
              }}
            />
            
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '12px',
                fontWeight: 500,
              }}
              iconType="circle"
              iconSize={10}
            />
            
            <Bar
              dataKey="views"
              name="Views"
              radius={[8, 8, 0, 0]}
              fill="url(#viewsGradient)"
              stroke="#8B5CF6"
              strokeWidth={1}
              className="drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
            />
            
            <Bar
              dataKey="reads"
              name="Reads"
              radius={[8, 8, 0, 0]}
              fill="url(#readsGradient)"
              stroke="#06B6D4"
              strokeWidth={1}
              className="drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
            />
            
            <Bar
              dataKey="interactions"
              name="Interactions"
              radius={[8, 8, 0, 0]}
              fill="url(#interactionsGradient)"
              stroke="#10B981"
              strokeWidth={1}
              className="drop-shadow-sm hover:drop-shadow-md transition-all duration-200"
            />
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
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span>Views - Total content impressions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
          <span>Reads - Engaged reading sessions</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span>Interactions - Comments & shares</span>
        </div>
      </div>
    </div>
  );
};

export default ContentEngagement;