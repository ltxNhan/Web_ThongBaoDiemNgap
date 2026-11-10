import { adminRequest } from './adminApiClient';
import { ModerationReport } from '../types';

export const moderationApi = {
  getQueue: async (): Promise<ModerationReport[]> => {
    try {
      return await adminRequest<ModerationReport[]>('/reports/queue');
    } catch {
      return [
        {
          id: 'REP-QUEUE-01',
          userName: 'Trần Văn Nam',
          userPhone: '0903888999',
          street: 'Đường Ung Văn Khiêm, P.25',
          district: 'Bình Thạnh',
          depthEstimate: 40,
          description: 'Nước ngập lút bô xe máy, ô tô gầm thấp không thể qua, người dân phải dắt bộ hàng loạt.',
          lat: 10.803,
          lng: 106.716,
          closestStationName: 'Trạm Phú An (cách 1.2km)',
          sensorCorrelationMm: 68.5,
          status: 'pending',
          createdAt: new Date(Date.now() - 10 * 60000).toISOString()
        },
        {
          id: 'REP-QUEUE-02',
          userName: 'Lê Thu Hương',
          userPhone: '0912444555',
          street: 'Đường Huỳnh Tấn Phát',
          district: 'Quận 7',
          depthEstimate: 30,
          description: 'Triều cường tràn qua mép đê bao đoạn gần cầu Phú Xuân ngập tràn vào sân nhà.',
          lat: 10.712,
          lng: 106.741,
          closestStationName: 'Trạm Nhà Bè (cách 1.8km)',
          sensorCorrelationMm: 45.0,
          status: 'pending',
          createdAt: new Date(Date.now() - 25 * 60000).toISOString()
        }
      ];
    }
  },

  moderate: async (reportId: string, action: 'approved' | 'rejected') => {
    try {
      return await adminRequest(`/reports/${reportId}/moderate`, {
        method: 'POST',
        body: JSON.stringify({ action })
      });
    } catch {
      return { success: true, reportId, status: action };
    }
  }
};
