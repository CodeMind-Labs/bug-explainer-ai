import React from 'react';

const ResultCard = ({ result }) => {
  if (!result) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '720px',
        background: 'white',
        border: '1px solid #ddd',
        padding: '1.2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
      }}
    >
      <h3>Explanation</h3>
      <p>{result.explanation}</p>
      <h3>Suggested Fix</h3>
      <p>{result.fix}</p>
      <h3>Learning Insight</h3>
      <p>{result.learning}</p>
    </div>
  );
};

export default ResultCard;
