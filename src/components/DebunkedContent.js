import React from 'react';
import '../styles/DebunkedContent.css';
import { useState } from 'react';
// Example Data - Replace with your own


// Example Data - Replace with your own
const statementsData = [
    {
      statement: "Vaccines cause autism.",
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
      statement: "5G technology spreads COVID-19.",
      links: [
        { url: "https://www.bbc.com", title: "5G and COVID-19 Misinformation" },
        { url: "https://www.who.int", title: "WHO: COVID-19 Facts" },
        { url: "https://www.cdc.gov", title: "CDC: Virus Transmission Overview" },
        { url: "https://www.nature.com", title: "Scientific Research on 5G Safety" },
        { url: "https://www.wired.com", title: "The 5G-COVID-19 Conspiracy Debunked" }
      ],
      reasoning: "There is no scientific evidence linking 5G networks to the spread of COVID-19. Believing in this falsehood has led to dangerous behavior, including the destruction of infrastructure and public health risks."
    }
  ];
  
  const DebunkedContent = () => {
    const [openStatements, setOpenStatements] = useState(
      Array(statementsData.length).fill(false) // Initialize all statements as closed
    );
  
    const toggleStatement = (index) => {
      const newOpenStates = [...openStatements];
      newOpenStates[index] = !newOpenStates[index]; // Toggle the state
      setOpenStatements(newOpenStates);
    };
  
    return (
      <div className="debunked-container">
        {statementsData.map((item, index) => (
          <div key={index} className="statement-card">
            <div
              className={`statement-header ${openStatements[index] ? 'open' : ''}`}
              onClick={() => toggleStatement(index)}
            >
              <h3 className="statement-title">Statement {index + 1}: {item.statement}</h3>
              <span className="danger-indicator">Dangerous</span>
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