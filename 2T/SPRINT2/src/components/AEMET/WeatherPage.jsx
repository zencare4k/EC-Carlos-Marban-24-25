import React, { useState, useEffect } from 'react';
import { getCurrentWeatherByProvince, getDailyForecast, getAirQualityIndex, getProvinces } from '../../services/apiClient';
import '../../styles/weather.css'; // Asegúrate de crear un archivo CSS para los estilos del tiempo

const provinces = [
  { nombre: 'Almería', codigo: '01' },
  { nombre: 'Cádiz', codigo: '11' },
  { nombre: 'Córdoba', codigo: '14' },
  { nombre: 'Granada', codigo: '18' },
  { nombre: 'Huelva', codigo: '21' },
  { nombre: 'Jaén', codigo: '23' },
  { nombre: 'Málaga', codigo: '29' },
  { nombre: 'Sevilla', codigo: '41' },
  { nombre: 'Madrid', codigo: '28' },
  // Agrega todas las provincias necesarias
];

const WeatherPage = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityIndex, setAirQualityIndex] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const province = provinces.find(p => p.nombre.toLowerCase() === location.toLowerCase());
      if (!province) {
        throw new Error('Province not found');
      }
      const municipioCode = province.codigo;
      const weatherData = await getCurrentWeatherByProvince(municipioCode);
      const forecastData = await getDailyForecast(municipioCode);
      const airQualityData = await getAirQualityIndex(municipioCode);
      setCurrentWeather(weatherData);
      setForecastData(forecastData);
      setAirQualityIndex(airQualityData);
      setError(null);
    } catch (err) {
      setError('Error fetching weather data');
      setCurrentWeather(null);
      setForecastData(null);
      setAirQualityIndex(null);
    }
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
      {error ? (
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
              <table className="weather-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Condition</th>
                    <th>Temperature (°C)</th>
                    <th>Rain (mm)</th>
                    <th>Snow (cm)</th>
                    <th>Wind (km/h)</th>
                    <th>Sunrise</th>
                    <th>Sunset</th>
                  </tr>
                </thead>
                <tbody>
                  {forecastData[0].prediccion.dia.map((day, index) => (
                    <React.Fragment key={index}>
                      {['08:00', '14:00', '20:00'].map((time, idx) => (
                        <tr key={idx}>
                          {idx === 0 && <td rowSpan="3">{day.fecha}</td>}
                          <td>{time}</td>
                          <td>
                            <img src={`/assets/icons/${day.estadoCielo[idx].descripcion}.svg`} alt={day.estadoCielo[idx].descripcion} className="weather-icon" />
                            {day.estadoCielo[idx].descripcion}
                          </td>
                          <td>{day.temperatura[idx]}</td>
                          <td>{day.precipitacion[idx]}</td>
                          <td>{day.nieve[idx]}</td>
                          <td>{day.viento[idx].velocidad}</td>
                          {idx === 0 && <td rowSpan="3">{day.orto}</td>}
                          {idx === 0 && <td rowSpan="3">{day.ocaso}</td>}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {airQualityIndex && (
            <div>
              <h2>Air Quality Index</h2>
              <table className="weather-table">
                <thead>
                  <tr>
                    <th>Station</th>
                    <th>Index</th>
                    <th>Pollutants</th>
                  </tr>
                </thead>
                <tbody>
                  {airQualityIndex.map((item, index) => (
                    <tr key={index}>
                      <td>{item.station}</td>
                      <td>{item.index}</td>
                      <td>{item.pollutants.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherPage;