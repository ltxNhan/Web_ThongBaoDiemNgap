import { Request, Response } from 'express';
import { citizenReportService } from '../services/CitizenReportService';

/**
 * CitizenReportsController
 * ─────────────────────────────────────────────
 * Tầng Controller (thuộc VIEW). Là "pass-through" thuần:
 * chỉ nhận Request, gọi servicem, trả Response.
 * Loại Logic nghiệp vụ/validation ra khỏi Controller (bây giờ nằm trong CitizenReportService).
 */

export class CitizenReportsController {
  constructor(private readonly service = citizenReportService) {}

  /** POST /api/citizen-reports | /api/reports */
  async submit(req: Request, res: Response) {
    try {
      const item = await this.service.submit(req.body);
      res.status(201).json(item);
    } catch (err: any) {
      res.status(err.statusCode || 500).json({
        success: false,
        error: err.code || 'SERVER_ERROR',
        message: err.message || 'Có lỗi xảy ra khi gửi báo cáo.',
      });
    }
  }

  /** GET /api/citizen-reports/recent */
  async getRecent(req: Request, res: Response) {
    res.json(await this.service.getRecent());
  }

  /** GET /api/citizen-reports/queue */
  async getQueue(req: Request, res: Response) {
    res.json(await this.service.getQueue());
  }

  /** POST /api/admin/reports/:id/moderate */
  async moderate(req: Request, res: Response) {
    const id = String(req.params.id);
    const { action } = req.body;
    if (!action) {
      return res.status(400).json({
        success: false,
        error: 'NO_ACTION',
        message: 'Bạn chưa chọn hành động duyệt báo cáo.',
      });
    }
    const updated = await this.service.moderate(id, action);
    if (!updated) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Không tìm thấy báo cáo để duyệt.',
      });
    }
    res.json({ success: true, id, status: updated.status });
  }
}

/** Singleton để route gọi. */
export const citizenReportsController = new CitizenReportsController(citizenReportService);
