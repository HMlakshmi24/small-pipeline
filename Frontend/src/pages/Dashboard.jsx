// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [showCameraModal, setShowCameraModal] = useState(null);
  const [cameraAlerts, setCameraAlerts] = useState([
    'Camera monitoring initialized at ' + new Date().toLocaleString(),
  ]);
  const [cameraFeedStatus, setCameraFeedStatus] = useState({
    acoustic: 'Disconnected',
    thermal: 'Disconnected',
    threeD: 'Disconnected',
  });

  const [cameraMetrics, setCameraMetrics] = useState({
    acoustic: { fps: 20, quality: 80 },
    thermal: { fps: 15, quality: 70 },
    threeD: { fps: 25, quality: 85 },
  });

  const openCameraModal = (camera) => {
    setShowCameraModal(camera);
    setCameraAlerts(prev => [`${camera} feed opened — currently disconnected.`, ...prev]);
  };

  const closeCameraModal = () => setShowCameraModal(null);

  const connectCamera = (cameraKey) => {
    setCameraFeedStatus(prev => ({
      ...prev,
      [cameraKey]: prev[cameraKey] === 'Connected' ? 'Disconnected' : 'Connected',
    }));
    setCameraAlerts(prev => [
      `${cameraKey.toUpperCase()} camera ${
        cameraFeedStatus[cameraKey] === 'Connected' ? 'disconnected' : 'connected'
      } at ${new Date().toLocaleString()}`,
      ...prev,
    ]);
  };

  const simulateCameraHealth = () => {
    const newMetrics = {
      acoustic: { fps: Math.floor(Math.random() * 30), quality: Math.floor(Math.random() * 100) },
      thermal: { fps: Math.floor(Math.random() * 30), quality: Math.floor(Math.random() * 100) },
      threeD: { fps: Math.floor(Math.random() * 30), quality: Math.floor(Math.random() * 100) },
    };
    setCameraMetrics(newMetrics);
    setCameraAlerts(prev => [
      `Camera health metrics updated at ${new Date().toLocaleString()}`,
      ...prev,
    ]);
  };

  const chartData = {
    labels: ['Acoustic', 'Thermal', '3D'],
    datasets: [
      {
        label: 'Frame Rate (FPS)',
        data: [
          cameraMetrics.acoustic.fps,
          cameraMetrics.thermal.fps,
          cameraMetrics.threeD.fps,
        ],
        backgroundColor: '#007bff',
      },
      {
        label: 'Image Quality (%)',
        data: [
          cameraMetrics.acoustic.quality,
          cameraMetrics.thermal.quality,
          cameraMetrics.threeD.quality,
        ],
        backgroundColor: '#ffc107',
      },
    ],
  };

  return (
    <div className="dashboard-container fade-in">
      <h2 className="dashboard-title">Camera Monitoring Dashboard</h2>

      <div className="dashboard-content">
        <div className="left-panel">
          <div className="tile-grid">
            {Object.entries(cameraFeedStatus).map(([key, status]) => (
              <div key={key} className={`status-tile ${status === 'Connected' ? 'active' : 'inactive'}`}>
                <h3>{key.toUpperCase()} Camera</h3>
                <p>Status: <strong>{status}</strong></p>
                <p>FPS: {cameraMetrics[key].fps}</p>
                <p>Quality: {cameraMetrics[key].quality}%</p>
              </div>
            ))}
          </div>

          <div className="chart-box">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' }}}} />
            <p className="chart-label">Camera Performance Metrics</p>
          </div>

          <div className="alerts-section">
            <h3>Camera Alerts</h3>
            <div className="alert-list">
              {cameraAlerts.map((alert, index) => (
                <div className="alert-item slide-up" key={index}>
                  {alert}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-panel">
          <button className="simulate-button" onClick={simulateCameraHealth}>
            Simulate Camera Health
          </button>
          <button className="camera-button" onClick={() => connectCamera('acoustic')}>
            Toggle Acoustic Camera
          </button>
          <button className="camera-button" onClick={() => connectCamera('thermal')}>
            Toggle Thermal Camera
          </button>
          <button className="camera-button" onClick={() => connectCamera('threeD')}>
            Toggle 3D Camera
          </button>
          <button className="simulate-button" onClick={() => openCameraModal('Camera Feed View')}>
            View Camera Feed
          </button>
        </div>
      </div>

      {showCameraModal && (
        <div className="camera-modal">
          <div className="modal-content pop">
            <span className="close-btn" onClick={closeCameraModal}>&times;</span>
            <h3>{showCameraModal}</h3>
            <img
              src="https://dummyimage.com/640x360/cccccc/000000&text=Simulated+Camera+Feed"
              alt="Camera Feed"
              className="camera-feed-placeholder"
            />
            <p>Live feed simulation placeholder.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
