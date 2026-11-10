import { Router } from 'express';
import { SystemConfigsController } from '../controllers/SystemConfigsController';

const router = Router();

router.get('/config', SystemConfigsController.getConfig);
router.post('/config', SystemConfigsController.updateConfig);
router.get('/logs', SystemConfigsController.getAuditLogs);

export default router;

