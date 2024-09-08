const nock = require('nock');
const axios = require('axios');
const { getWeatherData } = require('../controllers/weatherController');

describe('Weather Controller', () => {
    beforeEach(() => {
        process.env.OPENWEATHER_API_KEY = 'dummy_api_key';
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it('should return weather data for a valid country', async () => {
        const req = { body: { country: 'Brazil' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        nock('http://api.openweathermap.org')
            .get('/geo/1.0/direct')
            .query({ q: 'Brazil', limit: 1, appid: 'dummy_api_key' })
            .reply(200, [{ name: 'Brazil', lat: -14.235, lon: -51.925 }]);

        nock('https://api.openweathermap.org')
            .get('/data/2.5/weather')
            .query({ lat: -14.235, lon: -51.925, appid: 'dummy_api_key', units: 'metric' })
            .reply(200, {
                weather: [{ description: 'clear sky' }],
                main: { temp: 30, feels_like: 32, humidity: 60, pressure: 1015 }
            });

        await getWeatherData(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            location: 'Brazil',
            weather: 'clear sky',
            temperature: 30,
            feels_like: 32,
            humidity: 60,
            pressure: 1015
        });
    });

    it('should handle country not found error', async () => {
        const req = { body: { country: 'NonExistentCountry' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        nock('http://api.openweathermap.org')
            .get('/geo/1.0/direct')
            .query({ q: 'NonExistentCountry', limit: 1, appid: 'dummy_api_key' })
            .reply(200, []);

        await getWeatherData(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Country not found.' });
    });

    it('should handle API errors gracefully', async () => {
        const req = { body: { country: 'Brazil' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        nock('http://api.openweathermap.org')
            .get('/geo/1.0/direct')
            .query({ q: 'Brazil', limit: 1, appid: 'dummy_api_key' })
            .replyWithError('Something went wrong');

        await getWeatherData(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'An unexpected error occurred.' });
    });
});
