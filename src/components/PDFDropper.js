import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';

/// extracted text is kept in extractedtext
const PDFDropper = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      extractText(selectedFile);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      extractText(droppedFile);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const extractText = (pdfFile) => {
    pdfToText(pdfFile)
      .then((text) => setExtractedText(text))
      .catch((error) => console.error('Failed to extract text from PDF:', error));
  };

  return (
    <div className="App">
      <header
        className="App-header"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: '2px dashed #007bff',
          borderRadius: '10px',
          padding: '30px 20px',
          textAlign: 'center',
          backgroundColor: '#e9ecef',
          color: '#495057',
          cursor: 'pointer',
          width: '40%',
          height: '200px',
          margin: '0 auto',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <img
          src="https://www.svgrepo.com/show/415356/pdf-send-portable-digital-file.svg"
          alt="PDF icon"
          style={{ width: '150px', marginBottom: '10px' }}
        />
        <br />
        <label
          htmlFor="file-upload"
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            whiteSpace: 'pre-line',
          }}
        >
          {file ? file.name : 'Drag and drop your PDF here\nOr click here'}
        </label>
      </header>
      {extractedText && (
        <div
          style={{
            marginTop: '20px',
            padding: '20px',
            backgroundColor: '#f1f3f5',
            borderRadius: '10px',
            maxWidth: '80%',
            margin: '20px auto',
            whiteSpace: 'pre-wrap',
            textAlign: 'left',
          }}
        >
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default PDFDropper;
