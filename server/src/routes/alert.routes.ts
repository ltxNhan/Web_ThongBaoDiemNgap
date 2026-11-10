import { Router } from 'express';
import { AlertsController } from '../controllers/AlertsController';
import { AlertNotificationHub } from '../realtime/AlertNotificationHub';

export const createAlertRoutes = (alertHub?: AlertNotificationHub) => {
  const router = Router();

  router.get('/', AlertsController.getActiveAlerts);
  router.post('/', (req, res) => {
    AlertsController.publishAlert(req, res);
    if (alertHub) {
      alertHub.broadcastEmergencyAlert(req.body);
    }
  });

  return router;
};

export default createAlertRoutes;

