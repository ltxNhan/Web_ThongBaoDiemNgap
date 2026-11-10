export interface AlertDispatchLogEntity {
  id: string;
  alertId: string;
  channel: 'SMS' | 'ZALO_ZNS' | 'TELEGRAM' | 'WEB_SOCKET';
  recipientCount: number;
  successCount: number;
  failureCount: number;
  dispatchedAt: Date;
  status: 'pending' | 'success' | 'partial' | 'failed';
}
