import React, { useState, useEffect } from 'react';
import '../styles/DebunkedContent.css';

const buttonStyle = {
  position: 'fixed',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '32px',
  color: '#007bff',
  fontWeight: 'bold',
  padding: '0',
  lineHeight: '1',
};

const DebunkedContent = ({setShowResult, textInput, pdfInput, videoInput, inputType}) => {
  const [statementsData, setStatementsData] = useState([])
  const [openStatements, setOpenStatements] = useState(
    Array(statementsData.length).fill(false) // Initialize all statements as closed
  );


const handleFetch = () => {
  const url = "http://localhost:5000/dangerousStatements";
  var text = "empty_text";

  const jsonData = JSON.stringify({ text });

  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: jsonData,
  })
    .then((response) => response.json())
    .then((response) => {
      setStatementsData(response.dangerousStatements);
      setOpenStatements(Array(response.dangerousStatements.length).fill(false));
      console.log(response.dangerousStatements)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
useEffect(() => {
  handleFetch()
}, []);

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
      <br></br>
      {statementsData.map((item, index) => (
        <div
          key={index}
          className={`statement-card ${item.isAccepted ? 'accepted' : 'refuted'}`}
        >
          <div
            className={`statement-header ${openStatements[index] ? 'open' : ''}`}
            onClick={() => toggleStatement(index)}
          >
            <h3 className="statement-title">Statement {index + 1}: {item.statement}</h3>
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