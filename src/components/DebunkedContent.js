import React, { useState, useEffect } from 'react';
import '../styles/DebunkedContent.css'; // Ensure this path matches your project structure


const buttonStyle = {
 position: 'absolute',
 backgroundColor: 'transparent', // No background
 border: 'none',
 cursor: 'pointer',
 fontSize: '32px', // Bigger size for the arrow
 color: '#007bff', // Blue color for the arrow
 fontWeight: 'bold',
 padding: '0',
 lineHeight: '1',
};



const DebunkedContent = ({setShowResult, textInput, pdfInput, videoInput, inputType}) => {
 const [statementsData, setStatementsData] = useState([])
 const [openStatements, setOpenStatements] = useState(
   Array(statementsData.length).fill(false) // Initialize all statements as closed
 );


const handleGetAnswerFromVideo = () =>{
 const url = "http://localhost:5000/dangerousStatementsVideo";
 const text = videoInput


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
     setStatementsData(response.dangerousStatementsVideo);
     setOpenStatements(Array(response.dangerousStatementsVideo.length).fill(false));
     console.log(response.dangerousStatementsVideo)
   })
   .catch((error) => {
     console.error("Error:", error);
   });
}
const handleFetch = () => {
 const url = "http://localhost:5000/dangerousStatements";
 //const text = "hola como estas"
 var text = "empty_text";
 if(inputType === "Text"){
     text = textInput;
 }
 else if(inputType === "Video"){
     text = videoInput;
     handleGetAnswerFromVideo()
     return
 }
 else {
     text = pdfInput;
 }


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
    console.log(response.dangerousStatements)
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
 console.log("this is the input type")
  console.log(inputType)

}, 
[]);


 const toggleStatement = (index) => {
   const newOpenStates = [...openStatements];
   newOpenStates[index] = !newOpenStates[index]; // Toggle the state
   setOpenStatements(newOpenStates);
 };
console.log("this is the length")
console.log(statementsData.length)
console.log(statementsData)
 return (
   <div className="debunked-container">
     <button style={buttonStyle} onClick={() => setShowResult(false)}>
       ←
     </button>
     <br></br>
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