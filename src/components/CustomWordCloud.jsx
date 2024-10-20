import React, { useState } from 'react';

const WordCloudComponent = () => {
  const [text, setText] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/generate_wordcloud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        setImagePath(data.image_path);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to generate word cloud.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Generate Word Cloud</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here"
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Generate Word Cloud</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imagePath && (
        <div style={{ marginTop: '20px' }}>
          <h2>Your Word Cloud</h2>
          <img src={imagePath} alt="Word Cloud" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default WordCloudComponent;
