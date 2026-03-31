import React from "react";
import { FiGithub, FiHeart } from "react-icons/fi";

const Footer = () => (
  <footer className="border-t border-white/20 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 py-8 mt-12">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center gap-4">
        <p className="text-sm text-gray-600">
          Bug Explainer AI · Built with{" "}
          <FiHeart className="inline text-red-500 animate-pulse" /> using React + FastAPI
        </p>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} · Made with ❤️ for developers
        </p>
        <div className="flex gap-4 mt-2">
          <a
            href="https://github.com/CodeMind-Labs/bug-explainer-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-indigo-600 transition-colors hover:scale-110"
          >
            <FiGithub className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
