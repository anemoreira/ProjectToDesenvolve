const axios = require('axios');

exports.getWeatherData = async (req, res) => {
    const { country } = req.body;

    // URL da API de Geocodificação
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`;

    try {
        const geoResponse = await axios.get(geoUrl);

        if (geoResponse.data.length === 0) {
            return res.status(404).json({ error: 'Country not found.' });
        }

        const location = geoResponse.data[0];
        const { lat: latitude, lon: longitude } = location;

        // URL da API do Tempo
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

        const weatherResponse = await axios.get(weatherUrl);

        const weatherData = {
            location: location.name,
            weather: weatherResponse.data.weather[0].description,
            temperature: weatherResponse.data.main.temp,
            feels_like: weatherResponse.data.main.feels_like,
            humidity: weatherResponse.data.main.humidity,
            pressure: weatherResponse.data.main.pressure,
        };

        res.status(200).json(weatherData);

    } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response) {
            return res.status(error.response.status).json({ error: error.response.data.message || 'An error occurred while fetching data.' });
        }
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
};
