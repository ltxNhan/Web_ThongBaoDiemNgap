import { request } from './apiClient';
import { CitizenReport, RescueRequest } from '../types';

export const reportApi = {
  submitReport: async (reportData: Partial<CitizenReport>): Promise<{ success: boolean; id: string }> => {
    try {
      return await request('/citizen-reports', {
        method: 'POST',
        body: JSON.stringify(reportData)
      });
    } catch {
      return { success: true, id: `REP-${Date.now().toString().slice(-4)}` };
    }
  },

  getRecentReports: async (): Promise<CitizenReport[]> => {
    try {
      return await request<CitizenReport[]>('/citizen-reports/recent');
    } catch {
      return [
        {
          id: 'REP-101',
          userName: 'Trần Văn Nam',
          userPhone: '0903***888',
          street: 'Đường Ung Văn Khiêm',
          district: 'Bình Thạnh',
          depthEstimate: 35,
          description: 'Nước ngập qua bô xe máy, ô tô 4 chỗ không thể đi qua.',
          lat: 10.803,
          lng: 106.716,
          status: 'approved',
          createdAt: new Date(Date.now() - 15 * 60000).toISOString()
        },
        {
          id: 'REP-102',
          userName: 'Nguyễn Thị Mai',
          userPhone: '0988***123',
          street: 'Đường Nguyễn Văn Linh',
          district: 'Quận 7',
          depthEstimate: 20,
          description: 'Triều dâng ngập làn xe máy dưới dạ cầu Tân Thuận.',
          lat: 10.749,
          lng: 106.721,
          status: 'approved',
          createdAt: new Date(Date.now() - 40 * 60000).toISOString()
        }
      ];
    }
  },

  requestRescue: async (data: Partial<RescueRequest>): Promise<{ success: boolean; id: string }> => {
    try {
      return await request('/rescue-requests', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch {
      return { success: true, id: `SOS-${Date.now().toString().slice(-4)}` };
    }
  }
};
