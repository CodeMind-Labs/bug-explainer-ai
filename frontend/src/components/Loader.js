import React from "react";
import { FiLoader } from "react-icons/fi";

const Loader = () => (
  <div className="flex items-center justify-center py-12 animate-fade-in">
    <div className="flex flex-col items-center gap-4">
      {/* Animated spinner with gradient */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 border-r-purple-600 animate-spin" />
      </div>
      
      {/* Loading text */}
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-700">Analyzing your error...</p>
        <p className="text-xs text-gray-500 mt-1">This usually takes less than a second</p>
      </div>
    </div>
  </div>
);

export default Loader;
