import React, { useState } from 'react';
import PDFDropper from './PDFDropper'; // Assuming you have this component
import ImproveSpeech from '../pages/ImproveSpeech';
import ImproveSpeechContent from './ImproveSpeechContent';
import '../styles/Form.css';
import DebunkedContent from './DebunkedContent';

const Form = ({ currentSection }) => {
  const markdownContent = `
# Improve Speech Content

This is an example of **bold text** and *italic text*.

- First point
- Second point
- Third point

Here is a code block:

\`\`\`javascript
const greet = () => console.log('Hello, Hackathon!');
greet();
\`\`\`

[Check this link](https://example.com)
`;

  const [inputType, setInputType] = useState('');
  const [pdfInput, setPdfInput] = useState('');
  const [videoInput, setVideoInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [imagePath, setImagePath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVideoInputChange = (e) => setVideoInput(e.target.value);
  const handleTextInputChange = (e) => setTextInput(e.target.value);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/generate_wordcloud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await response.json();
      if (response.ok) {
        setImagePath(data.image_path); // Save the image path
        setShowResult(true); // Show the result
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error('Failed to generate word cloud:', err);
    }

    setIsLoading(false); // Stop loading state
  };

  
  return (
    <div className="form-container">
      {!showResult && (
        <>
          <div className="button-container">
            {['Video', 'Text', 'Upload a PDF'].map((type) => (
              <button
                key={type}
                className="button"
                onClick={() => setInputType(type)}
              >
                {type}
              </button>
            ))}
          </div>

          {inputType === 'Upload a PDF' && (
            <PDFDropper pdfInput={pdfInput} setPdfInput={setPdfInput} />
          )}

          {inputType === 'Text' && (
            <div className="input-wrapper">
              <textarea
                placeholder="Enter your text here..."
                className="text-area"
                value={textInput}
                onChange={handleTextInputChange}
              />
            </div>
          )}

          {inputType === 'Video' && (
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Search for a video..."
                className="search-bar"
                value={videoInput}
                onChange={handleVideoInputChange}
              />
            </div>
          )}

          <button
            className="button"
            style={{ marginTop: '20px' }}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Submit'}
          </button>
        </>
      )}

      {(showResult && currentSection === "ImproveSpeech") && (
        <div>
          <ImproveSpeechContent
            setShowResult={setShowResult}
            textInput={textInput}
            pdfInput={pdfInput}
            videoInput={videoInput}
            inputType={inputType}
          />

          <div className="input-wrapper">
            <h3>PDF Input: {pdfInput}</h3>
            <h3>Video Input: {videoInput}</h3>
            <h3>Text Input: {textInput}</h3>
          </div>

          {imagePath && (
            <div className="wordcloud-container">
              <h2>Your Word Cloud</h2>
              <img
                src={imagePath}
                alt="Word Cloud"
                style={{ maxWidth: '100%', marginTop: '20px' }}
              />
            </div>
          )}
        </div>
      )}

      {(showResult && currentSection === "Debunker") && (
        <div>
          <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Dangerous Statements</h1>
          <DebunkedContent setShowResult = {setShowResult} textInput = {textInput} pdfInput = {pdfInput} videoInput = {videoInput} inputType = {inputType}/>
        <div style={inputWrapperStyle}>
          <h3>PDF Input: {pdfInput}</h3>
          <h3>Video Input: {videoInput}</h3>
          <h3>Text Input: {textInput}</h3>
        </div>
        </div>
      )}
    </div>
  );
};

export default Form;