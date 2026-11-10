import { Router } from 'express';
import { floodPointsController } from '../controllers/FloodPointsController';

/**
 * floodPoint.routes
 * ─────────────────────────────────────────────
 * Ah toàn tuyến đường "điểm ngập". Route chỉ tạo Router và gán handler cho
 * controller; mọi thao tác dữ/liệu (tạo, tránh) đều chuyển sang FloodPointService.
 */

export const createFloodPointRoutes = (floodHub?: import('../realtime/FloodHub').FloodHub) => {
  const router = Router();

  router.get('/', async (req, res) => { await floodPointsController.getAll(req, res); });

  router.post('/', async (req, res) => {
    await floodPointsController.create(req, res);
    // Real-time: chiêm soát kết quả sau khi tạo (trong controller này).
    if (floodHub) {
      floodHub.broadcastNewFloodPoint(req.body);
    }
  });

  return router;
};

export default createFloodPointRoutes;
