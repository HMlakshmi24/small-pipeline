import React from 'react';
import pipelineImage from '../assets/pipeline.jpg';

const Hero = ({ onDashboardClick }) => {
  return (
    <div style={{ position: 'relative' }}>
      <img src={pipelineImage} alt="Pipeline" style={{ width: '100%', height: '100vh', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', top: '40%', left: '10%', color: 'white', background: 'rgba(0,0,0,0.6)', padding: '2rem', borderRadius: '10px'
      }}>
        <h1 style={{ fontSize: '3rem' }}>Short Pipeline Monitoring</h1>
        <p style={{ fontSize: '1.2rem' }}>AI Powered Leak Detection at Your Fingertips</p>
        <button onClick={onDashboardClick} style={{ marginTop: '1rem', padding: '0.7rem 1.5rem', background: '#00b4d8', border: 'none', color: 'white', borderRadius: '5px', fontSize: '1rem' }}>
          Access Dashboard
        </button>
      </div>
    </div>
  );
};

export default Hero;
