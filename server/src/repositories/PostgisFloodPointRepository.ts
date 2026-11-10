/**
 * PostgisFloodPointRepository
 * ─────────────────────────────────────────────
 * Lớp nối thật Supabase/PostGIS cho "điểm ngập".
 * Thao tác tất cả async qua supabaseAdmin (service_role key, bypass RLS).
 *
 * Lưu ý: tên cột bên dưới nên khớp migration thực tế của bảng `flood_points`
 * trong Supabase. Nếu migration dùng camelCase, đổi lại khớp với toPayload/toEntity.
 */
import { supabaseAdmin } from '../config/supabase';
import { FloodPointEntity, FloodPointRepository } from './FloodPointRepository';

export class PostgisFloodPointRepository implements FloodPointRepository {
  private toEntity(data: any): FloodPointEntity {
    if (!data) throw new Error('[FloodPointRepo] Không nhận dữ liệu từ Supabase.');
    return {
      id: data.id,
      street: data.street,
      district: data.district,
      depthCm: Number(data.depth_cm),
      level: data.level,
      lat: Number(data.lat),
      lng: Number(data.lng),
      description: data.description,
      imageUrl: data.image_url,
      reporterName: data.reporter_name,
      source: data.source,
      updatedAt: data.updated_at || new Date().toISOString(),
    };
  }

  private toPayload(point: FloodPointEntity): Record<string, any> {
    return {
      id: point.id,
      street: point.street,
      district: point.district,
      depth_cm: point.depthCm,
      level: point.level,
      lat: point.lat,
      lng: point.lng,
      description: point.description,
      image_url: point.imageUrl,
      reporter_name: point.reporterName,
      source: point.source,
      updated_at: point.updatedAt,
    };
  }

  async findAll(): Promise<FloodPointEntity[]> {
    const { data, error } = await supabaseAdmin
      .from('flood_points')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) {
      console.error('[FloodPointRepo] Lỗi đọc điểm ngập:', error.message);
      return [];
    }
    return (data || []).map((p: any) => this.toEntity(p));
  }

  async getActive(): Promise<FloodPointEntity[]> {
    const { data, error } = await supabaseAdmin
      .from('flood_points')
      .select('*')
      .or(`level.eq.danger,level.eq.critical,depth_cm.gte.20`)
      .order('updated_at', { ascending: false });
    if (error) {
      console.error('[FloodPointRepo] Lỗi lấy điểm ngập đang báo động:', error.message);
      return [];
    }
    return (data || []).map((p: any) => this.toEntity(p));
  }

  async create(point: FloodPointEntity): Promise<FloodPointEntity> {
    const payload = this.toPayload(point);
    const { data, error } = await supabaseAdmin
      .from('flood_points')
      .insert([payload])
      .select()
      .single();
    if (error) {
      console.error('[FloodPointRepo] Lỗi tạo điểm ngập:', error.message);
      throw new Error(error.message);
    }
    return this.toEntity(data);
  }

  async upsert(point: FloodPointEntity): Promise<FloodPointEntity> {
    const payload = this.toPayload(point);
    const { data, error } = await supabaseAdmin
      .from('flood_points')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();
    if (error) {
      console.error('[FloodPointRepo] Lỗi upsert điểm ngập:', error.message);
      throw new Error(error.message);
    }
    return this.toEntity(data);
  }
}
