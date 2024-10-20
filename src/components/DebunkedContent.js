import React, { useState, useEffect } from 'react';
import '../styles/DebunkedContent.css'; // Ensure this path matches your project structure

/*const statementsData = [
  {
    statement: "Vaccines cause autism.",
    isAccepted: false, // Refuted
    links: [
      { url: "https://www.cdc.gov", title: "CDC: Vaccine Information" },
      { url: "https://www.who.int", title: "WHO: Immunization Facts" },
      { url: "https://www.nih.gov", title: "NIH: Vaccine Safety Studies" },
      { url: "https://www.healthline.com", title: "Debunking Vaccine Myths" },
      { url: "https://sciencebasedmedicine.org", title: "No Evidence Linking Vaccines to Autism" }
    ],
    reasoning: "Multiple studies and public health organizations have confirmed there is no link between vaccines and autism. Spreading this misinformation can lead to reduced immunization rates, increasing the risk of preventable disease outbreaks."
  },
  {
    statement: "Washing hands prevents the spread of diseases.",
    isAccepted: true, // Accepted
    links: [
      { url: "https://www.who.int", title: "WHO: Hand Hygiene Facts" },
      { url: "https://www.cdc.gov", title: "CDC: Clean Hands Save Lives" },
      { url: "https://www.nih.gov", title: "NIH: Handwashing Research" },
      { url: "https://www.healthline.com", title: "Benefits of Hand Hygiene" },
      { url: "https://www.mayoclinic.org", title: "Mayo Clinic: Handwashing Guide" }
    ],
    reasoning: "Scientific evidence confirms that washing hands with soap and water can significantly reduce the spread of infectious diseases. It is a simple yet highly effective public health measure."
  },
  {
    statement: "5G technology spreads COVID-19.",
    isAccepted: false, // Refuted
    links: [
      { url: "https://www.bbc.com", title: "5G and COVID-19 Misinformation" },
      { url: "https://www.who.int", title: "WHO: COVID-19 Facts" },
      { url: "https://www.cdc.gov", title: "CDC: Virus Transmission Overview" },
      { url: "https://www.nature.com", title: "Scientific Research on 5G Safety" },
      { url: "https://www.wired.com", title: "The 5G-COVID-19 Conspiracy Debunked" }
    ],
    reasoning: "There is no scientific evidence linking 5G networks to the spread of COVID-19. Believing in this falsehood has led to dangerous behavior, including the destruction of infrastructure and public health risks."
  }
];*/

const DebunkedContent = () => {
  const [statementsData, setStatementsData] = useState([])
  const [openStatements, setOpenStatements] = useState(
    Array(statementsData.length).fill(false) // Initialize all statements as closed
  );


const handleFetch = () => {
  const url = "http://localhost:5000/dangerousStatements";
  //const text = "hola como estas"
  var text = "empty_text";
  /*if(inputType === "Text"){
      text = textInput;
  }
  else if(inputType === "Video"){
      text = videoInput;
      handleGetAnswerFromVideo()
      return
  }
  else {
      text = pdfInput;
  }*/

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
      setStatementsData(response.dangerousStatements);
      setOpenStatements(Array(response.dangerousStatements.length).fill(false));
      console.log(response.dangerousStatements)
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
useEffect(() => {
  handleFetch()
}, []);

  const toggleStatement = (index) => {
    const newOpenStates = [...openStatements];
    newOpenStates[index] = !newOpenStates[index]; // Toggle the state
    setOpenStatements(newOpenStates);
  };

  return (
    <div className="debunked-container">
      {statementsData.map((item, index) => (
        <div
          key={index}
          className={`statement-card ${item.isAccepted ? 'accepted' : 'refuted'}`}
        >
          <div
            className={`statement-header ${openStatements[index] ? 'open' : ''}`}
            onClick={() => toggleStatement(index)}
          >
            <h3 className="statement-title">Statement {index + 1}: {item.statement}</h3>
            <span className={`status-label ${item.isAccepted ? 'accepted' : 'refuted'}`}>
              {item.isAccepted ? 'Accepted' : 'Refuted'}
            </span>
          </div>

          {openStatements[index] && (
            <div className="statement-content">
              <div className="evidence-section">
                <p><strong>Evidence:</strong></p>
                <ul className="evidence-list">
                  {item.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="reasoning-text">
                <strong>Reasoning:</strong> {item.reasoning}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DebunkedContent;
// <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Dangerous Statements</h1>