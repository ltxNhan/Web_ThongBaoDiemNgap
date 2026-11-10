import { Response } from 'express';

export class AlertView {
  public static renderList(res: Response, alerts: any[]) {
    return res.json(alerts);
  }

  public static renderPublished(res: Response, newAlert: any) {
    return res.status(201).json(newAlert);
  }

  public static renderEmergencyHtml(alert: any): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${alert.title}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; }
            .alert-box { border-left: 6px solid #ef4444; background: #1e293b; padding: 18px 24px; border-radius: 8px; }
            .badge { background: #ef4444; color: #fff; padding: 4px 8px; border-radius: 4px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="alert-box">
            <span class="badge">BÁO ĐỘNG CẤP ${alert.level}</span>
            <h2>${alert.title}</h2>
            <p>${alert.content}</p>
            <p><strong>Khu vực ảnh hưởng:</strong> ${alert.affectedDistricts?.join(', ')}</p>
            <small>Phát hành lúc: ${alert.issuedAt}</small>
          </div>
        </body>
      </html>
    `.trim();
  }
}

