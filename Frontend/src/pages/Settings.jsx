import React, { useState } from "react";
import "./Settings.css";

const tabs = [
  { id: "ports", label: "Port Configuration" },
  { id: "alerts", label: "Alert Settings" },
  { id: "general", label: "General Settings" },
  { id: "user", label: "User Preferences" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("ports");

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "ports" && <PortConfiguration />}
        {activeTab === "alerts" && <AlertSettings />}
        {activeTab === "general" && <GeneralSettings />}
        {activeTab === "user" && <UserPreferences />}
      </div>
    </div>
  );
}

// --- Components for each tab content ---

function PortConfiguration() {
  // Dummy ports list
  const ports = ["COM1", "COM2", "COM3", "USB1", "USB2", "ETH0"];

  return (
    <div className="tab-section">
      <h3>Port Configuration</h3>
      <p>Select ports to connect sensors and devices:</p>
      <ul className="port-list">
        {ports.map((port) => (
          <li key={port} className="port-item">
            <span>{port}</span>
            <button className="btn-connect" onClick={() => alert(`Connecting to ${port}...`)}>
              Connect
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AlertSettings() {
  return (
    <div className="tab-section">
      <h3>Alert Settings</h3>
      <p>Configure alert preferences:</p>
      <div className="alert-setting">
        <label>
          <input type="checkbox" /> Enable Leak Alerts
        </label>
      </div>
      <div className="alert-setting">
        <label>
          Alert Threshold (Pressure):
          <input type="number" min="0" max="100" defaultValue={50} className="input-number" />
        </label>
      </div>
      <button className="btn-save" onClick={() => alert("Alert settings saved!")}>
        Save Settings
      </button>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="tab-section">
      <h3>General Settings</h3>
      <div className="general-setting">
        <label>
          <input type="checkbox" defaultChecked /> Auto-refresh Dashboard
        </label>
      </div>
      <div className="general-setting">
        <label>
          <input type="checkbox" /> Enable Dark Mode
        </label>
      </div>
      <button className="btn-save" onClick={() => alert("General settings saved!")}>
        Save Settings
      </button>
    </div>
  );
}

function UserPreferences() {
  return (
    <div className="tab-section">
      <h3>User Preferences</h3>
      <p>Manage your user profile and preferences:</p>
      <button className="btn-action" onClick={() => alert("User profile updated!")}>
        Update Profile
      </button>
      <button className="btn-action" onClick={() => alert("Preferences saved!")}>
        Save Preferences
      </button>
    </div>
  );
}
