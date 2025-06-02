import React, { useEffect, useState } from 'react';
import './HardwareControl.css';

const HardwareControl = () => {
  const [sensorStatus, setSensorStatus] = useState({});
  const [popup, setPopup] = useState({ visible: false, sensor: '' });

  const fetchHardwareStatus = async () => {
    try {
      const res = await fetch('http://localhost:8000/hardware');
      const data = await res.json();
      setSensorStatus(data.hardware_status);
    } catch (error) {
      console.error('Failed to fetch hardware status', error);
    }
  };

  const handleConnect = (sensor) => {
    setPopup({ visible: true, sensor });
    setTimeout(() => {
      setPopup({ visible: false, sensor: '' });
    }, 2000);
  };

  useEffect(() => {
    fetchHardwareStatus();
    const interval = setInterval(fetchHardwareStatus, 10000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hardware-container">
      <h2>Hardware Control Panel</h2>
      <div className="sensor-list">
        {Object.entries(sensorStatus).map(([sensor, status]) => (
          <div key={sensor} className="sensor-card">
            <div className="sensor-info">
              <h3>{sensor.toUpperCase()}</h3>
              <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
            </div>
            <button onClick={() => handleConnect(sensor)}>Connect</button>
          </div>
        ))}
      </div>

      {popup.visible && (
        <div className="popup">
          <p>Connecting to <strong>{popup.sensor.toUpperCase()}</strong> sensor...</p>
        </div>
      )}
    </div>
  );
};

export default HardwareControl;
