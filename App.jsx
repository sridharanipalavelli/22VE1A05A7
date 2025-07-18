import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Grid, Paper, Box
} from '@mui/material';
import './App.css';

function App() {
  const [urls, setUrls] = useState([{ longUrl: '', validity: '', shortcode: '' }]);
  const [shortenedList, setShortenedList] = useState([]);
  const [page, setPage] = useState('shortener');

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortcode = () => Math.random().toString(36).substring(2, 8);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addInput = () => {
    if (urls.length < 5) {
      setUrls([...urls, { longUrl: '', validity: '', shortcode: '' }]);
    }
  };

  const handleShorten = () => {
    const results = [];
    const usedShortcodes = new Set(shortenedList.map(item => item.shortcode));

    urls.forEach(({ longUrl, validity, shortcode }) => {
      if (!isValidUrl(longUrl)) return;

      let validMin = parseInt(validity);
      if (isNaN(validMin) || validMin <= 0) validMin = 30;

      let code = shortcode || generateShortcode();
      while (usedShortcodes.has(code)) {
        code = generateShortcode();
      }
      usedShortcodes.add(code);

      results.push({
        original: longUrl,
        shortcode: code,
        expiry: new Date(Date.now() + validMin * 60000).toLocaleString()
      });
    });

    setShortenedList([...shortenedList, ...results]);
    setUrls([{ longUrl: '', validity: '', shortcode: '' }]);
  };

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={2} textAlign="center">
        <Typography variant="h4">🔗 React URL Shortener</Typography>
        <Box mt={2}>
          <Button onClick={() => setPage('shortener')} variant="contained" sx={{ mx: 1 }}>
            Shortener
          </Button>
          <Button onClick={() => setPage('stats')} variant="outlined" sx={{ mx: 1 }}>
            Statistics
          </Button>
        </Box>
      </Box>

      {page === 'shortener' && (
        <>
          {urls.map((url, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Enter Long URL"
                    value={url.longUrl}
                    onChange={(e) => handleChange(index, 'longUrl', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Validity (mins)"
                    value={url.validity}
                    onChange={(e) => handleChange(index, 'validity', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Custom Shortcode (optional)"
                    value={url.shortcode}
                    onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}

          <Box display="flex" justifyContent="space-between" mb={4}>
            <Button onClick={addInput} disabled={urls.length >= 5} variant="outlined">
              ➕ Add URL
            </Button>
            <Button onClick={handleShorten} variant="contained" color="success">
              🚀 Shorten
            </Button>
          </Box>
        </>
      )}

      {page === 'stats' && (
        <>
          <Typography variant="h5" sx={{ mb: 2 }}>📊 Shortened URLs</Typography>
          {shortenedList.length === 0 ? (
            <Typography>No URLs shortened yet.</Typography>
          ) : (
            shortenedList.map((item, i) => (
              <Paper key={i} sx={{ p: 2, mb: 2 }}>
                <Typography><strong>Original:</strong> {item.original}</Typography>
                <Typography><strong>Short URL:</strong> http://localhost:3000/{item.shortcode}</Typography>
                <Typography><strong>Expires At:</strong> {item.expiry}</Typography>
              </Paper>
            ))
          )}
        </>
      )}
    </Container>
  );
}

export default App;


