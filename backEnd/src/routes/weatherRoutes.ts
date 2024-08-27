// backend/src/routes/weatherRoutes.ts
import { Router } from 'express';
import { getWeather } from '../controllers/weatherController';

const router = Router();

router.post('/weather', getWeather);

export default router;
