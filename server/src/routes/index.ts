import { Router } from 'express';
import authRoutes from './auth.routes';
import districtRoutes from './district.routes';
import createFloodPointRoutes from './floodPoint.routes';
import createReportRoutes from './report.routes';
import forecastRoutes from './forecast.routes';
import createAlertRoutes from './alert.routes';
import createRescueRoutes from './rescue.routes';
import communityRoutes from './community.routes';
import createAdminRoutes from './admin.routes';
import routingRoutes from './routing.routes';
import stationRoutes from './station.routes';
import { FloodHub } from '../realtime/FloodHub';
import { AlertNotificationHub } from '../realtime/AlertNotificationHub';

export interface ApiRouterOptions {
  floodHub?: FloodHub;
  alertHub?: AlertNotificationHub;
  io?: any;
}

export const createApiRouter = (options: ApiRouterOptions = {}) => {
  const router = Router();
  const { floodHub, alertHub, io } = options;

  // 1. Auth API
  router.use('/auth', authRoutes);

  // 2. Districts & Spatial Zones API
  router.use('/districts', districtRoutes);

  // 2.1 Stations IoT Monitoring API
  router.use('/stations', stationRoutes);

  // 3. Flood Points API (Bản đồ chung các điểm ngập - cập nhật từ tin báo người dân)
  router.use('/flood-points', createFloodPointRoutes(floodHub));

  // 4. Citizen Reports API (Hỗ trợ /reports và /citizen-reports)
  const reportRouter = createReportRoutes(floodHub);
  router.use('/citizen-reports', reportRouter);
  router.use('/reports', reportRouter);

  // 5. Forecasts API
  router.use('/forecasts', forecastRoutes);

  // 6. Alerts API
  router.use('/alerts', createAlertRoutes(alertHub));

  // 7. Rescue Requests API (Kênh tiếp nhận SOS cứu nạn 114)
  router.use('/rescue-requests', createRescueRoutes(alertHub));

  // 8. Community Posts API (Diễn đàn chia sẻ cộng đồng)
  router.use('/community', communityRoutes);

  // 9. Routing API - Tìm đường ngắn nhất né các điểm ngập qua OpenRouteService
  router.use('/routing', routingRoutes);

  // 10. Admin Module API (Kiểm duyệt tin báo & Quản trị)
  router.use('/admin', createAdminRoutes({ floodHub, alertHub }));

  // 11. Health Check API
  router.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptimeSeconds: process.uptime(),
      realtimeConnections: io?.engine?.clientsCount ?? 0
    });
  });

  return router;
};

export default createApiRouter;
