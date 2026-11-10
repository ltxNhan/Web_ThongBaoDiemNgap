import { Request, Response } from 'express';
import { AuditLogService } from '../services/AuditLogService';

let systemConfig = {
  alarmThreshold1: 1.40,
  alarmThreshold2: 1.50,
  alarmThreshold3: 1.60,
  rainAlertThreshold: 50,
  floodDepthCritical: 40,
  iotStationScanFrequencyMin: 5,
  aiModelRunFrequencyMin: 15,
  autoTelegramTrigger: true,
  autoSmsZnsTrigger: true,
  weatherApiKey: 'live_key_987654321',
  gisTileServerUrl: 'https://api.mapbox.com/v4/'
};

export class SystemConfigsController {
  public static async getConfig(req: Request, res: Response) {
    return res.json(systemConfig);
  }

  public static async updateConfig(req: Request, res: Response) {
    systemConfig = { ...systemConfig, ...req.body };
    AuditLogService.logEvent(
      'Cập nhật cấu hình ngưỡng cảnh báo hệ thống',
      'CONFIG',
      'Cán bộ Quản trị',
      req.ip || '127.0.0.1',
      'warn',
      req.body
    );
    return res.json({ success: true, config: systemConfig });
  }

  public static async getAuditLogs(req: Request, res: Response) {
    return res.json(AuditLogService.getRecentLogs());
  }
}
