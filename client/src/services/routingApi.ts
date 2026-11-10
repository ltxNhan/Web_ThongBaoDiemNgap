import { request } from './apiClient';

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface RouteApiResponse {
  success: boolean;
  message?: string;
  data: any; // GeoJSON FeatureCollection từ OpenRouteService
}

/**
 * Service giao tiếp với API Tìm đường tránh ngập của Backend
 */
export const routingApi = {
  /**
   * Gửi tọa độ điểm bắt đầu và kết thúc để tìm đường ngắn nhất né các điểm ngập
   * @param start Điểm xuất phát { lat, lng }
   * @param end Điểm đích đến { lat, lng }
   * @returns GeoJSON FeatureCollection của tuyến đường
   */
  getSafeRoute: async (start: Coordinate, end: Coordinate): Promise<any> => {
    const res = await request<RouteApiResponse>('/routing', {
      method: 'POST',
      body: JSON.stringify({ start, end })
    });

    if (!res.success) {
      throw new Error(res.message || 'Không thể tìm tuyến đường tránh ngập.');
    }

    return res.data;
  }
};

