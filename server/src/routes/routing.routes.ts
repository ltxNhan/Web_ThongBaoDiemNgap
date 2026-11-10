import { Router } from 'express';
import { RoutingController } from '../controllers/RoutingController';

const router = Router();

// Hỗ trợ cả POST / và POST /safe-route
router.post('/', RoutingController.getSafeRoute);
router.post('/safe-route', RoutingController.getSafeRoute);

export default router;

