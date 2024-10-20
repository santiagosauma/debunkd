import React, { useState } from 'react';
import PDFDropper from './PDFDropper'; 
import ImproveSpeechContent from './ImproveSpeechContent';
import DebunkedContent from './DebunkedContent';
import '../styles/Form.css';
import MyWordCloud from './WordCloud';
import { div } from 'framer-motion/client';

const Form = ({ currentSection }) => {
  const [inputType, setInputType] = useState('');
  const [pdfInput, setPdfInput] = useState('');
  const [videoInput, setVideoInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleTextInputChange = (e) => setTextInput(e.target.value);
  const handleVideoInputChange = (e) => setVideoInput(e.target.value);

  const handleSubmit = () => setShowResult(true);


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

          <button className="button" style={{ marginTop: '20px' }} onClick={handleSubmit}>
            Submit
          </button>
        </>
      )}

      {showResult && currentSection === 'ImproveSpeech' && (
        <ImproveSpeechContent
          setShowResult={setShowResult}
          textInput={textInput}
          pdfInput={pdfInput}
          videoInput={videoInput}
          inputType={inputType}
        />
      )}

    {showResult && currentSection === 'Debunker' && (
      <div>
        <DebunkedContent
          setShowResult={setShowResult}
          textInput={textInput}
          pdfInput={pdfInput}
          videoInput={videoInput}
          inputType={inputType}
        />
        <MyWordCloud 
             setShowResult={setShowResult}
             textInput={textInput}
             pdfInput={pdfInput}
             videoInput={videoInput}
             inputType={inputType}/>
      </div>
    )}
      
    </div>
  );
};

export default Form;
