import { AuditLogEntity } from '../models/AuditLog.entity';

export class AuditLogService {
  private static logs: AuditLogEntity[] = [];

  public static async logEvent(
    action: string,
    category: 'AUTH' | 'STATION' | 'MODERATION' | 'CONFIG' | 'SECURITY',
    staffName: string,
    ipAddress: string,
    severity: 'info' | 'warn' | 'error' = 'info',
    details?: Record<string, any>
  ): Promise<void> {
    const entry: AuditLogEntity = {
      id: `LOG-${Date.now()}`,
      action,
      category,
      staffName,
      ipAddress,
      details,
      severity,
      createdAt: new Date()
    };

    this.logs.unshift(entry);
    console.log(`[AuditLog] [${category}] [${severity.toUpperCase()}] ${action} by ${staffName} (${ipAddress})`);
  }

  public static getRecentLogs(limit = 50): AuditLogEntity[] {
    return this.logs.slice(0, limit);
  }
}
