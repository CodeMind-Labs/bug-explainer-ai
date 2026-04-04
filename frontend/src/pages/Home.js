import React, { useState } from "react";
import InputBox from "../components/InputBox";
import ResultTabs from "../components/ResultTabs";
import Loader from "../components/Loader";
import { FiAlertCircle } from "react-icons/fi";

const Home = () => {
  const [errorText, setErrorText] = useState("");
  const [result, setResult] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Explanation");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [useAI, setUseAI] = useState(false);

  const samples = [
    "IndexError: list index out of range",
    "KeyError: 'username'",
    "TypeError: can only concatenate str (not 'int') to str",
    "SyntaxError: invalid syntax",
  ];

  const handleExplain = async () => {
    if (!errorText.trim()) {
      setErrorMsg("Please provide an error message to explain.");
      setResult(null);
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setResult(null);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "/api";

    const headers = { "Content-Type": "application/json" };
    if (apiKey && useAI) {
      headers["openai-api-key"] = apiKey;
    }

    try {
      const resp = await fetch(`${apiBaseUrl}/explain`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ error: errorText }),
      });

      if (!resp.ok) {
        const body = await resp.json();
        throw new Error(body.detail || "Server returned error");
      }

      const data = await resp.json();
      setResult(data);
      setSelectedTab("Explanation");
    } catch (err) {
      setErrorMsg(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFillSample = () => {
    const pick = samples[Math.floor(Math.random() * samples.length)];
    setErrorText(pick);
    setResult(null);
    setErrorMsg("");
  };

  const handleClear = () => {
    setErrorText("");
    setResult(null);
    setErrorMsg("");
    setApiKey("");
    setUseAI(false);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-8 sm:p-12 text-white shadow-2xl animate-fade-in relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mb-20" />

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            Bug Explainer AI
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed">
            Paste your programming error and get instant beginner-friendly explanations, suggested fixes, and learning insights.
          </p>
          <p className="text-sm text-white/80 mt-4">✨ Powered by advanced error analysis</p>
        </div>
      </div>

      {/* Input Section */}
      <InputBox
        value={errorText}
        onValueChange={setErrorText}
        onExplain={handleExplain}
        onClear={handleClear}
        onFillSample={handleFillSample}
        loading={loading}
      />

      {/* AI Settings */}
      <div className="rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-4 shadow-sm animate-fade-in">
        <div className="flex items-center gap-3 mb-3">
          <input
            type="checkbox"
            id="useAI"
            checked={useAI}
            onChange={(e) => setUseAI(e.target.checked)}
            className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
          />
          <label htmlFor="useAI" className="text-sm font-semibold text-purple-900 flex items-center gap-2">
            🤖 Use AI for smarter explanations
          </label>
        </div>

        {useAI && (
          <div className="space-y-2">
            <label className="block text-xs font-medium text-purple-700">
              OpenAI API Key (optional - get from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-800">OpenAI</a>)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-3 py-2 text-sm border border-purple-300 rounded-lg bg-white/80 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
            />
            <p className="text-xs text-purple-600">
              Your API key is only used for this request and never stored. Without it, the app uses rule-based explanations.
            </p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="mt-5 rounded-xl border-2 border-red-200 bg-red-50 p-4 flex items-start gap-3 animate-fade-in">
          <FiAlertCircle className="text-red-600 text-xl flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      {/* Loader */}
      {loading && <Loader />}

      {/* Results */}
      {!loading && result && (
        <div className="mt-8">
          <ResultTabs
            result={result}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </div>
      )}

      {/* Info Card */}
      {!result && !loading && (
        <div className="mt-10 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 shadow-md hover:shadow-lg transition-shadow animate-fade-in">
          <h3 className="text-lg font-bold text-indigo-900 flex items-center gap-2">
            💡 How it works
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>✓ Paste any Python error message or traceback</li>
            <li>✓ Get instant, beginner-friendly explanations</li>
            <li>✓ See suggested fixes for common issues</li>
            <li>✓ Learn best practices to avoid similar errors</li>
          </ul>
        </div>
      )}
    </section>
  );
};

export default Home;
