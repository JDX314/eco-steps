import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Replace with your desired city and your OpenWeatherMap API key
  const city = 'London';
  const apiKey = 'YOUR_API_KEY'; // <-- Add your API key here
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //const apiUrl ="";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Unable to fetch weather data.');
      });
  }, [apiUrl]);

  return (
    <div style={{ margin: '2rem', padding: '1rem', background: '#fff', borderRadius: '8px' }}>
      <h3>Current Weather in {city}</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {weatherData ? (
        <div>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        !error && <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Weather;
