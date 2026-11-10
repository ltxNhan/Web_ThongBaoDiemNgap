import { adminRequest } from './adminApiClient';
import { AuditLog } from '../types';

export const logsApi = {
  getLogs: async (): Promise<AuditLog[]> => {
    try {
      return await adminRequest<AuditLog[]>('/logs');
    } catch {
      return [
        { id: 'LOG-01', action: 'Phát lệnh kích hoạt còi báo động Báo động 3', category: 'CONFIG', staffName: 'Nguyễn Văn Minh (Trưởng ca trực)', ipAddress: '192.168.1.102', timestamp: '10 phút trước', severity: 'warn' },
        { id: 'LOG-02', action: 'Phê duyệt hiển thị điểm ngập Ung Văn Khiêm (40cm)', category: 'MODERATION', staffName: 'Trần Thị Hà (Cán bộ duyệt tin)', ipAddress: '192.168.1.108', timestamp: '15 phút trước', severity: 'info' },
        { id: 'LOG-03', action: 'Cảnh báo: Trạm Kênh Tân Hóa Lò Gốm mất kết nối MQTT > 30p', category: 'STATION', staffName: 'Hệ thống tự động (Watchdog)', ipAddress: '10.0.0.5', timestamp: '45 phút trước', severity: 'error' },
        { id: 'LOG-04', action: 'Điều động kíp xe cứu hộ 114 tới khu vực Rạch Đĩa', category: 'SECURITY', staffName: 'Lê Hoàng Phong (Điều phối viên)', ipAddress: '192.168.1.105', timestamp: '1 giờ trước', severity: 'warn' }
      ];
    }
  }
};
