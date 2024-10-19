import React, { useState } from "react";

const Form = () => {
  const [text, setText] = useState("");
  const [fallacies, setFallacies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleDetectClick = () => {
    const url = "http://localhost:5000/detect_fallacies";
    setIsLoading(true);
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
        setFallacies(response.fallacies);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="container text-center mt-4">
      <h1>Falacy Detection in Speech</h1>
      <div className="form-group">
        <textarea
          className="form-control"
          rows="6"
          placeholder="Paste your text here..."
          value={text}
          onChange={handleChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleDetectClick} disabled={isLoading}>
        {isLoading ? "Detecting..." : "Detect Fallacies"}
      </button>
      <div className="mt-4">
        <h4>Detected Fallacies:</h4>
        <ul>
          {fallacies.map((fallacy, index) => (
            <li key={index}>{fallacy}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
