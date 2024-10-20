import React, { useState } from 'react';
import PDFDropper from './PDFDropper'; // Assuming you have this component
import ImproveSpeech from '../pages/ImproveSpeech';
import ImproveSpeechContent from './ImproveSpeechContent';

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

  const handleVideoInputChange = (e) => {
    setVideoInput(e.target.value);
  };

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const buttonStyle = {
    backgroundColor: '#d3d3d3',
    border: 'none',
    padding: '15px 25px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    borderRadius: '5px',
    margin: '0 10px',
    width: '200px',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  };

  const textAreaStyle = {
    width: '580px',
    maxWidth: '800px',
    height: '230px',
    padding: '15px',
    fontSize: '16px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    resize: 'vertical',
    marginTop: '10px',
  };

  const searchBarStyle = {
    padding: '15px',
    fontSize: '18px',
    width: '730px',
    maxWidth: '80%',
    borderRadius: '10px',
    border: '2px solid #aaa',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '10px',
  };

  const inputWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      {!showResult && (
        <>
          <div style={buttonContainerStyle}>
            <button
              style={buttonStyle}
              onClick={() => setInputType('Video')}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#bbb')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#d3d3d3')}
            >
              Video
            </button>
            <button
              style={buttonStyle}
              onClick={() => setInputType('Text')}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#bbb')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#d3d3d3')}
            >
              Enter your Text
            </button>
            <button
              style={buttonStyle}
              onClick={() => setInputType('Upload a PDF')}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#bbb')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#d3d3d3')}
            >
              Upload a PDF
            </button>
          </div>

          {inputType === 'Upload a PDF' && (
            <PDFDropper pdfInput={pdfInput} setPdfInput={setPdfInput} />
          )}

          {inputType === 'Text' && (
            <div style={inputWrapperStyle}>
              <textarea
                placeholder="Enter your text here..."
                rows={10}
                cols={120}
                style={textAreaStyle}
                value={textInput}
                onChange={handleTextInputChange}
              />
            </div>
          )}

          {inputType === 'Video' && (
            <div style={inputWrapperStyle}>
              <input
                type="text"
                placeholder="Search for a video..."
                style={searchBarStyle}
                value={videoInput}
                onChange={handleVideoInputChange}
              />
            </div>
          )}

          <button
            style={{ ...buttonStyle, marginTop: '20px' }}
            onClick={() => setShowResult(true)}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#bbb')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#d3d3d3')}
          >
            Submit
          </button>
        </>
      )}

      {showResult && (
        <div>
          <ImproveSpeechContent markdownContent = {markdownContent} setShowResult = {setShowResult}/>
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
