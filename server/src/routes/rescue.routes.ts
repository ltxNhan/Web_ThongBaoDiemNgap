import { Router } from 'express';
import { RescueRequestsController } from '../controllers/RescueRequestsController';
import { AlertNotificationHub } from '../realtime/AlertNotificationHub';

export const createRescueRoutes = (alertHub?: AlertNotificationHub) => {
  const router = Router();

  router.get('/', RescueRequestsController.getAll);
  router.post('/', RescueRequestsController.submit);
  router.post('/:id/dispatch', (req, res) => {
    RescueRequestsController.dispatch(req, res);
    if (alertHub) {
      alertHub.notifyRescueTeam(req.body.unitName, req.body);
    }
  });

  return router;
};

export default createRescueRoutes;

