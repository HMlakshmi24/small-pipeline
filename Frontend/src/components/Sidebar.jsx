// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaMicrochip, FaFileAlt, FaCogs, FaHome } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideSidebarOnHome = location.pathname === '/';

  if (hideSidebarOnHome) return null;

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Control</h2>
      <nav>
        <NavLink to="/dashboard" className="sidebar-link">
          <FaTachometerAlt className="sidebar-icon" /> Dashboard
        </NavLink>
        <NavLink to="/hardware" className="sidebar-link">
          <FaMicrochip className="sidebar-icon" /> Hardware Control
        </NavLink>
        <NavLink to="/logger" className="sidebar-link">
          <FaFileAlt className="sidebar-icon" /> Logger
        </NavLink>
        <NavLink to="/settings" className="sidebar-link">
          <FaCogs className="sidebar-icon" /> Settings
        </NavLink>
      </nav>

      <button className="home-button" onClick={() => navigate('/')}>
        <FaHome className="sidebar-icon" /> Go Home
      </button>
    </div>
  );
};

export default Sidebar;
