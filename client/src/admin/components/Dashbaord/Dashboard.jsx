import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatsCard from "./StatsCard";
import VisitorChart from "./VisitorChart";
import ContentEngagement from "./ContentEngagement";
import TopCountries from "./TopCountries";
import axios from "axios";
import useVisitorTracking from "../../hooks/useVisitorTracking";

const Dashboard = ({ darkMode }) => {
  // Initialize visitor tracking
  useVisitorTracking();
  
  const [stats, setStats] = useState([
    {
      title: "Visitors",
      value: "Loading...",
      iconType: "users",
      color: {
        from: "from-blue-500",
        to: "to-blue-700",
        bg: "bg-blue-50",
        text: "text-blue-700",
      },
      trend: "up",
      change: "+0%",
    },
    {
      title: "Reader Engagement",
      value: "Loading...",
      iconType: "users",
      color: {
        from: "from-purple-500",
        to: "to-purple-700",
        bg: "bg-purple-100",
        text: "text-purple-700",
      },
      trend: "up",
      change: "+0%",
    },
    {
      title: "World Reach",
      value: "Loading...",
      iconType: "world",
      color: {
        from: "from-purple-500",
        to: "to-purple-700",
        bg: "bg-purple-100",
        text: "text-purple-700",
      },
      trend: "up",
      change: "+0%",
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    visitorData: [],
    contentData: [],
    countryData: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching dashboard data...");
        
        // Using Promise.all to fetch all data concurrently
        const [statsResponse, visitorsResponse, contentResponse, countriesResponse] = await Promise.all([
          axios.get("/api/dashboard/stats").catch(() => ({ data: { totalVisitors: 0, engagedReaders: 0, countriesReached: 0 } })),
          axios.get("/api/dashboard/visitors-data").catch(() => ({ data: [] })),
          axios.get("/api/dashboard/content-engagement").catch(() => ({ data: [] })),
          axios.get("/api/dashboard/countries-data").catch(() => ({ data: [] }))
        ]);

        const { totalVisitors, engagedReaders, countriesReached } = statsResponse.data;

        setStats([
          {
            ...stats[0],
            value: totalVisitors.toLocaleString(),
            change: calculatePercentageChange(totalVisitors)
          },
          {
            ...stats[1],
            value: engagedReaders >= 1000 
              ? `${(engagedReaders / 1000).toFixed(1)}K` 
              : engagedReaders.toString(),
            change: calculatePercentageChange(engagedReaders)
          },
          {
            ...stats[2],
            value: `${countriesReached} Countries`,
            change: calculatePercentageChange(countriesReached)
          },
        ]);

        setChartData({
          visitorData: visitorsResponse.data || [],
          contentData: contentResponse.data || [],
          countryData: countriesResponse.data || []
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(error.message || "Failed to load dashboard data");
        setLoading(false);
        
        // Set error state for stats
        setStats(prevStats => prevStats.map(stat => ({
          ...stat,
          value: "Error",
          change: "N/A",
          trend: "down"
        })));
      }
    };

    fetchDashboardData();

    // Set up polling for real-time updates (optional)
    const intervalId = setInterval(fetchDashboardData, 300000); // 5 minutes
    
    return () => clearInterval(intervalId);
  }, []);

  // Helper function to calculate percentage change
  const calculatePercentageChange = (currentValue) => {
    // In production, you would compare with previous period data
    const randomIncrease = Math.floor(Math.random() * 10) + 1;
    return `+${randomIncrease}%`;
  };

  if (loading) {
    return (
      <div className={`p-5 bg-gray-200 dark:bg-gray-900 min-h-[80vh] rounded-xl ${darkMode ? "dark" : ""}`}>
        <div className="flex flex-col space-y-6">
          {/* Header Skeleton */}
          <div className="h-10 w-64 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            ))}
          </div>
          
          {/* Charts Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-5 bg-gray-200 dark:bg-gray-900 min-h-[80vh] rounded-xl ${darkMode ? "dark" : ""}`}>
        <div className="max-w-3xl mx-auto bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-bold text-red-800 dark:text-red-200">Dashboard Error</h2>
          </div>
          
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          
          <div className="space-y-2 text-sm text-red-600 dark:text-red-400 mb-6">
            <p>Troubleshooting steps:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Check if backend server is running</li>
              <li>Verify network connection</li>
              <li>Ensure CORS is properly configured</li>
              <li>Check browser console for detailed errors</li>
            </ul>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
            <button
              onClick={() => setError(null)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-5 bg-gray-200 dark:bg-gray-900 min-h-[80vh] rounded-xl ${darkMode ? "dark" : ""}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Real-time analytics and visitor insights
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              iconType={stat.iconType}
              color={stat.color}
              trend={stat.trend}
              change={stat.change}
              darkMode={darkMode}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <VisitorChart 
              data={chartData.visitorData} 
              darkMode={darkMode} 
              title="Visitor Trends"
              description="Last 30 days visitor statistics"
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ContentEngagement 
              data={chartData.contentData} 
              darkMode={darkMode}
              title="Content Engagement"
              description="Top performing content"
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TopCountries 
              data={chartData.countryData} 
              darkMode={darkMode}
              title="Global Reach"
              description="Visitor distribution by country"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;