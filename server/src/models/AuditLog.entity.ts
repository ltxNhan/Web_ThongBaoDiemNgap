export interface AuditLogEntity {
  id: string;
  action: string;
  category: 'AUTH' | 'STATION' | 'MODERATION' | 'CONFIG' | 'SECURITY';
  staffId?: string;
  staffName: string;
  ipAddress: string;
  userAgent?: string;
  details?: Record<string, any>;
  severity: 'info' | 'warn' | 'error';
  createdAt: Date;
}
