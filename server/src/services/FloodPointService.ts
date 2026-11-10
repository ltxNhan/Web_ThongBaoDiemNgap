/**
 * FloodPointService
 * ─────────────────────────────────────────────
 * Tầng Service (thuộc Model) cho "điểm ngập trên bản đồ chung".
 *
 * Mô hình MVC sau cấu trúc lại:
 *   • `RoutingService` chỉ phụ thuộc `FloodPointRepository` (Siêu lớp dữ liệu) -> không còn vòng lặp.
 *   • `FloodPointsController` trở nên hàn lâm (thin): chỉ gọi Service + trả Response.
 *
 * Cách dùng:
 *   service:  import { floodPointService } from '../services/FloodPointService';
 *             floodPointService.getActivePoints();
 */

import { FloodPointEntity, FloodPointRepository } from '../repositories/FloodPointRepository';

export class FloodPointService {
  constructor(private readonly repo: FloodPointRepository) {}

  /** Lấy các điểm ngập có nguy cơ (dùng cho Routing tránh vùng ngập). */
  async getActivePoints() {
    return await this.repo.getActive();
  }

  /** Lấy toàn bộ điểm ngập (hiển thị trên bản đồ). */
  async getAllPoints() {
    return await this.repo.findAll();
  }

  /**
   * Xây dựng điểm ngập từ payload (hỗ trợ cả form báo cáo người dân
   * (water_level/depthEstimate) và form trực tiếp (depthCm)).
   * Pure builder - không gọi CSDL hay realtime ở đây.
   */
  buildPointFromData(data: Record<string, any>): FloodPointEntity {
    const depth = Number(data.depthCm ?? data.depthEstimate ?? data.water_level ?? 20);
    const lat = Number(data.lat ?? data.latitude ?? data.lng ?? data.longitude);
    const lng = Number(data.lng ?? data.longitude ?? data.lat ?? data.latitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      throw new Error('Không thể lấy tọa độ từ dữ liệu để tạo điểm ngập.');
    }

    const id = data.id || `FP-CITIZEN-${Date.now()}`;
    return {
      id,
      street: data.street || 'Báo cáo hiện trường',
      district: data.district || 'TP.HCM',
      depthCm: Number.isFinite(depth) ? depth : 20,
      level: Number.isFinite(depth)
        ? (depth >= 40 ? 'critical' : depth >= 25 ? 'danger' : 'warning')
        : 'warning',
      lat,
      lng,
      description: data.description || `Báo cáo bởi người dân: ngập ~${depth}cm`,
      imageUrl: data.image_url || data.imageUrl,
      reporterName: data.userName || data.author,
      source: 'citizen_report',
      updatedAt: new Date().toISOString(),
    };
  }

  /** Lưu điểm ngập (create). */
  async create(point: FloodPointEntity) {
    return await this.repo.create(point);
  }

  /** Lưu điểm ngập từ dữ liệu (dùng khi duyệt báo cáo của người dân). */
  async upsertFromReport(data: Record<string, any>) {
    const point = this.buildPointFromData(data);
    return await this.repo.upsert(point);
  }
}

/** Singleton thực bản (dùng trong route/controller). */
import { floodPointRepository } from '../repositories/FloodPointRepository';
export const floodPointService = new FloodPointService(floodPointRepository);
