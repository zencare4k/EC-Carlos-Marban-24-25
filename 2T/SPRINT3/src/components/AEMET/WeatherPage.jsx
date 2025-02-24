import React, { useState, useEffect } from 'react';
import apiClient from '../../services/apiClient';
import '../../styles/weather.css'; // Estilos personalizados para la interfaz
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import TemperatureToggleButton from '../Shared/TemperatureToggleButton';
import ThemeToggleButton from '../Shared/ThemeToggleButton';

// Registrar las escalas necesarias en Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [forecastData, setForecastData] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [currentPrediction, setCurrentPrediction] = useState([]);
  const [location, setLocation] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 40.4168, lng: -3.7038 }); // Madrid como posición inicial
  const [markerPosition, setMarkerPosition] = useState(null); // Posición del marcador
  const [temperatureUnit, setTemperatureUnit] = useState('C'); // Unidad de temperatura (C o F)
  const [theme, setTheme] = useState('light'); // Tema (light o dark)
  const [selectedArea, setSelectedArea] = useState(null); // Área seleccionada
  const [municipioPolygon, setMunicipioPolygon] = useState([]); // Polígono del municipio

  const defaultIconUrl = '../../assets/icons/unknown.'; // Reemplaza con la URL de tu icono predeterminado
  const getCurrentTimePeriod = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 20 || currentHour < 8) {
      return '20';
    } else if (currentHour >= 8 && currentHour < 14) {
      return '08';
    } else {
      return '14';
    }
  };
  // Function to normalize strings (remove accents)
  const normalizeString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

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
      const normalizedLocation = normalizeString(location.toLowerCase());
      const province = provinces.find(p => normalizeString(p.nombre.toLowerCase()) === normalizedLocation);
      if (!province) {
        throw new Error('Provincia no encontrada');
      }

      const weather = await apiClient.getCurrentWeatherByProvince(province.codigo);
      const forecast = await apiClient.getDailyForecast(province.codigo);
      const todayForecast = await apiClient.getTodayForecast(province.codigo);

      setCurrentWeather(weather);
      setForecastData(forecast);
      setTodayForecast(todayForecast);
      setCurrentPrediction(todayForecast.estadoCielo);
      setSelectedProvince(province);

      // Establecer coordenadas de la provincia y posición del marcador
      setMapCenter({ lat: province.latitud, lng: province.longitud });
      setMarkerPosition({ lat: province.latitud, lng: province.longitud });

      // Log the selected province to the console
      console.log(`Provincia seleccionada: ${province.nombre}`);
    } catch (err) {
      setError('Error al obtener los datos meteorológicos');
      setCurrentWeather([]);
      setForecastData(null);
      setTodayForecast([]);
      setCurrentPrediction([]);
    } finally {
      setLoading(false);
    }
  };

  // Convertir temperatura a la unidad seleccionada
  const convertTemperature = (tempC) => {
    return temperatureUnit === 'C' ? tempC : (tempC * 9/5) + 32;
  };

  // Cambiar unidad de temperatura
  const toggleTemperatureUnit = () => {
    setTemperatureUnit(temperatureUnit === 'C' ? 'F' : 'C');
  };

  // Cambiar tema
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Obtener la URL de la imagen del estado del cielo
  const getSkyStatusImageUrl = (skyCode) => {
    const code = String(skyCode).padStart(2, '0'); // Ensure the code has two digits
    return code === '11' ? '/assets/icons/11.png' : `/assets/icons/${code}.png` || defaultIconUrl;
  };

  // Obtener el clima en un momento específico del día
  const getWeatherAtTime = (day, time) => {
    if (!day.estadoCielo || !day.estadoCielo.length) {
      return '';
    }
    const skyStatusAtTime = day.estadoCielo.find(h => h.periodo === time);
    return skyStatusAtTime ? skyStatusAtTime.descripcion : '';
  };

  // Datos para el gráfico de línea
  const lineChartData = forecastData ? {
    labels: forecastData.prediccion.dia.map(day => day.fecha),
    datasets: [
      {
        label: `Temperatura Máxima (°${temperatureUnit})`,
        data: forecastData.prediccion.dia.map(day => convertTemperature(day.temperatura.maxima)),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
      {
        label: `Temperatura Mínima (°${temperatureUnit})`,
        data: forecastData.prediccion.dia.map(day => convertTemperature(day.temperatura.minima)),
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
      },
    ],
  } : null;

  const getWindDirectionAngle = (direction) => {
    const directions = {
      'N': 0,
      'NE': 45,
      'E': 90,
      'SE': 135,
      'S': 180,
      'SW': 225,
      'W': 270,
      'NW': 315,
    };
    return directions[direction.toUpperCase()] || 0;
  };

  // Obtener estaciones meteorológicas cercanas
  const fetchNearbyStations = async (lat, lon) => {
    try {
      const stations = await apiClient.getNearbyWeatherStations(lat, lon);
      setCurrentWeather(stations);
    } catch (error) {
      setError('Error al obtener las estaciones meteorológicas cercanas');
    }
  };

  // Obtener polígono del municipio
  const fetchMunicipioPolygon = async (municipioCode) => {
    try {
      const response = await apiClient.getMunicipioPolygon(municipioCode);
      setMunicipioPolygon(response);
    } catch (error) {
      setError('Error al obtener el polígono del municipio');
    }
  };

  // Manejar clic en el mapa
  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setMapCenter({ lat, lng });
    setMarkerPosition({ lat, lng });
    setSelectedArea({ lat, lng });

    try {
      const municipios = await apiClient.getMunicipiosByLatLon(lat, lng);
      if (municipios.length > 0) {
        const municipio = municipios[0];
        setLocation(municipio.nombre);
        fetchNearbyStations(lat, lng);
        fetchMunicipioPolygon(municipio.id);
      } else {
        setError('No se encontraron municipios cercanos');
      }
    } catch (error) {
      setError('Error al obtener los municipios cercanos');
    }
  };

  return (
    <div className={`weather-page ${theme}`}>
      <h1>Consulta del Clima en España</h1>

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

      <div className="toggle-buttons">
        <TemperatureToggleButton toggleTemperatureUnit={toggleTemperatureUnit} />
        <ThemeToggleButton toggleTheme={toggleTheme} />
      </div>

      {loading && (
        <div className="loading-container">
          <img src="../../assets/images/LoadingScreen.gif" alt="Cargando..." className="loading-gif" />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {forecastData && (
        <div className="forecast-section">
          <h2>Predicción para las próximas 72 horas en {selectedProvince?.nombre}</h2>
          <table className="forecast-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>08:00</th>
                <th>14:00</th>
                <th>20:00</th>
                <th>Temperatura Máxima (°{temperatureUnit})</th>
                <th>Temperatura Mínima (°{temperatureUnit})</th>
                <th>Humedad (%)</th>
                <th>Viento (km/h)</th>
              </tr>
            </thead>
            <tbody>
              {forecastData.prediccion.dia.slice(0, 3).map((day, index) => (
                <tr key={index}>
                  <td>{day.fecha}</td>
                  <td>
                    <img
                      src={getSkyStatusImageUrl(day.estadoCielo[0]?.value) || defaultIconUrl}
                      alt={day.estadoCielo[0]?.descripcion || 'Desconocido'}
                      className="weather-icon"
                    />
                    {getWeatherAtTime(day, '08')}
                  </td>
                  <td>
                    <img
                      src={getSkyStatusImageUrl(day.estadoCielo[1]?.value) || defaultIconUrl}
                      alt={day.estadoCielo[1]?.descripcion || 'Desconocido'}
                      className="weather-icon"
                    />
                    {getWeatherAtTime(day, '14')}
                  </td>
                  <td>
                    <img
                      src={getSkyStatusImageUrl(day.estadoCielo[2]?.value) || defaultIconUrl}
                      alt={day.estadoCielo[2]?.descripcion || 'Desconocido'}
                      className="weather-icon"
                    />
                    {getWeatherAtTime(day, '20')}
                  </td>
                  <td>{convertTemperature(day.temperatura.maxima) || ''}</td>
                  <td>{convertTemperature(day.temperatura.minima) || ''}</td>
                  <td>{day.humedadRelativa.maxima || ''}</td>
                  <td>
                    {day.viento[0]?.velocidad || ''}
                    {day.viento[0]?.direccion && (
                      <span
                        className="wind-direction-arrow"
                        style={{ transform: `rotate(${getWindDirectionAngle(day.viento[0].direccion[0])}deg)` }}
                      >
                        ➤
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Datos del clima actual */}
          {currentWeather.length > 0 && (
            <div className="current-weather-section">
              <table className="weather-table">
                <thead>
                  <tr>
                    <th>Estación</th>
                    <th>Temperatura (°{temperatureUnit})</th>
                    <th>Humedad (%)</th>
                    <th>Viento (km/h)</th>
                    <th>Condición</th>
                  </tr>
                </thead>
                <tbody>
                  {currentWeather.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td>{convertTemperature(item.temperatura)}</td>
                      <td>{item.humedad}</td>
                      <td>
                        {item.viento}
                        {item.direccion && (
                          <span
                            className="wind-direction-arrow"
                            style={{ transform: `rotate(${getWindDirectionAngle(item.direccion[0])}deg)` }}
                          >
                            ➤
                          </span>
                        )}
                      </td>
                      <td>
                        <img
                          src={getSkyStatusImageUrl(item.estadoCielo) || defaultIconUrl}
                          alt={item.estadoCielo || 'Desconocido'}
                          className="weather-icon"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Gráfico de línea */}
          <div className="line-chart">
            <Line data={lineChartData} />
          </div>
        </div>
      )}

      {/* Predicción actual */}
      {currentPrediction && currentPrediction.length > 0 && (
        <div className="actual-forecast">
          <h2>Predicción actual en {selectedProvince?.nombre}</h2>
          <div className="forecast-container">
            {currentPrediction.slice(0, 6).map((item, index) => (
              <div key={index} className="forecast-item">
                <p className="forecast-hour">{item.periodo}:00</p>
                <img
                  src={getSkyStatusImageUrl(item.value) || defaultIconUrl}
                  alt={item.descripcion || 'Desconocido'}
                  className="weather-icon"
                />
                <p className="forecast-temp">{convertTemperature(todayForecast.temperatura.find(t => t.periodo === item.periodo)?.value)}°{temperatureUnit}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Predicción de hoy */}
      {todayForecast && todayForecast.length > 0 && (
        <div className="today-forecast-section">
          <h2>Predicción para hoy en {selectedProvince?.nombre}</h2>
          <table className="today-forecast-table">
            <thead>
              <tr>
                <th>Hora</th>
                <th>Temperatura (°{temperatureUnit})</th>
                <th>Humedad (%)</th>
                <th>Viento (km/h)</th>
                <th>Condición</th>
              </tr>
            </thead>
            <tbody>
              {todayForecast.temperatura.map((item, index) => (
                <tr key={index}>
                  <td>{item.periodo}:00</td>
                  <td>{convertTemperature(item.value)}</td>
                  <td>{todayForecast.humedadRelativa.find(h => h.periodo === item.periodo)?.value}</td>
                  <td>
                    {todayForecast.vientoAndRachaMax.find(v => v.periodo === item.periodo)?.velocidad[0]}
                    {todayForecast.vientoAndRachaMax.find(v => v.periodo === item.periodo)?.direccion && (
                      <span
                        className="wind-direction-arrow"
                        style={{ transform: `rotate(${getWindDirectionAngle(todayForecast.vientoAndRachaMax.find(v => v.periodo === item.periodo)?.direccion[0])}deg)` }}
                      >
                        ➤
                      </span>
                    )}
                  </td>
                  <td>
                    <img
                      src={getSkyStatusImageUrl(todayForecast.estadoCielo.find(e => e.periodo === item.periodo)?.value) || defaultIconUrl}
                      alt={todayForecast.estadoCielo.find(e => e.periodo === item.periodo)?.descripcion || 'Desconocido'}
                      className="weather-icon"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mapa interactivo */}
      <MapContainer center={mapCenter} zoom={8} style={{ height: '400px', width: '100%' }} key={JSON.stringify(mapCenter)} onClick={handleMapClick}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>{selectedProvince?.nombre}</Popup>
          </Marker>
        )}
        {selectedArea && (
          <Circle center={selectedArea} radius={10000} color="blue" />
        )}
        {municipioPolygon.length > 0 && (
          <Polygon positions={municipioPolygon} color="red" />
        )}
        {currentWeather.map((station, index) => (
          <Marker key={index} position={[station.latitud, station.longitud]}>
            <Popup>
              <div>
                <h3>{station.nombre}</h3>
                <p>Temperatura: {convertTemperature(station.temperatura)}°{temperatureUnit}</p>
                <p>Humedad: {station.humedad}%</p>
                <p>Viento: {station.viento} km/h</p>
                <img
                  src={getSkyStatusImageUrl(station.estadoCielo) || defaultIconUrl}
                  alt={station.estadoCielo || 'Desconocido'}
                  className="weather-icon"
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WeatherPage;