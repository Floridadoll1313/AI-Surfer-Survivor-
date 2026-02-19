import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <NavLink to="/">[ SYSTEM_HOME ]</NavLink>
        </div>
        
        <div className="nav-links">
          {/* Main Game/App Links */}
          <NavLink to="/map" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            [ NAV_MAP ]
          </NavLink>
          
          <NavLink to="/challenges" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            [ CHALLENGES ]
          </NavLink>

          <NavLink to="/equipment" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            [ GEAR ]
          </NavLink>

          {/* Legacy Pages now converted to React */}
          <NavLink to="/founders" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            [ FOUNDERS ]
          </NavLink>

          <NavLink to="/archive" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            [ ARCHIVE ]
          </NavLink>

          <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            [ RANKINGS ]
          </NavLink>
        </div>

        <div className="nav-status">
          <span className="status-indicator"></span>
          <span className="status-text">SIGNAL: STABLE</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
