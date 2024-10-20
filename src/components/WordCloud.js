import React from 'react';
import WordCloud from 'react-wordcloud';
import { useState } from 'react';
import { useEffect } from 'react';
import { use } from 'framer-motion/client';
const MyWordCloud = ({ setShowResult, textInput, pdfInput, videoInput, inputType }) => {


  const [fallacies, setFallacies] = useState([]);
  const [text, setText] = useState(() => {
    if (inputType === "Text") return textInput;
    if (inputType === "Video") return  "";
    return pdfInput;
 });




  // Function to generate word frequency from the input string
  const generateWordCloudData = (fallacies) => {
    const wordsArray = fallacies.map(str => str.toLowerCase());

    const wordCount = {};

    // Count the frequency of each word
    wordsArray.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Sort words by frequency in ascending order
    const sortedWords = Object.entries(wordCount).sort((a, b) => a[1] - b[1]);

    // Assign weights based on the sorted order
    return sortedWords.map(([text], index) => ({
      text,
      value: index + 1, // Assign weights starting from 1
    }));
  };


  const handleDetectClick = (text) => {
    const url = "http://localhost:5000/getKeyWords";
    //const text = "hola como estas"
    const jsonData = JSON.stringify({ text: text === "" ? text : text });


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
        setFallacies(response.fallacies);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const words = generateWordCloudData(fallacies);

  const callbacks = {
    onClick: (word) => console.log(`Word clicked: ${word.text}`),
  };

  useEffect(() => {
    handleDetectClick(text)
  }, []);

  return (
    <WordCloud
      words={words}
      callbacks={callbacks}
      options={{ rotations: 2, rotationAngles: [-90, 0] }}
    />
  );
};

export default MyWordCloud;
