import { Request, Response } from 'express';
import { AlertView } from '../views/AlertView';

const activeAlerts = [
  {
    id: 'ALT-2026-001',
    level: 3,
    title: 'CẢNH BÁO KHẨN CẤP: Triều cường vượt Báo động 3 kết hợp mưa lớn',
    content: 'Mực nước đỉnh triều tại trạm Phú An dự kiến đạt 1.75m lúc 17:30 - 19:30. Khuyến cáo người dân hạn chế lưu thông.',
    affectedDistricts: ['Quận 7', 'Nhà Bè', 'Bình Thạnh', 'TP. Thủ Đức', 'Quận 4'],
    issuedAt: new Date().toISOString(),
    validUntil: '2026-10-22T21:00:00Z'
  }
];

export class AlertsController {
  public static async getActiveAlerts(req: Request, res: Response) {
    return AlertView.renderList(res, activeAlerts);
  }

  public static async publishAlert(req: Request, res: Response) {
    const newAlert = {
      id: `ALT-${Date.now()}`,
      ...req.body,
      issuedAt: new Date().toISOString()
    };
    activeAlerts.unshift(newAlert);
    return AlertView.renderPublished(res, newAlert);
  }
}
