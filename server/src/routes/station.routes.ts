import { Router } from 'express';
import { StationsController } from '../controllers/StationsController';

const router = Router();

// GET /api/stations - Danh sách toàn bộ trạm quan trắc IoT
router.get('/', StationsController.getAll);

// GET /api/stations/closest?lat=...&lng=... - Tìm trạm quan trắc gần nhất phục vụ đối soát cảm biến
router.get('/closest', StationsController.getClosest);

// GET /api/stations/:code - Chi tiết trạm theo mã trạm
router.get('/:code', StationsController.getByCode);

// POST /api/stations/:code/restart - Lệnh điều khiển khởi động lại trạm từ xa
router.post('/:code/restart', StationsController.restart);

export default router;
