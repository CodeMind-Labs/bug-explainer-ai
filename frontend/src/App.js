import React, { useState } from 'react';
import InputBox from './components/InputBox';
import ResultCard from './components/ResultCard';

const App = () => {
  const [errorText, setErrorText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async () => {
    if (!errorText.trim()) {
      setStatusMessage('Please enter an error message.');
      return;
    }

    setLoading(true);
    setStatusMessage('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: errorText }),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.detail || 'Server returned an error');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: '#f4f6fb',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ width: '100%', maxWidth: '760px', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.3rem' }}>Bug Explainer AI</h1>
        <p style={{ marginTop: 0, color: '#555' }}>
          Paste a programming error message and get a beginner-friendly explanation, a suggested fix, and a learning
          insight.
        </p>

        <InputBox
          value={errorText}
          onChange={(e) => setErrorText(e.target.value)}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {statusMessage && (
          <div
            style={{
              marginBottom: '1rem',
              color: '#cc0000',
              textAlign: 'left',
              fontSize: '0.95rem',
            }}
          >
            {statusMessage}
          </div>
        )}

        <ResultCard result={result} />
      </div>
    </div>
  );
};

export default App;
