import { Router } from 'express';
import { ForecastsController } from '../controllers/ForecastsController';

const router = Router();

router.get('/rain-hourly', ForecastsController.getHourlyRain);
router.get('/tide-wave', ForecastsController.getTideWave);

export default router;

