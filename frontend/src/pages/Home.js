import React, { useState } from "react";
import InputBox from "../components/InputBox";
import ResultTabs from "../components/ResultTabs";
import Loader from "../components/Loader";

const Home = () => {
  const [errorText, setErrorText] = useState("");
  const [result, setResult] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Explanation");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

    try {
      const resp = await fetch("http://127.0.0.1:8001/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold md:text-5xl">Bug Explainer AI</h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base">
          Paste your error message and get a beginner-friendly explanation, fix suggestion, and learning insight.
        </p>
      </div>

      <InputBox
        value={errorText}
        onValueChange={setErrorText}
        onExplain={handleExplain}
        onClear={handleClear}
        onFillSample={handleFillSample}
        loading={loading}
      />

      {errorMsg && (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      {loading && <Loader />}

      {!loading && result && (
        <div className="mt-5">
          <ResultTabs
            result={result}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Quick Support</h2>
        <p className="mt-2 text-sm text-gray-600">
          Example to test:
          <code className="ml-1 rounded bg-gray-100 px-2 py-1 text-xs">
            IndexError: list index out of range
          </code>
        </p>
      </div>
    </section>
  );
};

export default Home;
