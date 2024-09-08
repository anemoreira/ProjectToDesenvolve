const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.post('/', weatherController.getWeatherData);

module.exports = router;
