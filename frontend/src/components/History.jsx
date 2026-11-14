import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function History({ onSelectCity }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // récupérer l'historique depuis le backend
    api.get('/history')
      .then(res => setHistory(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h3>Historique</h3>
      <ul>
        {history.map(item => (
          <li key={item._id}>
            <button onClick={() => onSelectCity(item.city)}>
              {item.city}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
