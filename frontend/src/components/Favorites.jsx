import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Favorites({ onSelectCity }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    api.get('/favorites')
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
  }, []);

  const removeFavorite = async (city) => {
    await api.delete(`/favorites/${city}`);
    setFavorites(favorites.filter(f => f.city !== city));
  };

  return (
    <div>
      <h3>Favoris</h3>
      <ul>
        {favorites.map(f => (
          <li key={f._id}>
            <button onClick={() => onSelectCity(f.city)}>
              {f.city}
            </button>
            <button onClick={() => removeFavorite(f.city)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
