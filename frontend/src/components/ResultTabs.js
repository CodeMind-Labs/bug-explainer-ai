import React from "react";
import { FiZap, FiTarget, FiLightbulb } from "react-icons/fi";

const tabItems = [
  { name: "Explanation", icon: FiZap, color: "from-yellow-500 to-orange-500" },
  { name: "Fix", icon: FiTarget, color: "from-green-500 to-emerald-500" },
  { name: "Learning", icon: FiLightbulb, color: "from-blue-500 to-cyan-500" },
];

const ResultTabs = ({ result, selectedTab, onTabChange }) => {
  if (!result) return null;

  const contents = {
    Explanation: result.explanation,
    Fix: result.fix,
    Learning: result.learning,
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-white/90 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all animate-fade-in overflow-hidden">
      {/* Tab Header with gradient background */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-4">
        {tabItems.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = selectedTab === tab.name;
          return (
            <button
              key={tab.name}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
              }`}
              onClick={() => onTabChange(tab.name)}
            >
              <IconComponent className="text-lg" />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="p-6">
        <div className="min-h-32 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 text-sm leading-relaxed text-gray-800 animate-fade-in">
          {contents[selectedTab]}
        </div>
      </div>

      {/* Bottom accent gradient */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-30" />
    </div>
  );
};

export default ResultTabs;
