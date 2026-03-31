import React from "react";
import { FiSend, FiX, FiRefreshCw } from "react-icons/fi";

const InputBox = ({
  value,
  onValueChange,
  onExplain,
  onClear,
  onFillSample,
  loading,
}) => (
  <div className="rounded-2xl border border-white/20 bg-white/80 backdrop-blur-sm p-6 shadow-xl hover:shadow-2xl transition-shadow animate-fade-in">
    <label className="mb-3 block text-sm font-semibold text-gray-700">
      🔍 Paste your error message
    </label>
    <textarea
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      rows="7"
      placeholder="Example: IndexError: list index out of range&#10;Or any Python error traceback..."
      className="w-full resize-none rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-4 text-sm leading-relaxed text-gray-800 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
    />
    
    <div className="mt-5 flex flex-wrap items-center gap-3">
      {/* Explain Button - Gradient */}
      <button
        onClick={onExplain}
        disabled={!value.trim() || loading}
        className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all ${
          loading
            ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-70"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:scale-105 active:scale-95"
        }`}
      >
        <FiSend className="text-lg" />
        {loading ? "Analyzing..." : "Explain Bug"}
      </button>

      {/* Clear Button */}
      <button
        onClick={onClear}
        className="flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 hover:scale-105 active:scale-95"
      >
        <FiX className="text-lg" />
        Clear
      </button>

      {/* Sample Button */}
      <button
        onClick={onFillSample}
        className="flex items-center gap-2 rounded-lg border-2 border-indigo-400 bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700 hover:bg-indigo-100 hover:scale-105 active:scale-95"
      >
        <FiRefreshCw className="text-lg" />
        Sample
      </button>
    </div>
  </div>
);

export default InputBox;
