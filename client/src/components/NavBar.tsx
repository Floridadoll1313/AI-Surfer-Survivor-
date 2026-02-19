import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

/**
 * NavBar Component
 * Features terminal-style brackets and active route highlighting.
 */
const NavBar = () => {
  return (
    <nav className="terminal-nav">
      <div className="nav-logo">
        <span className="logo-icon">◈</span> TERMINAL_OS
      </div>
      <div className="nav-links">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          [ HOME ]
        </NavLink>
        <NavLink 
          to="/map" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          [ NAV_MAP ]
        </NavLink>
        <NavLink 
          to="/equipment" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          [ GEAR ]
        </NavLink>
        <NavLink 
          to="/leaderboard" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
        >
          [ RANKINGS ]
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
