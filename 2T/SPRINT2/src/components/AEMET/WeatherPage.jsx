import React, { useState } from 'react';
import { getCurrentWeatherByProvince, getDailyForecast } from '../../services/apiClient';
import '../../styles/weather.css';
import 'leaflet/dist/leaflet.css';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, LayerGroup } from 'react-leaflet';
import { LoadingIcon } from '../Shared/LoadingIcon';

const municipios = [
  { nombre: 'Madrid', codigo: '28079' },
  { nombre: 'Sevilla', codigo: '41091' },
  // Agrega todos los municipios necesarios
];

const WeatherPage = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState('C'); // °C or °F
  const [theme, setTheme] = useState('light'); // light or dark

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const municipio = municipios.find(m => m.nombre.toLowerCase() === location.toLowerCase());
      if (!municipio) {
        throw new Error('Municipio not found');
      }
      const municipioCode = municipio.codigo;
      const weatherDataUrl = await getCurrentWeatherByProvince(municipioCode);
      const forecastDataUrl = await getDailyForecast(municipioCode);

      const weatherDataResponse = await fetch(weatherDataUrl);
      const weatherData = await weatherDataResponse.json();

      const forecastDataResponse = await fetch(forecastDataUrl);
      const forecastData = await forecastDataResponse.json();

      setCurrentWeather(weatherData);
      setForecastData(forecastData);
      setError(null);
    } catch (err) {
      setError('Error fetching weather data');
      setCurrentWeather(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const convertTemperature = (temp) => {
    return unit === 'C' ? temp : (temp * 9/5) + 32;
  };

  return (
    <div className={`weather-container ${theme}`}>
      <h1>Weather Information</h1>
      <div className="search-bar">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter municipality name"
          className="search-input"
          list="municipios"
        />
        <datalist id="municipios">
          {municipios.map((municipio, index) => (
            <option key={index} value={municipio.nombre} />
          ))}
        </datalist>
        <button onClick={fetchWeatherData} className="search-button">Show Weather</button>
      </div>
      <div className="controls">
        <button onClick={toggleUnit}>Toggle °C/°F</button>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      {loading ? (
        <LoadingIcon />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          {currentWeather && (
            <div>
              <h2>Current Weather in {location}</h2>
              <table className="weather-table">
                <thead>
                  <tr>
                    <th>Station</th>
                    <th>Temperature ({unit})</th>
                    <th>Humidity (%)</th>
                    <th>Wind (km/h)</th>
                    <th>Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {currentWeather.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td>{convertTemperature(item.temperatura)}</td>
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
                      data: forecastData[0].prediccion.dia.map(day => convertTemperature(day.temperatura[0].maxima)),
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
            <MapContainer center={[37.7749, -122.4194]} zoom={10} style={{ height: "400px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LayerGroup>
                {/* Add layers for temperature, rain, wind, etc. */}
              </LayerGroup>
            </MapContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherPage;