// src/components/InfoHomePage.js
import React, { useState } from 'react';
import '../styles/InfoHomePage.css';

const content = {
  howItWorks: {
    title: 'How it Works',
    text: 'Our lie detection system analyzes statements using AI algorithms and classifies them based on their credibility. It assigns color-coded indicators to represent the validity of the information.'
  },
  validity: {
    title: 'Validity',
    text: 'Validity refers to the degree to which a statement or claim aligns with factual data. Our system ensures that validated sources are prioritized and misinformation is flagged promptly.'
  },
  whatAreFallacies: {
    title: 'What are Fallacies',
    text: 'Fallacies are deceptive arguments or reasoning errors that may seem convincing but lack sound logic. Examples include Ad Hominem, Straw Man, and Slippery Slope fallacies.'
  },
  misinformation: {
    title: 'Misinformation in the Current World',
    text: 'Studies show that 59% of people encounter misinformation online weekly. Social media amplifies unverified content, making fact-checking essential in today\'s world.'
  }
};

const InfoHomePage = () => {
  const [selected, setSelected] = useState('howItWorks');

  return (
    <div className="info-homepage-container">
      <div className="sidebar">
        <button onClick={() => setSelected('howItWorks')}>How it Works</button>
        <button onClick={() => setSelected('validity')}>Validity</button>
        <button onClick={() => setSelected('whatAreFallacies')}>What are Fallacies</button>
        <button onClick={() => setSelected('misinformation')}>
          Misinformation in the Current World
        </button>
      </div>

      <div className="content">
        <h2>{content[selected].title}</h2>
        <p>{content[selected].text}</p>
      </div>
    </div>
  );
};

export default InfoHomePage;
