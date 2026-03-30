import React from 'react';

// Reusable input component for error message text
const InputBox = ({ value, onChange, onSubmit, loading }) => {
  return (
    <div style={{ marginBottom: '1rem', width: '100%' }}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Paste your Python error message here..."
        rows={7}
        style={{
          width: '100%',
          padding: '0.8rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
          resize: 'vertical',
        }}
      />
      <button
        onClick={onSubmit}
        disabled={loading || !value.trim()}
        style={{
          marginTop: '0.6rem',
          padding: '0.8rem 1.2rem',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          color: 'white',
          backgroundColor: '#2f80ed',
        }}
      >
        {loading ? 'Analyzing...' : 'Explain Error'}
      </button>
    </div>
  );
};

export default InputBox;
