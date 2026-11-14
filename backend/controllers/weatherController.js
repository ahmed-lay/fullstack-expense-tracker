const axios = require('axios');

exports.getWeather = async (req, res) => {
  const city = req.params.city;
  const API_KEY = process.env.WEATHER_KEY;
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { q: city, units: 'metric', lang: 'fr', appid: API_KEY }
    });
    res.json(response.data);
  } catch (err) {
    res.status(404).json({ message: 'Ville introuvable' });
  }
};
