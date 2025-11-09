import React, { useState } from 'react';
import './SilentLeakControl.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const SilentLeakControl = () => {
  const [sensorValues, setSensorValues] = useState({
    ultrasonic: 1.5,
    smell: 2.1,
    vibration: 3.3,
    piezo: 2.2,
  });
  const [leakStatus, setLeakStatus] = useState('NO LEAK');
  const [alerts, setAlerts] = useState([
    'Silent leak module initialized at ' + new Date().toLocaleString(),
  ]);

  const simulateSensors = async () => {
    try {
      const res = await fetch('http://localhost:8000/simulate');
      const data = await res.json();

      const values = data.simulated_input;
      const prediction = data.result.prediction;

      setSensorValues(values);
      setLeakStatus(prediction);

      setAlerts(prev => [
        `Leak ${prediction === 'LEAK DETECTED' ? 'detected' : 'not detected'} at ${new Date().toLocaleString()}`,
        ...prev,
      ]);
    } catch (err) {
      console.error('Simulation error', err);
      setAlerts(prev => ['Simulation failed.', ...prev]);
    }
  };

  const chartData = {
    labels: ['Ultrasonic sensor', 'Smell sensor', 'Vibration sensor', 'Piezo sensor'],
    datasets: [
      {
        label: 'Sensor Values',
        data: [
          sensorValues.ultrasonic,
          sensorValues.smell,
          sensorValues.vibration,
          sensorValues.piezo,
        ],
        backgroundColor: ['#007bff', '#17a2b8', '#ffc107', '#28a745'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Silent Leak Detection Control</h2>

      <div className="dashboard-content">
        <div className="left-panel">
          <div
            className={`leak-indicator ${leakStatus === 'LEAK DETECTED' ? 'leak' : 'no-leak'}`}
          >
            {leakStatus}
          </div>

          <div className="chart-box">
            <Bar data={chartData} />
            <p className="chart-label">Sensor Outputs</p>
          </div>

          <div className="alerts-section">
            <h3>Recent Alerts</h3>
            <div className="alert-list">
              {alerts.map((alert, index) => (
                <div className="alert-item" key={index}>
                  {alert}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-panel">
          <button className="simulate-button" onClick={simulateSensors}>
            Simulate Sensors
          </button>
        </div>
      </div>
    </div>
  );
};

export default SilentLeakControl;
