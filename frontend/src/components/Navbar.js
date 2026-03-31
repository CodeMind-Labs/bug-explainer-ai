import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiCode, FiHome } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();
  const navClass = (path) =>
    location.pathname === path
      ? "text-white font-bold flex items-center gap-1"
      : "text-white/80 hover:text-white flex items-center gap-1";

  return (
    <header className="sticky top-0 z-50 animate-slide-down">
      {/* Gradient background with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 opacity-95 backdrop-blur-sm" />
      
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
            <FiCode className="text-white text-xl" />
          </div>
          <div className="text-lg font-bold text-white">Bug Explainer AI</div>
        </Link>

        {/* Navigation */}
        <nav className="hidden sm:flex space-x-8 text-sm">
          <Link
            className={`${navClass("/")} hover:scale-105 transition-transform`}
            to="/"
          >
            <FiHome className="text-lg" />
            <span>Home</span>
          </Link>
          <Link
            className={`${navClass("/about")} hover:scale-105 transition-transform`}
            to="/about"
          >
            <span>About</span>
          </Link>
        </nav>

        {/* Mobile menu icon placeholder */}
        <div className="sm:hidden">
          <div className="text-white text-2xl">☰</div>
        </div>
      </div>

      {/* Subtle bottom shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </header>
  );
};

export default Navbar;
