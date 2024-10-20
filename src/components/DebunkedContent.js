import React, { useState, useEffect, useCallback } from 'react';
import '../styles/DebunkedContent.css';

const buttonStyle = {
  position: 'absolute',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '32px',
  color: '#007bff',
  fontWeight: 'bold',
  padding: '0',
  lineHeight: '1',
};

const DebunkedContent = ({ setShowResult, textInput, inputType }) => {
  const [statementsData, setStatementsData] = useState([]);
  const [openStatements, setOpenStatements] = useState([]);
  const [/*imageVisible*/, setImageVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Track loading state

  /*
  const generateWordCloud = useCallback(async () => {
    try {
      console.log('Generating word cloud...');
      setLoading(true); // Start loading state

      await fetch('http://localhost:5000/generate_wordcloud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput }),
      });

      console.log('Word cloud generation complete.');
      setImageVisible(true); // Enable image display after generation
    } catch (error) {
      console.error('Failed to generate word cloud:', error);
    } finally {
      setLoading(false); // Stop loading state
    }
  }, [textInput]);
  */

  const handleFetchStatements = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/dangerousStatements', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await response.json();
      console.log('Statements Data:', data.dangerousStatements);
      setStatementsData(data.dangerousStatements);
      setOpenStatements(Array(data.dangerousStatements.length).fill(false));
    } catch (error) {
      console.error('Error fetching statements:', error);
    }
  }, [textInput]);

  useEffect(() => {
    handleFetchStatements(); // Fetch dangerous statements
    // generateWordCloud(); // Generate word cloud only on mount (commented out)
  }, [handleFetchStatements /*, generateWordCloud*/]);

  const toggleStatement = (index) => {
    const newOpenStates = [...openStatements];
    newOpenStates[index] = !newOpenStates[index];
    setOpenStatements(newOpenStates);
  };

  return (
    <div className="debunked-container">
      <button style={buttonStyle} onClick={() => setShowResult(false)}>
        ←
      </button>

      {/* Word Cloud Image Section (Commented Out)
      {loading ? (
        <p>Generating word cloud...</p>
      ) : (
        imageVisible && (
          <div className="wordcloud-container">
            <h2>Your Word Cloud</h2>
            <img
              src="/images/wordcloud.png"
              alt="Word Cloud"
              style={{ maxWidth: '100%', marginTop: '20px' }}
              onLoad={() => console.log('Image loaded successfully')}
            />
          </div>
        )
      )} */}

      {/* Statements Data */}
      {statementsData.map((item, index) => (
        <div
          key={index}
          className={`statement-card ${item.isAccepted ? 'accepted' : 'refuted'}`}
        >
          <div
            className={`statement-header ${openStatements[index] ? 'open' : ''}`}
            onClick={() => toggleStatement(index)}
          >
            <h3 className="statement-title">
              Statement {index + 1}: {item.statement}
            </h3>
            <span className={`status-label ${item.isAccepted ? 'accepted' : 'refuted'}`}>
              {item.isAccepted ? 'Accepted' : 'Refuted'}
            </span>
          </div>

          {openStatements[index] && (
            <div className="statement-content">
              <div className="evidence-section">
                <p><strong>Evidence:</strong></p>
                <ul className="evidence-list">
                  {item.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="reasoning-text">
                <strong>Reasoning:</strong> {item.reasoning}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DebunkedContent;
