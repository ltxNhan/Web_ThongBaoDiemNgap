import { Response } from 'express';

export class ReportView {
  public static renderCreated(res: Response, report: any) {
    return res.status(201).json({
      success: true,
      message: 'Báo cáo đã được tiếp nhận thành công.',
      id: report.id,
      data: report
    });
  }

  public static renderRecentList(res: Response, reports: any[]) {
    return res.json(reports);
  }

  public static renderQueue(res: Response, queue: any[]) {
    return res.json(queue);
  }

  public static renderModerationResult(res: Response, id: string, status: string) {
    return res.json({ success: true, id, status });
  }
}

