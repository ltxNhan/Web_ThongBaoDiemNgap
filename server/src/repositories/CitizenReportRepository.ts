/**
 * CitizenReportRepository
 * ─────────────────────────────────────────────
 * Tầng Repository (thuộc Model). Quản lý dữ liệu "tin báo ngập" của người dân.
 *
 * Có 2 implementation:
 *   • MemoryCitizenReportRepository: vùng giả lập (in-memory). Dùng khi chưa cấu hình Supabase.
 *   • SupabaseCitizenReportRepository: nối thật Supabase (PostgREST). Xem file tách riêng.
 *
 * Lưu ý: tên cột bên dưới nên khớp migration thực tế của bảng `citizen_reports`.
 */
import { supabaseAdmin } from '../config/supabase';
import { CitizenReportEntity } from '../models/CitizenReport.entity';

/** Dạng dữ liệu phản hồi cho tầng View (UI / frontend). */
export interface CitizenReportViewItem {
  id: string;
  userName?: string;
  author?: string;
  userPhone?: string;
  street: string;
  district: string;
  address?: string;
  depthEstimate: number;
  water_level: number;
  description: string;
  desc?: string;
  level?: string;
  levelClass?: string;
  image?: string;
  image_url?: string;
  imageUrl?: string;
  lat: number;
  lng: number;
  latitude: number;
  longitude: number;
  coords?: string;
  status: 'pending' | 'approved' | 'rejected';
  time?: string;
  createdAt: string;
}

/** Contract truy vấn báo cáo. Tất cả thao tác đều async. */
export interface CitizenReportRepository {
  findAllApprovedPending(): Promise<CitizenReportViewItem[]>;
  getById(id: string): Promise<CitizenReportViewItem | undefined>;
  create(report: CitizenReportViewItem): Promise<CitizenReportViewItem>;
  updateStatus(id: string, action: 'approved' | 'rejected' | 'pending'): Promise<CitizenReportViewItem | undefined>;
}

/** Bản giả lập (in-memory). */
export class MemoryCitizenReportRepository implements CitizenReportRepository {
  private reports: CitizenReportViewItem[] = [
    {
      id: 'BC-8042', userName: 'Nguyễn Văn A', author: 'Nguyễn Văn A (0908.xxx.xxx)',
      userPhone: '0908123456', street: 'Nguyễn Hữu Cảnh, Bình Thạnh', district: 'Bình Thạnh',
      address: '142 Nguyễn Hữu Cảnh, P. 22, Bình Thạnh', depthEstimate: 45, water_level: 45,
      description: 'Nước ngập sâu qua nửa bánh xe, nhiều xe máy chết máy dắt bộ',
      desc: 'Nước ngập sâu qua nửa bánh xe, nhiều xe máy chết máy dắt bộ',
      level: 'Ngập sâu (~45cm)', levelClass: 'danger',
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80',
      lat: 10.7932, lng: 106.7208, latitude: 10.7932, longitude: 106.7208,
      coords: '10.7932, 106.7208', status: 'pending', time: '5 phút trước',
      createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
      id: 'BC-8041', userName: 'Trần Thị B', author: 'Trần Thị B',
      userPhone: '0912345678', street: 'Đường Lê Văn Lương, Nhà Bè', district: 'Nhà Bè',
      address: 'Đường Lê Văn Lương, Xã Phước Kiển, Nhà Bè', depthEstimate: 20, water_level: 20,
      description: 'Triều cường lên nhanh, tràn lên lề đường',
      desc: 'Triều cường lên nhanh, tràn lên lề đường',
      level: 'Ngập nhẹ (~20cm)', levelClass: 'moderate',
      image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
      lat: 10.689, lng: 106.702, latitude: 10.689, longitude: 106.702,
      coords: '10.689, 106.702', status: 'pending', time: '12 phút trước',
      createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    },
    {
      id: 'BC-8040', userName: 'Phạm Văn C', author: 'Phạm Văn C',
      userPhone: '0988776655', street: 'Đường Nguyễn Văn Cừ, Quận 5', district: 'Quận 5',
      address: 'Ngã tư Nguyễn Văn Cừ & An Dương Vương, Q.5', depthEstimate: 30, water_level: 30,
      description: 'Đoạn gần ngã tư Nguyễn Văn Cừ và An Dương Vương, ngập bánh xe',
      desc: 'Đoạn gần ngã tư Nguyễn Văn Cừ và An Dương Vương, ngập bánh xe',
      level: 'Ngập trung bình', levelClass: 'warning',
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80',
      lat: 10.758, lng: 106.682, latitude: 10.758, longitude: 106.682,
      coords: '10.758, 106.682', status: 'pending', time: '25 phút trước',
      createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    },
    {
      id: 'BC-8039', userName: 'Lê Văn D', author: 'Lê Văn D',
      userPhone: '0977665544', street: 'Huỳnh Tấn Phát, Quận 7', district: 'Quận 7',
      address: 'Huỳnh Tấn Phát, P. Tân Thuận Đông, Quận 7', depthEstimate: 40, water_level: 40,
      description: 'Mưa lớn kèm triều dâng ngập hết cả đường',
      desc: 'Mưa lớn kèm triều dâng ngập hết cả đường',
      level: 'Ngập sâu', levelClass: 'danger',
      image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=600&auto=format&fit=crop&q=80',
      lat: 10.738, lng: 106.735, latitude: 10.738, longitude: 106.735,
      coords: '10.738, 106.735', status: 'pending', time: '40 phút trước',
      createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    },
  ];

