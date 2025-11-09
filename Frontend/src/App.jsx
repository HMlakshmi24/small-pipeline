import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SilentLeakControl from './pages/SilentLeakControl';
import HardwareControl from './pages/HardwareControl';
import Logger from './pages/Logger';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/silent-leak-control" element={<SilentLeakControl />} />
            <Route path="/hardware" element={<HardwareControl />} />
            <Route path="/logger" element={<Logger />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
