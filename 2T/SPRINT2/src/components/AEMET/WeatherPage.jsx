import React, { useState, useEffect } from 'react';
import { getCurrentWeatherByProvince, getDailyForecast } from '../../services/apiClient';
import '../../styles/weather.css'; // Asegúrate de crear un archivo CSS para los estilos del tiempo
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { MapContainer, TileLayer, LayerGroup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Registrar las escalas necesarias en Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const provinces = [
  { nombre: 'Sevilla', codigo: '41091' },
  { nombre: 'Madrid', codigo: '28079' },
  // Agrega todas las provincias necesarias
];

const convertTemperature = (temp) => {
  // Ejemplo de conversión de temperatura de Kelvin a Celsius
  return temp - 273.15;
};

const WeatherPage = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showData, setShowData] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Coordenadas iniciales
  const [overlayType, setOverlayType] = useState('temp_new'); // Tipo de capa meteorológica

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const province = provinces.find(p => p.nombre.toLowerCase() === location.toLowerCase());
      if (!province) {
        throw new Error('Province not found');
      }
      const municipioCode = province.codigo;
      const weatherData = await getCurrentWeatherByProvince(municipioCode);
      const forecastData = await getDailyForecast(municipioCode);
      setCurrentWeather(weatherData);
      setForecastData(forecastData);
      setError(null);
      setShowData(true);

      // Obtener coordenadas de la ubicación ingresada
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lon) });
      } else {
        throw new Error('Location not found');
      }
    } catch (err) {
      setError('Error fetching weather data');
      setCurrentWeather(null);
      setForecastData(null);
      setShowData(false);
    } finally {
      setLoading(false);
    }
  };

  const overlayUrls = {
    temp_new: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=YOUR_OPENWEATHERMAP_API_KEY',
    precipitations_new: 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=YOUR_OPENWEATHERMAP_API_KEY',
    wind_new: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=YOUR_OPENWEATHERMAP_API_KEY',
  };

  return (
    <div className="weather-container">
      <h1>Weather Information</h1>
      <div className="search-bar">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter province name"
          className="search-input"
          list="provinces"
        />
        <datalist id="provinces">
          {provinces.map((province, index) => (
            <option key={index} value={province.nombre} />
          ))}
        </datalist>
        <button onClick={fetchWeatherData} className="search-button">Show Weather</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        showData && (
          <>
            {currentWeather && (
              <div>
                <h2>Current Weather in {location}</h2>
                <table className="weather-table">
                  <thead>
                    <tr>
                      <th>Station</th>
                      <th>Temperature (°C)</th>
                      <th>Humidity (%)</th>
                      <th>Wind (km/h)</th>
                      <th>Condition</th>
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
            {forecastData && (
              <div>
                <h2>7-Day Forecast</h2>
                <Line
                  data={{
                    labels: forecastData[0].prediccion.dia.map(day => day.fecha),
                    datasets: [
                      {
                        label: 'Temperature',
                        data: forecastData[0].prediccion.dia.map(day => day.temperatura[0] ? convertTemperature(day.temperatura[0].maxima) : null),
                        borderColor: 'rgba(75,192,192,1)',
                        backgroundColor: 'rgba(75,192,192,0.2)',
                      },
                    ],
                  }}
                />
              </div>
            )}
            <div>
              <h2>Interactive Weather Map</h2>
              <MapContainer center={mapCenter} zoom={10} style={{ height: "400px", width: "100%" }}>
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.Overlay name="Temperature">
                    <TileLayer
                      url={overlayUrls.temp_new}
                      opacity={0.6}
                    />
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Rain">
                    <TileLayer
                      url={overlayUrls.precipitations_new}
                      opacity={0.6}
                    />
                  </LayersControl.Overlay>
                  <LayersControl.Overlay name="Wind">
                    <TileLayer
                      url={overlayUrls.wind_new}
                      opacity={0.6}
                    />
                  </LayersControl.Overlay>
                </LayersControl>
              </MapContainer>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default WeatherPage;