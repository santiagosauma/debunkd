// src/pages/ImproveSpeech.js
import React from 'react';
import Form from '../components/Form'
import '../styles/Debunker.css';
const ImproveSpeech = () => {
  return (
    <div>
      <div className="header-container">
      <h1 className="header-title">Debunk Videos, PDFs or Text</h1>
      <p className="header-subtitle">
        Just select the option you want and continue the truth
      </p>
    </div>
      <Form/>
    </div>
  );
};

export default ImproveSpeech;
