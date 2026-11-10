import { Router } from 'express';
import { DistrictsController } from '../controllers/DistrictsController';

const router = Router();

router.get('/', DistrictsController.getDistricts);
router.get('/risk-zones', DistrictsController.getRiskZones);

export default router;

