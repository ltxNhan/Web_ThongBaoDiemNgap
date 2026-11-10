/**
 * FloodPointRepository
 * ─────────────────────────────────────────────
 * Tầng Repository (thuộc Model). Truy xuất dữ liệu "điểm ngập" trên bản đồ chung.
 *
 * Các implementation:
 *   • MemoryFloodPointRepository: vùng giả lập (in-memory). Dùng khi chưa cấu hình Supabase.
 *   • PostgisFloodPointRepository: nối thật Supabase/PostGIS (xem file PostgisFloodPointRepository.ts).
 */
import { supabaseAdmin } from '../config/supabase';
import { PostgisFloodPointRepository } from './PostgisFloodPointRepository';

/** Danh sách các điểm ngập trên bản đồ chung TP.HCM */
export interface FloodPointEntity {
  id: string;
  street: string;
  district: string;
  depthCm: number;
  level: 'warning' | 'danger' | 'critical';
  lat: number;
  lng: number;
  description: string;
  imageUrl?: string;
  reporterName?: string;
  source?: 'citizen_report' | 'official';
  updatedAt: string;
}

/** Contract truy xuất điểm ngập. Tất cả thao tác dữ liệu đều async (Node.js). */
export interface FloodPointRepository {
  findAll(): Promise<FloodPointEntity[]>;
  getActive(): Promise<FloodPointEntity[]>;
  create(point: FloodPointEntity): Promise<FloodPointEntity>;
  upsert(point: FloodPointEntity): Promise<FloodPointEntity>;
}

/** Bản giả lập (in-memory). Dùng khi chưa có cấu hình Supabase. */
export class MemoryFloodPointRepository implements FloodPointRepository {
  private points: FloodPointEntity[] = [
    {
      id: 'FP-01',
      street: 'Nguyễn Hữu Cảnh',
      district: 'Bình Thạnh',
      depthCm: 45,
      level: 'critical',
      lat: 10.793,
      lng: 106.715,
      description: 'Chân cầu vượt ngập sâu qua bánh xe, nhiều xe máy chết máy',
      source: 'official',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'FP-02',
      street: 'Huỳnh Tấn Phát',
      district: 'Quận 7',
      depthCm: 35,
      level: 'danger',
      lat: 10.732,
      lng: 106.738,
      description: 'Triều cường dâng cao ngập nửa bánh xe',
      source: 'official',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'FP-03',
      street: 'Võ Văn Ngân',
      district: 'TP. Thủ Đức',
      depthCm: 25,
      level: 'danger',
      lat: 10.851,
      lng: 106.772,
      description: 'Nước chảy xiết đoạn qua chợ Thủ Đức',
      source: 'official',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'FP-04',
      street: 'Trần Hưng Đạo',
      district: 'Quận 5',
      depthCm: 15,
      level: 'warning',
      lat: 10.755,
      lng: 106.671,
      description: 'Ngập nhẹ mép lề đường, xe cộ di chuyển chậm',
      source: 'official',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'FP-05',
      street: 'Lê Văn Lương',
      district: 'Nhà Bè',
      depthCm: 42,
      level: 'critical',
      lat: 10.702,
      lng: 106.702,
      description: 'Cầu Rạch Đĩa ngập sâu do triều cường',
      source: 'official',
      updatedAt: new Date().toISOString(),
    },
  ];

  async findAll(): Promise<FloodPointEntity[]> {
    return this.points.map((p) => ({ ...p }));
  }

  async getActive(): Promise<FloodPointEntity[]> {
    return this.points.filter(
      (p) =>
        p.level === 'danger' ||
        p.level === 'critical' ||
        p.depthCm >= 20,
    );
  }

  async create(point: FloodPointEntity): Promise<FloodPointEntity> {
    this.points.unshift(point);
    return { ...point };
  }

  async upsert(point: FloodPointEntity): Promise<FloodPointEntity> {
    const index = this.points.findIndex((p) => p.id === point.id);
    const next = { ...point, updatedAt: new Date().toISOString() };
    if (index >= 0) {
      this.points[index] = next;
    } else {
      this.points.unshift(next);
    }
    return next;
  }
}

/**
 * Factory single-instance:
 *   - Nếu có Supabase cấu hình (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY) -> PostgisFloodPointRepository.
 *   - Ngược lại -> MemoryFloodPointRepository (giữ sim, không crash).
 */
let _floodPointRepo: FloodPointRepository | null = null;
export function getFloodPointRepository(): FloodPointRepository {
  if (!_floodPointRepo) {
    _floodPointRepo = supabaseAdmin
      ? new PostgisFloodPointRepository()
      : new MemoryFloodPointRepository();
  }
  return _floodPointRepo;
}

/** Singleton để service/controller import. */
export const floodPointRepository: FloodPointRepository = getFloodPointRepository();
