import React, { useState } from 'react';
import './Logger.css';

const Logger = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!fromDate || !toDate) {
      setError('Please select both From and To date.');
      return;
    }

    setError('');
    setDownloading(true);

    try {
      const response = await fetch('http://localhost:8000/download_log');
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'prediction_log.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError('Log download failed or file not found.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="logger-container">
      <h2>Download Logs</h2>
      <p>Select a time range to download logs in Excel format.</p>

      <div className="date-range">
        <div className="input-group">
          <label>From:</label>
          <input type="datetime-local" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </div>
        <div className="input-group">
          <label>To:</label>
          <input type="datetime-local" value={toDate} onChange={e => setToDate(e.target.value)} />
        </div>
      </div>

      <button onClick={handleDownload} disabled={downloading}>
        {downloading ? 'Downloading...' : 'Download Log'}
      </button>

      {error && <div className="error-msg">{error}</div>}
    </div>
  );
};

export default Logger;
