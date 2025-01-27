import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjbWFycm9tQGFkYWl0cy5lcyIsImp0aSI6IjVjYjNjOTZlLTdhM2EtNDJjMi04NDQxLTNlMjI3ZDc0ZTZhMiIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzM3OTY0MDAyLCJ1c2VySWQiOiI1Y2IzYzk2ZS03YTNhLTQyYzItODQ0MS0zZTIyN2Q3NGU2YTIiLCJyb2xlIjoiIn0.L4v8hq4GxqCm1nfUQTZWYf0n_ChNg0SjlQhIhGG8Wdk';
const BASE_URL = 'https://opendata.aemet.es/opendata/api';

// Obtener el tiempo actual en una provincia
export const getCurrentWeatherByProvince = async (municipioCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/observacion/convencional/todas`, {
      params: { api_key: API_KEY },
    });

    if (response.data && response.data.datos) {
      const dataUrl = response.data.datos;
      const weatherData = await axios.get(dataUrl);
      return weatherData.data.filter(item => item.municipio === municipioCode);
    }

    throw new Error('Invalid response from AEMET API');
  } catch (error) {
    console.error('Error fetching current weather data:', error.message);
    throw error;
  }
};

// Obtener la predicción diaria de una provincia
export const getDailyForecast = async (municipioCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/prediccion/especifica/municipio/diaria/${municipioCode}`, {
      params: { api_key: API_KEY },
    });

    if (response.data && response.data.datos) {
      const dataUrl = response.data.datos;
      const forecastData = await axios.get(dataUrl);
      return forecastData.data;
    }

    throw new Error('Invalid response from AEMET API');
  } catch (error) {
    console.error('Error fetching daily forecast data:', error.message);
    throw error;
  }
};

// Obtener el índice de calidad del aire de una provincia
export const getAirQualityIndex = async (municipioCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/calidad_aire/datos/municipio/${municipioCode}`, {
      params: { api_key: API_KEY },
    });

    if (response.data && response.data.datos) {
      const dataUrl = response.data.datos;
      const airQualityData = await axios.get(dataUrl);
      return airQualityData.data;
    }

    throw new Error('Invalid response from AEMET API');
  } catch (error) {
    console.error('Error fetching air quality data:', error.message);
    throw error;
  }
};

// Obtener las provincias
export const getProvinces = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/maestro/provincias`, {
      params: { api_key: API_KEY },
    });

    if (response.data && response.data.datos) {
      const dataUrl = response.data.datos;
      const provincesData = await axios.get(dataUrl);
      return provincesData.data;
    }

    throw new Error('Invalid response from AEMET API');
  } catch (error) {
    console.error('Error fetching provinces data:', error.message);
    throw error;
  }
};

export default {
  getCurrentWeatherByProvince,
  getDailyForecast,
  getAirQualityIndex,
  getProvinces,
};