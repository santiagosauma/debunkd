
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Debunker from './pages/Debunker';
import ImproveSpeech from './pages/ImproveSpeech';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/debunker" element={<Debunker />} />
        <Route path="/improve-speech" element={<ImproveSpeech />} />
      </Routes>
    </Router>
  );
};

export default App;
