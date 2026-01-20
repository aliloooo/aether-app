import axios from 'axios';

const API_KEY = '38c0eed5ed2a9f42e31803b43b31edf1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch weather data by city name or coordinates
 * @param {string|object} location - City name or { lat, lon } object
 */
export const fetchWeatherData = async (location) => {
  try {
    const params = typeof location === 'string'
      ? { q: location }
      : { lat: location.lat, lon: location.lon };

    const commonParams = {
      ...params,
      appid: API_KEY,
      units: 'metric',
    };

    // 1. Fetch current weather first to get coordinates (important for AQI)
    const weatherResponse = await axios.get(`${BASE_URL}/weather`, { params: commonParams });
    const { lat, lon } = weatherResponse.data.coord;

    // 2. Now fetch forecast and AQI using the coordinates for better accuracy/compatibility
    const [forecastResponse, aqiResponse] = await Promise.all([
      axios.get(`${BASE_URL}/forecast`, {
        params: { lat, lon, appid: API_KEY, units: 'metric' }
      }),
      axios.get(`${BASE_URL}/air_pollution`, {
        params: { lat, lon, appid: API_KEY }
      }),
    ]);

    return {
      current: weatherResponse.data,
      forecast: forecastResponse.data,
      aqi: aqiResponse.data,
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

