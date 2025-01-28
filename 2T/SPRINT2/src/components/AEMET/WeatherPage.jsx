import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import '../../styles/weather.css'; // Estilos personalizados para la interfaz
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Registrar las escalas necesarias en Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.4168, lng: -3.7038 }); // Madrid como posición inicial
  const [markerPosition, setMarkerPosition] = useState(null); // Posición del marcador

  // Cargar las provincias al inicio
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const provincesList = await apiClient.getProvinces();
        setProvinces(provincesList);
      } catch (error) {
        console.error('Error fetching provinces:', error.message);
      }
    };

    fetchProvinces();
  }, []);

  // Obtener datos del clima
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      const province = provinces.find(p => p.nombre.toLowerCase() === location.toLowerCase());
      if (!province) {
        throw new Error('Provincia no encontrada');
      }

      const weather = await apiClient.getCurrentWeatherByProvince(province.codigo);
      const forecast = await apiClient.getDailyForecast(province.codigo);

      setCurrentWeather(weather);
      setForecastData(forecast);

      // Establecer coordenadas de la provincia y posición del marcador
      setMapCenter({ lat: province.latitud, lng: province.longitud });
      setMarkerPosition({ lat: province.latitud, lng: province.longitud });
    } catch (err) {
      setError('Error al obtener los datos meteorológicos');
      setCurrentWeather([]);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <h1>Información Meteorológica</h1>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Introduce el nombre de la provincia"
          className="search-input"
          list="provinces"
        />
        <datalist id="provinces">
          {provinces.map((province, index) => (
            <option key={index} value={province.nombre} />
          ))}
        </datalist>
        <button onClick={fetchWeatherData} className="search-button">
          Buscar
        </button>
      </div>

      {/* Indicador de carga */}
      {loading && <p>Cargando...</p>}

      {/* Manejo de errores */}
      {error && <p className="error-message">{error}</p>}

      {/* Datos del clima */}
      {currentWeather.length > 0 && (
        <div>
          <h2>Clima Actual en {location}</h2>
          <table className="weather-table">
            <thead>
              <tr>
                <th>Estación</th>
                <th>Temperatura (°C)</th>
                <th>Humedad (%)</th>
                <th>Viento (km/h)</th>
                <th>Condición</th>
              </tr>
            </thead>
            <tbody>
              {currentWeather.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.temperatura}</td>
                  <td>{item.humedad}</td>
                  <td>{item.viento}</td>
                  <td>
                    <img src={`/assets/icons/${item.estadoCielo}.svg`} alt={item.estadoCielo} className="weather-icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Predicción futura */}
      {forecastData && (
        <div>
          <h2>Predicción para los próximos días</h2>
          <table className="forecast-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Estado del Cielo</th>
                <th>Temperatura Máxima (°C)</th>
                <th>Temperatura Mínima (°C)</th>
                <th>Humedad (%)</th>
                <th>Viento (km/h)</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.prediccion.dia.map((day, index) => (
                <tr key={index}>
                  <td>{day.fecha}</td>
                  <td>
                    <img
                      src={`/assets/icons/${day.estadoCielo[0]?.value || 'default'}.svg`}
                      alt={day.estadoCielo[0]?.descripcion || 'Desconocido'}
                      className="weather-icon"
                    />
                    {day.estadoCielo[0]?.descripcion || 'Sin datos'}
                  </td>
                  <td>{day.temperatura.maxima || 'N/A'}</td>
                  <td>{day.temperatura.minima || 'N/A'}</td>
                  <td>{day.humedadRelativa.maxima || 'N/A'}</td>
                  <td>{day.viento[0]?.velocidad || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mapa interactivo */}
      <MapContainer center={mapCenter} zoom={8} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>{location}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default WeatherPage;