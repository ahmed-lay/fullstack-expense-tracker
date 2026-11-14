import { useState } from 'react';
import api from '../api/axios';

export default function SearchBar({ onWeather }) {
  const [city, setCity] = useState('');
  const search = async (e) => {
    e.preventDefault();
    const res = await api.get(`/weather/${encodeURIComponent(city)}`);
    onWeather(res.data);
    // si user connecté: POST /history
    const token = localStorage.getItem('token');
    if(token) await api.post('/history', { city }, { headers: { Authorization: `Bearer ${token}` }});
  }
  return (
    <form onSubmit={search}>
      <input value={city} onChange={e=>setCity(e.target.value)} placeholder="Nom de la ville" />
      <button>Rechercher</button>
    </form>
  );
}
