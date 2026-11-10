import { Router } from 'express';
import { citizenReportsController } from '../controllers/CitizenReportsController';
import { citizenReportService } from '../services/CitizenReportService';
import { floodPointService } from '../services/FloodPointService';
import { FloodHub } from '../realtime/FloodHub';

/**
 * report.routes
 * ─────────────────────────────────────────────
 * Tuyến đường tiếp nhận tin báo ngập của người dân.
 * Route chỉ gán handler; business validation/classification ở CitizenReportService.
 */

export const createReportRoutes = (floodHub?: FloodHub) => {
  const router = Router();

  router.get('/recent', async (req, res) => { await citizenReportsController.getRecent(req, res); });
  router.get('/', async (req, res) => { await citizenReportsController.getRecent(req, res); });

  // Người dân gửi tin báo ngập mới
  router.post('/', async (req, res) => {
    await citizenReportsController.submit(req, res);
    // Thông báo realtime cho cán bộ kiểm duyệt khi có báo cáo mới.
    if (floodHub) {
      floodHub.broadcastNewCitizenReport(req.body);
    }
  });

  router.get('/queue', (req, res) => citizenReportsController.getQueue(req, res));

  // Phê duyệt báo cáo ngập -> Cập nhật trực tiếp lên bản đồ chung
  router.post('/:id/moderate', async (req, res) => {
    await citizenReportsController.moderate(req, res);
    const { action } = req.body;
    const id = String(req.params.id);
    if (action === 'approved') {
      const report = await citizenReportService.moderate(id, action);
      if (report) {
        const floodPoint = await floodPointService.upsertFromReport(report);
        if (floodHub) {
          floodHub.broadcastNewFloodPoint(floodPoint);
        }
      }
    }
  });

  return router;
};

export default createReportRoutes;
