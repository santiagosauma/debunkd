// src/pages/HomePage.js
import React from 'react';
import InfoHomePage from '../components/InfoHomePage';
import ImproveSpeechContent from '../components/ImproveSpeechContent';
import { useState } from 'react';
import { useEffect } from 'react';


const HomePage = () => {
  const [response, setResponse] = useState("")
  const handleDetectClick = (text) => {
    const url = "http://localhost:5000/howToImprove";
    //const text = "hola como estas"
    const jsonData = JSON.stringify({ text });
  
    // Enviar el texto al backend Flask
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
        setResponse(response.howToImprove);
        console.log(response.howToImprove)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  useEffect(() => {
    handleDetectClick("Este ensayo se trata de como los tomates son mejores que las manzanas, simplemente lo son")
  }, []);





  return (
    <div>
       <ImproveSpeechContent markdownContent = {"hola"}/>
      <InfoHomePage />
    </div>
  );
};

export default HomePage;
