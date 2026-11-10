import { Router } from 'express';
import { citizenReportsController } from '../controllers/CitizenReportsController';
import { citizenReportService } from '../services/CitizenReportService';
import { floodPointService } from '../services/FloodPointService';
import { AlertsController } from '../controllers/AlertsController';
import { RescueRequestsController } from '../controllers/RescueRequestsController';
import { SystemConfigsController } from '../controllers/SystemConfigsController';
import { StationsController } from '../controllers/StationsController';
import { AuditLogService } from '../services/AuditLogService';

/**
 * admin.routes
 * ─────────────────────────────────────────────
 * Nhóm tuyến đường bảo mật dành cho Quản trị viên.
 * Route chỉ orchestrate (gọi Service/Controller) + broadcast realtime.
 * Logic kiểm duyệt, tạo điểm ngập đã được đưa sang Service.
 */

export interface AdminRoutesHubs {
  floodHub?: import('../realtime/FloodHub').FloodHub;
  alertHub?: import('../realtime/AlertNotificationHub').AlertNotificationHub;
}

export const createAdminRoutes = ({ floodHub, alertHub }: AdminRoutesHubs = {}) => {
  const router = Router();

  // ── Reports Moderation Queue ──────────────────────────────────────────
  router.get('/reports/queue', async (req, res) => { await citizenReportsController.getQueue(req, res); });

  router.post('/reports/:id/moderate', async (req, res) => {
    const id = String(req.params.id);
    const { action } = req.body;
    if (!action) {
      return res.status(400).json({
        success: false,
        error: 'NO_ACTION',
        message: 'Bạn chưa chọn hành động duyệt báo cáo (approved/rejected).'
      });
    }

    try {
      const updated = await citizenReportService.moderate(id, action);
      if (!updated) {
        return res.status(404).json({
          success: false,
          error: 'NOT_FOUND',
          message: 'Không tìm thấy báo cáo để duyệt.'
        });
      }

      let floodPoint = null;
      if (action === 'approved') {
        floodPoint = await floodPointService.upsertFromReport(updated);
        if (floodHub) {
          floodHub.broadcastNewFloodPoint(floodPoint);
        }
      }

      await AuditLogService.logEvent(
        `${action === 'approved' ? 'Phê duyệt hiển thị điểm ngập' : 'Từ chối tin báo ngập'} #${id} (${updated.street})`,
        'MODERATION',
        'Cán bộ Kiểm duyệt',
        req.ip || '127.0.0.1',
        action === 'approved' ? 'info' : 'warn',
        { reportId: id, action, street: updated.street }
      );

      return res.json({
        success: true,
        id,
        status: updated.status,
        floodPoint
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: 'MODERATION_ERROR',
        message: err.message || 'Lỗi trong quá trình kiểm duyệt báo cáo.'
      });
    }
  });

  // ── Stations Management ───────────────────────────────────────────────
  router.get('/stations', StationsController.getAll);
  router.post('/stations/:code/restart', StationsController.restart);

  // ── Alerts ────────────────────────────────────────────────────────────
  router.post('/alerts', (req, res) => {
    AlertsController.publishAlert(req, res);
    if (alertHub) {
      alertHub.broadcastEmergencyAlert(req.body);
    }
  });

  // ── Rescue Requests ───────────────────────────────────────────────────
  router.get('/rescue-requests', async (req, res) => { await RescueRequestsController.getAll(req, res); });

  router.post('/rescue-requests/:id/dispatch', async (req, res) => {
    await RescueRequestsController.dispatch(req, res);
    if (alertHub) {
      alertHub.notifyRescueTeam(req.body.unitName, req.body);
    }
  });

  // ── Configuration & Logs ──────────────────────────────────────────────
  router.get('/config', async (req, res) => { await SystemConfigsController.getConfig(req, res); });

  router.post('/config', async (req, res) => { await SystemConfigsController.updateConfig(req, res); });

  router.get('/logs', async (req, res) => { await SystemConfigsController.getAuditLogs(req, res); });

  return router;
};

export default createAdminRoutes;
