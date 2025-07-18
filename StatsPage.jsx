import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './APP..css';

export default function StatsPage() {
  const [shortUrl, setShortUrl] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  const handleGetAnalytics = async () => {
    try {
      const response = await axios.get('/api/analytics', {
        params: { shortUrl },
      });
      setAnalytics(response.data);
      setError('');
    } catch (err) {
      setAnalytics(null);
      setError('Analytics not found. Please check the short URL.');
    }
  };

  return (
    <div className="app">
      <div className="header">
        <img src="/favicon.ico" alt="logo" className="logo" />
        <h1 className="title">URL Analytics</h1>
      </div>

      <div className="input-container">
        <input
          type="text"
          className="input"
          placeholder="Enter short URL"
          value={shortUrl}
          onChange={(e) => setShortUrl(e.target.value)}
        />
        <button className="btn" onClick={handleGetAnalytics}>
          Get Stats
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {analytics && (
        <div className="result">
          <h2>Analytics Data</h2>
          <p><strong>Original URL:</strong> {analytics.originalUrl}</p>
          <p><strong>Clicks:</strong> {analytics.clicks}</p>
          <p><strong>Referrers:</strong></p>
          <ul>
            {analytics.referrers?.map((ref, i) => (
              <li key={i}>{ref}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
