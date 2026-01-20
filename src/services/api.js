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

    const [weatherResponse, forecastResponse, aqiResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, { params: commonParams }),
      axios.get(`${BASE_URL}/forecast`, { params: commonParams }),
      axios.get(`${BASE_URL}/air_pollution`, { params: commonParams }),
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

/**
 * Fetch city suggestions from OpenWeatherMap Geo API
 * @param {string} query - Search string
 */
export const fetchCitySuggestions = async (query) => {
  if (!query || query.length < 3) return [];

  try {
    const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
    const response = await axios.get(GEO_URL, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY
      }
    });

    // Transform to simple format
    return response.data.map(item => ({
      name: item.name,
      state: item.state,
      country: item.country,
      lat: item.lat,
      lon: item.lon,
      label: `${item.name}, ${item.state ? item.state + ', ' : ''}${item.country}`
    }));
  } catch (error) {
    console.warn('Geo API Error:', error);
    return [];
  }
};

