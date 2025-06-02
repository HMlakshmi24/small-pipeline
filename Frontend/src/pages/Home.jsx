// pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InfoSection from '../components/InfoSection';
import LoginModal from '../components/LoginModal';
import Footer from '../components/Footer';
import TransparentCard from '../components/TransparentCard';

const Home = () => {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [showLoggedInMsg, setShowLoggedInMsg] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(stored);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setShowLogin(false);

    setShowLoggedInMsg(true);
    setTimeout(() => {
      setShowLoggedInMsg(false);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setActiveTab(null);
  };

  const handleDashboardAccess = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div onClick={() => setActiveTab(null)}>
      <Navbar
        onLoginClick={(e) => {
          e.stopPropagation();
          setShowLogin(true);
        }}
        onTabClick={(tab) => setActiveTab(tab)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onDashboardClick={handleDashboardAccess}
      />
      <Hero onDashboardClick={handleDashboardAccess} />
      {activeTab && <TransparentCard tab={activeTab} onClose={() => setActiveTab(null)} />}
      <InfoSection />
      <Footer />
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {showLoggedInMsg && (
        <div style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'green',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          fontSize: '1.2rem',
          zIndex: 10000,
          boxShadow: '0 0 10px rgba(0,0,0,0.3)'
        }}>
          You are logged in! Now you can access the dashboard.
        </div>
      )}
    </div>
  );
};

export default Home;
