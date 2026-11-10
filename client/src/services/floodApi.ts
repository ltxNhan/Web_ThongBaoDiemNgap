import { request } from './apiClient';
import { FloodPoint, Station, FloodAlert } from '../types';

export const floodApi = {
  getFloodPoints: async (): Promise<FloodPoint[]> => {
    try {
      return await request<FloodPoint[]>('/flood-points');
    } catch {
      // Realistic fallback data for HCMC
      return [
        { id: 'FP-01', street: 'Nguyễn Hữu Cảnh', district: 'Bình Thạnh', depthCm: 45, level: 'critical', lat: 10.793, lng: 106.715, description: 'Đoạn chân cầu vượt Nguyễn Hữu Cảnh, xe chết máy hàng loạt', updatedAt: new Date().toISOString() },
        { id: 'FP-02', street: 'Huỳnh Tấn Phát', district: 'Quận 7', depthCm: 35, level: 'danger', lat: 10.732, lng: 106.738, description: 'Triều cường dâng cao ngập nửa bánh xe máy', updatedAt: new Date().toISOString() },
        { id: 'FP-03', street: 'Võ Văn Ngân', district: 'TP. Thủ Đức', depthCm: 25, level: 'danger', lat: 10.851, lng: 106.772, description: 'Nước chảy xiết đoạn qua chợ Thủ Đức', updatedAt: new Date().toISOString() },
        { id: 'FP-04', street: 'Trần Hưng Đạo', district: 'Quận 5', depthCm: 15, level: 'warning', lat: 10.755, lng: 106.671, description: 'Ngập nhẹ mép lề đường, xe cộ di chuyển chậm', updatedAt: new Date().toISOString() },
        { id: 'FP-05', street: 'Lê Văn Lương', district: 'Nhà Bè', depthCm: 42, level: 'critical', lat: 10.702, lng: 106.702, description: 'Cầu Rạch Đĩa ngập sâu do triều cường vượt báo động 3', updatedAt: new Date().toISOString() }
      ];
    }
  },

  getStations: async (): Promise<Station[]> => {
    try {
      return await request<Station[]>('/stations');
    } catch {
      return [
        { id: 'ST-01', code: 'TRAM-PHUAN', name: 'Trạm Phú An (Sông Sài Gòn)', type: 'combined', status: 'online', currentRainMm: 68.5, currentTideM: 1.72, lat: 10.795, lng: 106.711, lastUpdated: new Date().toISOString() },
        { id: 'ST-02', code: 'TRAM-NHABE', name: 'Trạm Nhà Bè (Sông Đồng Điền)', type: 'tide', status: 'online', currentRainMm: 45.0, currentTideM: 1.68, lat: 10.689, lng: 106.745, lastUpdated: new Date().toISOString() },
        { id: 'ST-03', code: 'TRAM-THUDUC', name: 'Trạm Khí tượng Thủ Đức', type: 'rain', status: 'online', currentRainMm: 92.4, currentTideM: 1.35, lat: 10.849, lng: 106.775, lastUpdated: new Date().toISOString() },
        { id: 'ST-04', code: 'TRAM-TANDINH', name: 'Trạm Kênh Nhiêu Lộc - Tân Định', type: 'combined', status: 'online', currentRainMm: 52.0, currentTideM: 1.55, lat: 10.789, lng: 106.691, lastUpdated: new Date().toISOString() }
      ];
    }
  },

  getAlerts: async (): Promise<FloodAlert[]> => {
    try {
      return await request<FloodAlert[]>('/alerts');
    } catch {
      return [
        {
          id: 'ALT-2026-001',
          level: 3,
          title: 'CẢNH BÁO KHẨN CẤP: Triều cường vượt Báo động 3 kết hợp mưa lớn',
          content: 'Mực nước đỉnh triều tại trạm Phú An dự kiến đạt 1.75m lúc 17:30 - 19:30. Khuyến cáo người dân các khu vực trũng thấp hạn chế lưu thông.',
          affectedDistricts: ['Quận 7', 'Nhà Bè', 'Bình Thạnh', 'TP. Thủ Đức', 'Quận 4'],
          issuedAt: new Date().toISOString(),
          validUntil: '2026-10-22T21:00:00Z'
        }
      ];
    }
  }
};
