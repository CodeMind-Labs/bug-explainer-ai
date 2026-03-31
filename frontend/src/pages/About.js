import React from "react";
import { FiRocket, FiZap, FiCode, FiHeart } from "react-icons/fi";

const About = () => (
  <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="mb-12 text-center animate-fade-in">
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
        About Bug Explainer AI
      </h1>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        A modern, intelligent debugging assistant built to help developers understand and fix errors faster.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      {/* Feature 1 */}
      <div className="rounded-2xl border border-white/20 bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-fade-in">
        <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-4 w-fit mb-4">
          <FiRocket className="text-white text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Analysis</h3>
        <p className="text-gray-600">
          Instant detection and explanation of common Python errors using advanced rule-based analysis.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="rounded-2xl border border-white/20 bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-fade-in">
        <div className="rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 p-4 w-fit mb-4">
          <FiZap className="text-white text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Practical Fixes</h3>
        <p className="text-gray-600">
          Get actionable solution suggestions tailored to each error with code patterns and best practices.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="rounded-2xl border border-white/20 bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-fade-in">
        <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-4 w-fit mb-4">
          <FiCode className="text-white text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Learning Insights</h3>
        <p className="text-gray-600">
          Understand the root cause of errors and learn how to write more robust, Python code.
        </p>
      </div>

      {/* Feature 4 */}
      <div className="rounded-2xl border border-white/20 bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-fade-in">
        <div className="rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 p-4 w-fit mb-4">
          <FiHeart className="text-white text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">For Beginners</h3>
        <p className="text-gray-600">
          Simple, beginner-friendly explanations that demystify complex error messages and stack traces.
        </p>
      </div>
    </div>

    {/* Tech Stack */}
    <div className="rounded-2xl border border-white/20 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 backdrop-blur-sm p-8 shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Built With Modern Tech</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold text-indigo-600 mb-2">Frontend</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>⚛️ React 18</li>
            <li>🎨 Tailwind CSS</li>
            <li>🧭 React Router</li>
            <li>🎯 React Icons</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-purple-600 mb-2">Backend</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>⚡ FastAPI</li>
            <li>🐍 Python</li>
            <li>✓ Pydantic</li>
            <li>🔄 CORS Enabled</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-blue-600 mb-2">Features</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>🚀 Production Ready</li>
            <li>📱 Responsive Design</li>
            <li>✨ Smooth Animations</li>
            <li>🎭 Modern UI/UX</li>
          </ul>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-12 text-center">
      <p className="text-gray-700">
        Ready to debug smarter?{" "}
        <a href="/" className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
          Try it now →
        </a>
      </p>
    </div>
  </section>
);

export default About;
