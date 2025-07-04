import React from "react";
import { motion } from "framer-motion";
import StatsCard from "./StatsCard";
import VisitorChart, { visitorData } from "./VisitorChart";
import ContentEngagement, { contentData } from "./ContentEngagement";
import TopCountries, { COLORS, countryData } from "./TopCountries";

const Dashboard = ({ darkMode }) => {
  const stats = [
    {
      title: "Visitors",
      value: "5,432",
      iconType: "users",
      color: {
        from: "from-blue-500",
        to: "to-blue-700",
        bg: "bg-blue-50",
        text: "text-blue-700",
      },
      trend: "up",
      change: "+3.2%",
    },
    {
      title: "Reader Engagement",
      value: "8.7K",
      iconType: "users", // Represents engaged readers
      color: {
        from: "from-purple-500",
        to: "to-purple-700",
        bg: "bg-purple-100",
        text: "text-purple-700",
      },
      trend: "up",
      change: "+7.2%",
      metric: "engaged_readers",
      timeFrame: "last 7 days",
    },
    {
      title: "World Reach",
      value: "73 Countries",
      iconType: "world",
      color: {
        from: "from-purple-500",
        to: "to-purple-700",
        bg: "bg-purple-100",
        text: "text-purple-700",
      },
      trend: "up",
      change: "+0.5%",
    },
  ];

  return (
    <div
      className={`p-5 bg-gray-200 dark:bg-gray-900 min-h-[80vh] rounded-xl ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-1">
        <VisitorChart data={visitorData} darkMode={darkMode} />
        <ContentEngagement data={contentData} darkMode={darkMode} />
        <TopCountries data={countryData} colors={COLORS} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Dashboard;
