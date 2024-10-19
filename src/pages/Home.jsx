// src/pages/HomePage.js
import React from 'react';
import InfoHomePage from '../components/InfoHomePage';
import ImproveSpeechContent from '../components/ImproveSpeechContent';

const HomePage = () => {
  return (
    <div>
       <ImproveSpeechContent markdownContent = {"hola"}/>
      <InfoHomePage />
    </div>
  );
};

export default HomePage;
