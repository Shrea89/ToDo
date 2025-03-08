import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { getWeatherInfo } from '../api/weatherApi';

const WeatherWidget = ({ city = 'London' }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getWeatherInfo(city);
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather information');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh weather every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [city]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 2 }}>
        {error}
      </Typography>
    );
  }

  if (!weather) return null;

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <img
        src={weather.icon}
        alt={weather.condition}
        style={{ width: 50, height: 50 }}
      />
      <Box>
        <Typography variant="h6">
          {weather.temperature}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {weather.condition}
        </Typography>
      </Box>
    </Paper>
  );
};

export default WeatherWidget; 