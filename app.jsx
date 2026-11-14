import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [position, setPosition] = useState([48.8566, 2.3522]); // Paris par défaut
  const [city, setCity] = useState(""); 
  const API_KEY = ""; // Remplace par ta clé OpenWeatherMap

  function LocationMarker() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        fetchWeather(lat, lng);
      },
    });
    return <Marker position={position} />;
  }

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
      );
      const data = await res.json();
      if (data.cod === 200) setWeather(data);
      else setWeather(null);
    } catch (err) {
      console.error(err);
      setWeather(null);
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
      } else setWeather(null);
    } catch (err) {
      console.error(err);
      setWeather(null);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        fetchWeather(latitude, longitude);
      },
      (err) => {
        alert("Impossible de récupérer votre position");
        console.error(err);
      }
    );
  };

  return (
    <div className="app-container">
      {/* Sidebar gauche */}
      <div className="sidebar">
        <h1>Météo Interactive</h1>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Entrez une ville..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Rechercher</button>
        </form>

        <button className="current-location-btn" onClick={handleCurrentLocation}>
          🌍 Ma position
        </button>

        {weather && (
          <div className="weather-info">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>🌡 Température : {weather.main.temp} °C</p>
            <p>🌤 Conditions : {weather.weather[0].description}</p>
            <p>💧 Humidité : {weather.main.humidity} %</p>
            <p>💨 Vent : {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>

      {/* Carte à droite */}
      <div className="map-container">
        <MapContainer center={position} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <LocationMarker />
        </MapContainer>
      </div>
    </div>
  );
}

export default App;
