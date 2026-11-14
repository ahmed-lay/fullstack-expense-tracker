import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "./App.css";

const API_KEY = "bbe4273bc1f2ee2152807c07ac3651bd"; // Remplace par ta clé OpenWeatherMap

function App() {
  const [city, setCity] = useState("");
  const [position, setPosition] = useState([36.8065, 10.1815]); // Tunis par défaut
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  // Charger météo par défaut
  useEffect(() => {
    fetchWeather(position[0], position[1]);
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        addToHistory(data.name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setPosition([data.coord.lat, data.coord.lon]);
        addToHistory(data.name);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Géolocalisation non supportée");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        fetchWeather(latitude, longitude);
      },
      (err) => alert("Impossible de récupérer votre position")
    );
  };

  const addToFavorites = () => {
    if (weather && !favorites.includes(weather.name)) {
      setFavorites([weather.name, ...favorites]);
    }
  };

  const addToHistory = (cityName) => {
    setHistory((prev) => [cityName, ...prev.filter((c) => c !== cityName)].slice(0, 5));
  };

  function LocationMarker() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        fetchWeather(lat, lng);
      },
    });
    return weather ? (
      <Marker position={position}>
        <Popup>
          <div className="popup-weather">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <h3>{Math.round(weather.main.temp)}°C</h3>
            <p>{weather.weather[0].description}</p>
          </div>
        </Popup>
      </Marker>
    ) : null;
  }

  return (
    <div className="app-container">
      {/* Barre de recherche centrée */}
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Entrez une ville..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Rechercher</button>
          <button type="button" onClick={handleCurrentLocation}>🌍 Ma position</button>
        </form>
      </div>

      {/* Carte */}
      <div className="map-wrapper">
        <MapContainer center={position} zoom={6} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <LocationMarker />
        </MapContainer>
      </div>

      {/* Sidebar droite */}
      <div className="sidebar">
        <button className="favorite-btn" onClick={addToFavorites}>⭐ Ajouter aux favoris</button>
        <div className="favorites">
          <h3>Favoris</h3>
          {favorites.map((f, idx) => (
            <p key={idx} onClick={() => setCity(f)}>{f}</p>
          ))}
        </div>
        <div className="history">
          <h3>Historique</h3>
          {history.map((h, idx) => (
            <p key={idx} onClick={() => setCity(h)}>{h}</p>
          ))}
        </div>

        {/* Infos météo détaillées */}
        {weather && (
          <div className="weather-info">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <h2>{Math.round(weather.main.temp)}°C</h2>
            <p className="desc">{weather.weather[0].description}</p>
            <div className="bottom-info">
              <p>💧 Humidité: {weather.main.humidity}%</p>
              <p>💨 Vent: {weather.wind.speed} m/s</p>
              <p>🧭 Pression: {weather.main.pressure} hPa</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
