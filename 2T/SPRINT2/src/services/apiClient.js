import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6ZW5jYXJlNGtAZ21haWwuY29tIiwianRpIjoiNWUwMGRkOTAtOTQ4My00YjUyLTkzMmQtNGE4NTE2NzliZWVjIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE3Mzg1MDM1MjUsInVzZXJJZCI6IjVlMDBkZDkwLTk0ODMtNGI1Mi05MzJkLTRhODUxNjc5YmVlYyIsInJvbGUiOiIifQ.jSOwbFKhTpFHPNhsjYOMbTEjEJzE3QFH6pCRsRI7pD4';
const BASE_URL = 'https://opendata.aemet.es/opendata/api';

// URL base para las imágenes de estado del cielo proporcionadas por AEMET
const IMAGE_BASE_URL = 'https://www.aemet.es/imagenes_gcd/_iconos_weather/';

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

    throw new Error('Respuesta inválida de la API de AEMET');
  } catch (error) {
    console.error('Error fetching current weather data:', error.message);
    throw error;
  }
};

// Obtener la predicción diaria de una provincia
export const getDailyForecast = async (provinceCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/prediccion/especifica/municipio/diaria/${provinceCode}`, {
      params: { api_key: API_KEY },
    });

    if (response.data && response.data.datos) {
      const dataUrl = response.data.datos;
      const forecastData = await axios.get(dataUrl);
      return forecastData.data[0];
    }

    throw new Error('Respuesta inválida de la API de AEMET');
  } catch (error) {
    console.error('Error fetching daily forecast data:', error.message);
    throw error;
  }
};

// Obtener la predicción horaria de una provincia
export const getTodayForecast = async (municipioCode) => {
  try {
    const response = await axios.get(`${BASE_URL}/prediccion/especifica/municipio/horaria/${municipioCode}`, {
      params: { api_key: API_KEY },
    });

    if (response.data && response.data.datos) {
      const dataUrl = response.data.datos;
      const forecastResponse = await axios.get(dataUrl, { responseType: 'text' });
      if (forecastResponse.headers['content-type'].includes('application/json')) {
        return JSON.parse(forecastResponse.data);
      } else {
        throw new Error('Respuesta no es JSON');
      }
    }

    throw new Error('Respuesta inválida de la API de AEMET');
  } catch (error) {
    console.error('Error fetching today forecast data:', error.message);
    return [];
  }
};

// Obtener el clima actual y el pronóstico para una provincia
export const getWeatherAndForecastByProvince = async (provinceCode, municipioCode) => {
  try {
    const [currentWeather, dailyForecast] = await Promise.all([
      getCurrentWeatherByProvince(municipioCode),
      getDailyForecast(provinceCode),
    ]);

    return {
      currentWeather,
      dailyForecast,
    };
  } catch (error) {
    console.error('Error fetching weather and forecast data:', error.message);
    throw error;
  }
};

// Obtener la lista de provincias
export const getProvinces = async () => {
  return [
    { nombre: 'Álava', codigo: '01059', latitud: 42.8464, longitud: -2.6719 },
    { nombre: 'Albacete', codigo: '02003', latitud: 38.9943, longitud: -1.8564 },
    { nombre: 'Alicante', codigo: '03014', latitud: 38.3452, longitud: -0.4810 },
    { nombre: 'Almería', codigo: '04013', latitud: 36.8340, longitud: -2.4637 },
    { nombre: 'Ávila', codigo: '05019', latitud: 40.6565, longitud: -4.6818 },
    { nombre: 'Badajoz', codigo: '06015', latitud: 38.8786, longitud: -6.9702 },
    { nombre: 'Barcelona', codigo: '08019', latitud: 41.3851, longitud: 2.1734 },
    { nombre: 'Burgos', codigo: '09059', latitud: 42.3439, longitud: -3.6969 },
    { nombre: 'Cáceres', codigo: '10037', latitud: 39.4765, longitud: -6.3722 },
    { nombre: 'Cádiz', codigo: '11012', latitud: 36.5164, longitud: -6.2994 },
    { nombre: 'Castellón', codigo: '12040', latitud: 39.9864, longitud: -0.0513 },
    { nombre: 'Ciudad Real', codigo: '13034', latitud: 38.9848, longitud: -3.9272 },
    { nombre: 'Córdoba', codigo: '14021', latitud: 37.8882, longitud: -4.7794 },
    { nombre: 'Cuenca', codigo: '16078', latitud: 40.0704, longitud: -2.1374 },
    { nombre: 'Girona', codigo: '17079', latitud: 41.9794, longitud: 2.8214 },
    { nombre: 'Granada', codigo: '18087', latitud: 37.1773, longitud: -3.5986 },
    { nombre: 'Guadalajara', codigo: '19130', latitud: 40.6333, longitud: -3.1669 },
    { nombre: 'Huelva', codigo: '21041', latitud: 37.2614, longitud: -6.9447 },
    { nombre: 'Huesca', codigo: '22125', latitud: 42.1401, longitud: -0.4089 },
    { nombre: 'Jaén', codigo: '23050', latitud: 37.7796, longitud: -3.7849 },
    { nombre: 'León', codigo: '24089', latitud: 42.5987, longitud: -5.5671 },
    { nombre: 'Lleida', codigo: '25120', latitud: 41.6176, longitud: 0.6200 },
    { nombre: 'Lugo', codigo: '27028', latitud: 43.0125, longitud: -7.5550 },
    { nombre: 'Madrid', codigo: '28079', latitud: 40.4168, longitud: -3.7038 },
    { nombre: 'Málaga', codigo: '29067', latitud: 36.7213, longitud: -4.4214 },
    { nombre: 'Murcia', codigo: '30030', latitud: 37.9922, longitud: -1.1307 },
    { nombre: 'Navarra', codigo: '31170', latitud: 42.6954, longitud: -1.6761 },
    { nombre: 'Ourense', codigo: '32054', latitud: 42.3358, longitud: -7.8639 },
    { nombre: 'Palencia', codigo: '34120', latitud: 42.0095, longitud: -4.5270 },
    { nombre: 'Las Palmas', codigo: '35016', latitud: 28.1235, longitud: -15.4363 },
    { nombre: 'Pontevedra', codigo: '36038', latitud: 42.4310, longitud: -8.6444 },
    { nombre: 'La Rioja', codigo: '26142', latitud: 42.2871, longitud: -2.5396 },
    { nombre: 'Salamanca', codigo: '37274', latitud: 40.9701, longitud: -5.6635 },
    { nombre: 'Santa Cruz de Tenerife', codigo: '38038', latitud: 28.4636, longitud: -16.2518 },
    { nombre: 'Segovia', codigo: '40194', latitud: 40.9429, longitud: -4.1088 },
    { nombre: 'Sevilla', codigo: '41091', latitud: 37.3886, longitud: -5.9823 },
    { nombre: 'Soria', codigo: '42173', latitud: 41.7636, longitud: -2.4645 },
    { nombre: 'Tarragona', codigo: '43148', latitud: 41.1189, longitud: 1.2445 },
    { nombre: 'Teruel', codigo: '44216', latitud: 40.3440, longitud: -1.1069 },
    { nombre: 'Toledo', codigo: '45168', latitud: 39.8628, longitud: -4.0273 },
    { nombre: 'Valencia', codigo: '46250', latitud: 39.4699, longitud: -0.3763 },
    { nombre: 'Valladolid', codigo: '47186', latitud: 41.6523, longitud: -4.7245 },
    { nombre: 'Vizcaya', codigo: '48020', latitud: 43.2630, longitud: -2.9349 },
    { nombre: 'Zamora', codigo: '49275', latitud: 41.5033, longitud: -5.7446 },
    { nombre: 'Zaragoza', codigo: '50297', latitud: 41.6488, longitud: -0.8891 },
  ];
};

// Generar la URL de la imagen del estado del cielo
export const getSkyStateImageUrl = (skyStateCode) => {
  if (!skyStateCode) {
    return null;
  }

  // El formato esperado por AEMET para las imágenes es código_estado_cielo + ".png"
  return `${IMAGE_BASE_URL}${skyStateCode}.png`;
};

const apiClient = {
  getCurrentWeatherByProvince,
  getDailyForecast,
  getTodayForecast,
  getWeatherAndForecastByProvince,
  getProvinces,
  getSkyStateImageUrl,
};

export default apiClient;