// src/pages/Debunker.js
import React from 'react';
import Form from '../components/Form'
import '../styles/Debunker.css';
const Debunker = () => {
  return (
    <div>
      <div className="header-container">
      <h1 className="header-title">Debunk Videos, PDFs or Text</h1>
      <p className="header-subtitle">
        Just select the option you want and continue the truth
      </p>
    </div>
      <Form currentSection = {"Debunker"}/>
    </div>
  );
};

export default Debunker;
