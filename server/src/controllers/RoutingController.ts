import { Request, Response } from 'express';
import { RoutingService } from '../services/RoutingService';
import { ApiResponseView } from '../views/ApiResponseView';
import { floodPointRepository } from '../repositories/FloodPointRepository';

/**
 * RoutingController
 * ─────────────────────────────────────────────
 * Là cầu nối: nhận Request, gọi RoutingService (thay vì tự thao tác dữ liệu).
 * RoutingService giờ đây truy vấn điểm ngập qua FloodPointRepository.
 */

export class RoutingController {
  /** GET/POST /api/routing/safe-route */
  public static async getSafeRoute(req: Request, res: Response): Promise<void> {
    try {
      const { start, end, startLat, startLng, endLat, endLng } = req.body;

      let startCoord: { lat: number; lng: number } | null = null;
      if (start && typeof start.lat === 'number' && typeof start.lng === 'number') {
        startCoord = { lat: Number(start.lat), lng: Number(start.lng) };
      } else if (Array.isArray(start) && start.length === 2) {
        startCoord = { lng: Number(start[0]), lat: Number(start[1]) };
      } else if (startLat !== undefined && startLng !== undefined) {
        startCoord = { lat: Number(startLat), lng: Number(startLng) };
      }

      let endCoord: { lat: number; lng: number } | null = null;
      if (end && typeof end.lat === 'number' && typeof end.lng === 'number') {
        endCoord = { lat: Number(end.lat), lng: Number(end.lng) };
      } else if (Array.isArray(end) && end.length === 2) {
        endCoord = { lng: Number(end[0]), lat: Number(end[1]) };
      } else if (endLat !== undefined && endLng !== undefined) {
        endCoord = { lat: Number(endLat), lng: Number(endLng) };
      }

      if (
        !startCoord ||
        !endCoord ||
        isNaN(startCoord.lat) ||
        isNaN(startCoord.lng) ||
        isNaN(endCoord.lat) ||
        isNaN(endCoord.lng)
      ) {
        ApiResponseView.sendError(
          res,
          'INVALID_COORDINATES',
          'Vui lòng cung cấp đầy đủ tọa độ điểm xuất phát (start) và điểm đến (end) hợp lệ.',
          400,
        );
        return;
      }

      // Truy vấn tuyến đường an toàn qua RoutingService (dùng FloodPointRepository).
      const routeGeoJson = await RoutingService.calculateSafeRoute(
        startCoord,
        endCoord,
        floodPointRepository,
      );

      ApiResponseView.sendSuccess(
        res,
        routeGeoJson,
        'Tìm tuyến đường ngắn nhất tránh các điểm ngập thành công',
      );
    } catch (error: any) {
      console.error('[RoutingController] Lỗi xử lý tìm đường:', error.message);
      ApiResponseView.sendError(
        res,
        'ROUTING_SERVICE_ERROR',
        error.message || 'Không thể tính toán đường đi. Vui lòng thử lại sau.',
        502,
      );
    }
  }
}
