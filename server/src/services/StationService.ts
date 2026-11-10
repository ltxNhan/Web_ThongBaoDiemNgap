import { StationEntity } from '../models/Station.entity';
import { AuditLogService } from './AuditLogService';

export class StationService {
  private static stations: StationEntity[] = [
    {
      id: 'ST-01',
      code: 'ST-01',
      name: 'Trạm Thủy văn Phú An (Sông Sài Gòn)',
      type: 'combined',
      status: 'online',
      currentRainMm: 68.5,
      currentTideM: 1.72,
      batteryPercent: 96,
      signalDbm: -68,
      lat: 10.795,
      lng: 106.711,
      lastUpdated: new Date().toISOString(),
      lastPing: '1 phút trước'
    },
    {
      id: 'ST-02',
      code: 'ST-02',
      name: 'Trạm Triều ký Nhà Bè (Sông Đồng Điền)',
      type: 'tide',
      status: 'online',
      currentRainMm: 45.0,
      currentTideM: 1.68,
      batteryPercent: 88,
      signalDbm: -72,
      lat: 10.689,
      lng: 106.745,
      lastUpdated: new Date().toISOString(),
      lastPing: '2 phút trước'
    },
    {
      id: 'ST-03',
      code: 'ST-03',
      name: 'Trạm Đo Mưa Chợ Thủ Đức',
      type: 'rain',
      status: 'online',
      currentRainMm: 92.4,
      currentTideM: 1.35,
      batteryPercent: 92,
      signalDbm: -65,
      lat: 10.849,
      lng: 106.775,
      lastUpdated: new Date().toISOString(),
      lastPing: '30 giây trước'
    },
    {
      id: 'ST-04',
      code: 'ST-04',
      name: 'Trạm Kênh Tân Hóa - Lò Gốm',
      type: 'combined',
      status: 'error',
      currentRainMm: 38.0,
      currentTideM: 1.45,
      batteryPercent: 24,
      signalDbm: -95,
      lat: 10.749,
      lng: 106.635,
      lastUpdated: new Date().toISOString(),
      lastPing: '45 phút trước (Mất tín hiệu)'
    },
    {
      id: 'ST-05',
      code: 'ST-05',
      name: 'Trạm Triều Bến Mễ Cốc (Quận 8)',
      type: 'tide',
      status: 'online',
      currentRainMm: 50.2,
      currentTideM: 1.62,
      batteryPercent: 78,
      signalDbm: -70,
      lat: 10.725,
      lng: 106.642,
      lastUpdated: new Date().toISOString(),
      lastPing: '3 phút trước'
    },
    {
      id: 'ST-06',
      code: 'ST-06',
      name: 'Trạm Khí tượng Kênh Nhiêu Lộc - Tân Định',
      type: 'combined',
      status: 'online',
      currentRainMm: 52.0,
      currentTideM: 1.55,
      batteryPercent: 91,
      signalDbm: -62,
      lat: 10.789,
      lng: 106.691,
      lastUpdated: new Date().toISOString(),
      lastPing: '1 phút trước'
    }
  ];

  public static getAllStations(): StationEntity[] {
    return this.stations;
  }

  public static getStationByCode(code: string): StationEntity | undefined {
    return this.stations.find((s) => s.code.toLowerCase() === code.toLowerCase() || s.id.toLowerCase() === code.toLowerCase());
  }

  public static async restartStation(code: string, ip = '127.0.0.1'): Promise<{ success: boolean; message: string }> {
    const station = this.getStationByCode(code);
    if (!station) {
      return { success: false, message: `Không tìm thấy trạm có mã ${code}` };
    }

    station.status = 'online';
    station.batteryPercent = Math.min(100, station.batteryPercent + 5);
    station.lastPing = 'Vừa khởi động lại';
    station.lastUpdated = new Date().toISOString();

    await AuditLogService.logEvent(
      `Gửi lệnh MQTT khởi động lại trạm ${station.name} (${station.code})`,
      'STATION',
      'Cán bộ Vận hành',
      ip,
      'warn',
      { stationCode: station.code }
    );

    return {
      success: true,
      message: `Đã gửi tín hiệu khởi động lại trạm ${station.name} (${station.code}) thành công qua giao thức MQTT!`
    };
  }

  /**
   * Tính toán khoảng cách (Haversine) và tìm trạm quan trắc gần nhất với tọa độ tin báo
   * Phục vụ nghiệp vụ Đối soát cảm biến lân cận (Sensor Correlation)
   */
  public static findClosestStation(lat: number, lng: number): { station: StationEntity; distanceKm: number } | null {
    if (!lat || !lng || isNaN(lat) || isNaN(lng) || this.stations.length === 0) return null;

    let closest: StationEntity = this.stations[0];
    let minDistance = Infinity;

    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const R = 6371; // Bán kính Trái Đất (km)

    for (const s of this.stations) {
      const dLat = toRad(s.lat - lat);
      const dLon = toRad(s.lng - lng);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat)) * Math.cos(toRad(s.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c;

      if (dist < minDistance) {
        minDistance = dist;
        closest = s;
      }
    }

    return {
      station: closest,
      distanceKm: Math.round(minDistance * 100) / 100
    };
  }
}
