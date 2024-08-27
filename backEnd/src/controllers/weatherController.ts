// backend/src/controllers/weatherController.ts
import { Request, Response } from 'express';
import axios from 'axios';

interface GeoLocation {
    name: string;
    lat: number;
    lon: number;
}

interface WeatherResponse {
    weather: Array<{ description: string }>;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
    };
}

export const getWeather = async (req: Request, res: Response): Promise<void> => {
    const { country }: { country: string } = req.body;
    console.log('Received country:', country);

    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`;

    try {
        const geoResponse = await axios.get<GeoLocation[]>(geoUrl);
        console.log('Geocoding API response:', geoResponse.data);

        if (geoResponse.data.length === 0) {
            res.status(404).json({ error: 'Country not found.' });
            return;
        }

        const location = geoResponse.data[0];
        const { lat: latitude, lon: longitude } = location;

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

        const weatherResponse = await axios.get<WeatherResponse>(weatherUrl);
        console.log('Weather API response:', weatherResponse.data);

        const weatherData = {
            location: location.name,
            weather: weatherResponse.data.weather[0].description,
            temperature: weatherResponse.data.main.temp,
            feels_like: weatherResponse.data.main.feels_like,
            humidity: weatherResponse.data.main.humidity,
            pressure: weatherResponse.data.main.pressure,
        };

        res.status(200).json(weatherData);

    } catch (error: any) {
        console.error('Error fetching data:', error);
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data.message || 'An error occurred while fetching data.' });
        } else {
            res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
};