  async findAllApprovedPending(): Promise<CitizenReportViewItem[]> {
    return this.reports.filter((r) => r.status === 'approved' || r.status === 'pending');
  }

  async getById(id: string): Promise<CitizenReportViewItem | undefined> {
    return this.reports.find((r) => r.id === id);
  }

  async create(report: CitizenReportViewItem): Promise<CitizenReportViewItem> {
    this.reports.unshift({ ...report });
    return { ...report };
  }

  async updateStatus(id: string, action: 'approved' | 'rejected' | 'pending'): Promise<CitizenReportViewItem | undefined> {
    const found = this.reports.find((r) => r.id === id);
    if (found) found.status = action;
    return found;
  }
}

/** Lớp nối thật Supabase (PostgREST). */
export class SupabaseCitizenReportRepository implements CitizenReportRepository {
  private toViewItem(data: any): CitizenReportViewItem {
    if (!data) throw new Error('[ReportRepo] Không nhận dữ liệu từ Supabase.');
    return {
      id: data.id,
      userName: data.user_name || data.userName,
      author: data.user_name || data.author,
      userPhone: data.reporter_phone,
      street: data.street,
      district: data.district,
      address: data.address,
      depthEstimate: Number(data.depth_estimate_cm),
      water_level: Number(data.water_level) || Number(data.depth_estimate_cm),
      description: data.description,
      desc: data.desc || data.description,
      level: data.level,
      levelClass: data.level_class,
      image: data.image_url,
      image_url: data.image_url,
      imageUrl: data.image_url,
      lat: Number(data.lat),
      lng: data.lng,
      latitude: data.lat,
      longitude: data.lng,
      coords: data.coords,
      status: data.status,
      time: data.time,
      createdAt: data.created_at || new Date().toISOString(),
    };
  }

  private toPayload(report: CitizenReportViewItem): Record<string, any> {
    return {
      id: report.id,
      reporter_name: report.userName || report.author,
      reporter_phone: report.userPhone,
      street: report.street,
      district: report.district,
      address: report.address,
      depth_estimate_cm: report.depthEstimate,
      description: report.description,
      image_url: report.image_url,
      lat: report.lat,
      lng: report.lng,
      latitude: report.lat,
      longitude: report.lng,
      status: report.status,
      created_at: report.createdAt,
    };
  }

  async findAllApprovedPending(): Promise<CitizenReportViewItem[]> {
    const { data, error } = await supabaseAdmin
      .from('citizen_reports')
      .select('*')
      .or(`status.eq.pending,status.eq.approved`)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('[ReportRepo] Lỗi đọc báo cáo:', error.message);
      return [];
    }
    return (data || []).map((r: any) => this.toViewItem(r));
  }

  async getById(id: string): Promise<CitizenReportViewItem | undefined> {
    const { data, error } = await supabaseAdmin
      .from('citizen_reports')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      console.error('[ReportRepo] Lỗi lấy báo cáo:', error.message);
      return undefined;
    }
    return this.toViewItem(data);
  }

  async create(report: CitizenReportViewItem): Promise<CitizenReportViewItem> {
    const payload = this.toPayload(report);
    const { data, error } = await supabaseAdmin
      .from('citizen_reports')
      .insert([payload])
      .select()
      .single();
    if (error) {
      console.error('[ReportRepo] Lỗi lưu báo cáo:', error.message);
      throw new Error(error.message);
    }
    return this.toViewItem(data);
  }

  async updateStatus(id: string, action: 'approved' | 'rejected' | 'pending'): Promise<CitizenReportViewItem | undefined> {
    const { data, error } = await supabaseAdmin
      .from('citizen_reports')
      .update({
        status: action,
        moderated_by_staff_id: 'staff-demo',
        moderated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      console.error('[ReportRepo] Lỗi cập nhật trạng thái:', error.message);
      throw new Error(error.message);
    }
    return this.toViewItem(data);
  }
}

/** Factory single-instance: thực bản nếu có Supabase, ngược lại giả lập. */
let _reportRepo: CitizenReportRepository | null = null;
export function getCitizenReportRepository(): CitizenReportRepository {
  if (!_reportRepo) {
    _reportRepo = supabaseAdmin
      ? new SupabaseCitizenReportRepository()
      : new MemoryCitizenReportRepository();
  }
  return _reportRepo;
}

/** Singleton để service/controller import. */
export const citizenReportRepository: CitizenReportRepository = getCitizenReportRepository();
