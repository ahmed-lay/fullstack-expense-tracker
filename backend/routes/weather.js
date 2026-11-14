const router = require('express').Router();
const { getWeather } = require('../controllers/weatherController');

router.get('/:city', getWeather);

module.exports = router;
