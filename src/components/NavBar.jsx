// src/components/NavBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  const location = useLocation();

  const menuItems = [

    { name: 'Debunker', path: '/debunker' },
    { name: 'Home', path: '/' },
    { name: 'Improve Speech', path: '/improve-speech' }
  ];

  return (
    <div className="navbar-container">

      <div className="topbar">
        <img src="/images/Stars.png" alt="left star" className="topbar-image" />
        <h1 className="topbar-title">DEBUNKD</h1>
        <img src="/images/Stars.png" alt="right star" className="topbar-image2" />
      </div>

      <nav className="menu">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <Link to={item.path}>
              <h6>{item.name}</h6>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default NavBar;
