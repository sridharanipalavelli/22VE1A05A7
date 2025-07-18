import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [location, setLocation] = useState('Fetching location...');

  useEffect(() => {
    // Get user's location using free IP API
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocation(`${data.city}, ${data.country_name}`);
      })
      .catch(() => {
        setLocation('Unknown');
      });
  }, []);

  const handleShorten = () => {
    if (!originalUrl.trim()) {
      alert("Please enter a URL!");
      return;
    }

    // Fake short URL logic (frontend-only)
    const random = Math.random().toString(36).substring(7);
    const shortened = `https://short.ly/${random}`;

    setShortUrl(shortened);
  };

  return (
    <div className="app">
      <h1>🔗 URL Shortener</h1>

      <p className="location">🌍 Your Location: <strong>{location}</strong></p>

      <input
        type="text"
        placeholder="Enter your URL here..."
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="input"
      />

      <button onClick={handleShorten} className="btn">
        Shorten
      </button>

      {shortUrl && (
        <div className="result">
          <p>Short URL:</p>
          <a href={originalUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;

