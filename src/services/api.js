import axios from 'axios';

const API_KEY = '38c0eed5ed2a9f42e31803b43b31edf1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city) => {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      }),
      axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      }),
    ]);

    return {
      current: weatherResponse.data,
      forecast: forecastResponse.data,
    };
  } catch (error) {
    throw error;
  }
};

