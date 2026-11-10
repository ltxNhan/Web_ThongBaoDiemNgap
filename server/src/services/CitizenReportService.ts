/**
 * CitizenReportService
 * ─────────────────────────────────────────────
 * Tầng Service (Business Logic) cho "tin báo ngập cộng đồng".
 *
 * Mô hình MVC sau cấu trúc lại:
 *   • Controller chỉ nhận Request -> gọi Service -> trả Response.
 *   • Service: validate -> classify -> mapping payload -> entity (Model contract) -> lưu qua Repository.
 *
 * Cách dùng:
 *   service:  import { citizenReportService } from '../services/CitizenReportService';
 *             citizenReportService.submit(req.body);
 *   repo:     import { citizenReportRepository } from '../repositories/CitizenReportRepository';
 */

import { CitizenReportEntity } from '../models/CitizenReport.entity';
import { CitizenReportViewItem } from '../repositories/CitizenReportRepository';
import { CitizenReportRepository } from '../repositories/CitizenReportRepository';

/** Lỗi nghiệp vụ ném ra từ Service, controller chuyển thành HTTP response. */
export class SubmissionError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number,
  ) {
    super(message);
  }
}

export class CitizenReportService {
  constructor(private readonly repo: CitizenReportRepository) {}

  private static classifyLevel(waterLevel: number): { level: string; levelClass: string } {
    if (waterLevel >= 40) {
      return { level: `Ngập sâu (~${waterLevel}cm)`, levelClass: 'danger' };
    }
    if (waterLevel >= 25) {
      return { level: `Ngập trung bình (~${waterLevel}cm)`, levelClass: 'warning' };
    }
    return { level: `Ngập nhẹ (~${waterLevel}cm)`, levelClass: 'moderate' };
  }

  /** Tính depthCm từ body (ưu tiên depthEstimate > depthCm > 25). */
  private static resolveDepth(body: Record<string, any>): number {
    const depth = Number(body.depthEstimate ?? body.depthCm ?? 25);
    return Number.isFinite(depth) ? depth : 25;
  }

  /** Tạo view-model từ payload (dùng cho UI). */
  private buildViewItem(body: Record<string, any>, entity: CitizenReportEntity): CitizenReportViewItem {
    const lat = Number(body.latitude ?? body.lat);
    const lng = Number(body.longitude ?? body.lng);
    const { levelClass, level } = CitizenReportService.classifyLevel(entity.depthEstimateCm);
    const image = body.image || body.image_url || body.imageUrl ||
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80';

    return {
      id: entity.id,
      userName: body.userName || body.author || 'Người dân',
      author: body.author || body.userName || 'Người dân ẩn danh',
      userPhone: body.userPhone || '090xxxxxxx',
      street: body.street || 'Vị trí qua định vị GPS',
      district: body.district || 'Chưa xác định',
      address: body.street
        ? `${body.street}, ${body.district || 'TP.HCM'}`
        : 'Vị trí qua GPS',
      depthEstimate: entity.depthEstimateCm,
      water_level: entity.depthEstimateCm,
      description: body.description || '',
      desc: body.description || '',
      level,
      levelClass,
      image,
      image_url: image,
      imageUrl: image,
      lat,
      lng,
      latitude: lat,
      longitude: lng,
      coords: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      status: 'pending',
      time: 'Vừa xong',
      createdAt: new Date().toISOString(),
    };
  }

  /** Submit báo cáo (validate -> entity -> lưu -> trả view-item). */
  async submit(body: Record<string, any>) {
    const lat = body.latitude ?? body.lat;
    const lng = body.longitude ?? body.lng;
    if (lat === undefined || lng === undefined) {
      throw new SubmissionError(
        'INVALID_COORDINATES',
        'Vui lòng cung cấp `latitude`/`longitude` (hoặc `lat`/`lng`).',
        400,
      );
    }
    const latNum = Number(lat);
    const lngNum = Number(lng);
    if (isNaN(latNum) || isNaN(lngNum)) {
      throw new SubmissionError(
        'INVALID_COORDINATES',
        'Tọa độ latitude và longitude phải là giá trị số hợp lệ.',
        400,
      );
    }

    const entity: CitizenReportEntity = {
      id: `CR-${Date.now().toString().slice(-6)}`,
      reporterPhone: body.userPhone,
      reporterName: body.userName || body.author,
      street: body.street || 'Vị trí qua định vị GPS',
      district: body.district || 'Chưa xác định',
      depthEstimateCm: CitizenReportService.resolveDepth(body),
      description: body.description || '',
      imageUrl: body.image_url || body.imageUrl,
      latitude: latNum,
      longitude: lngNum,
      status: 'pending',
      moderatedByStaffId: undefined,
      moderatedAt: undefined,
      createdAt: new Date(),
    };

    // Model: lưu vào repository.
    const viewItem = await this.repo.create(this.buildViewItem(body, entity));
    return viewItem;
  }

  /** Lấy danh sách hiển thị (phê duyệt + pending). */
  async getRecent() {
    return await this.repo.findAllApprovedPending();
  }

  /** Lấy hàng đợi kiểm duyệt (toàn bộ). */
  async getQueue() {
    return await this.repo.findAllApprovedPending();
  }

  /** Duyệt báo cáo: cập nhật trạng thái. */
  async moderate(id: string, action: 'approved' | 'rejected' | 'pending') {
    return await this.repo.updateStatus(id, action);
  }
}

/** Singleton thực bản (dùng trong route/controller). */
import { citizenReportRepository } from '../repositories/CitizenReportRepository';
export const citizenReportService = new CitizenReportService(citizenReportRepository);
