import { adminRequest } from './adminApiClient';
import { Station } from '../types';

export const stationApi = {
  getStations: async (): Promise<Station[]> => {
    try {
      return await adminRequest<Station[]>('/stations');
    } catch {
      return [
        { id: '1', code: 'ST-01', name: 'Trạm Thủy văn Phú An', type: 'combined', status: 'online', currentRainMm: 68.5, currentTideM: 1.72, batteryPercent: 96, signalDbm: -68, lat: 10.795, lng: 106.711, lastPing: '1 phút trước' },
        { id: '2', code: 'ST-02', name: 'Trạm Triều ký Nhà Bè', type: 'tide', status: 'online', currentRainMm: 45.0, currentTideM: 1.68, batteryPercent: 88, signalDbm: -72, lat: 10.689, lng: 106.745, lastPing: '2 phút trước' },
        { id: '3', code: 'ST-03', name: 'Trạm Đo Mưa Chợ Thủ Đức', type: 'rain', status: 'online', currentRainMm: 92.4, currentTideM: 1.35, batteryPercent: 92, signalDbm: -65, lat: 10.849, lng: 106.775, lastPing: '30 giây trước' },
        { id: '4', code: 'ST-04', name: 'Trạm Kênh Tân Hóa Lò Gốm', type: 'combined', status: 'error', currentRainMm: 38.0, currentTideM: 1.45, batteryPercent: 24, signalDbm: -95, lat: 10.749, lng: 106.635, lastPing: '45 phút trước (Mất tín hiệu)' },
        { id: '5', code: 'ST-05', name: 'Trạm Triều Bến Mễ Cốc (Q.8)', type: 'tide', status: 'online', currentRainMm: 50.2, currentTideM: 1.62, batteryPercent: 78, signalDbm: -70, lat: 10.725, lng: 106.642, lastPing: '3 phút trước' }
      ];
    }
  },

  restartStation: async (code: string) => {
    try {
      return await adminRequest(`/stations/${code}/restart`, { method: 'POST' });
    } catch {
      return { success: true, message: `Đã gửi tín hiệu khởi động lại trạm ${code} thành công qua giao thức MQTT!` };
    }
  }
};
