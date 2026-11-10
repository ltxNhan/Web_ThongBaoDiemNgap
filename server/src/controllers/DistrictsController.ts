import { Request, Response } from 'express';

export class DistrictsController {
  public static async getDistricts(req: Request, res: Response) {
    const districts = [
      { id: 'DIST-01', code: 'Q1', name: 'Quận 1', totalVulnerablePoints: 2 },
      { id: 'DIST-02', code: 'Q4', name: 'Quận 4', totalVulnerablePoints: 5 },
      { id: 'DIST-03', code: 'Q7', name: 'Quận 7', totalVulnerablePoints: 12 },
      { id: 'DIST-04', code: 'BT', name: 'Bình Thạnh', totalVulnerablePoints: 14 },
      { id: 'DIST-05', code: 'TD', name: 'TP. Thủ Đức', totalVulnerablePoints: 18 },
      { id: 'DIST-06', code: 'NB', name: 'Nhà Bè', totalVulnerablePoints: 15 }
    ];
    return res.json(districts);
  }

  public static async getRiskZones(req: Request, res: Response) {
    const zones = [
      { id: 'Z-01', district: 'Bình Thạnh', name: 'Bán đảo Thanh Đa', riskLevel: 'critical' },
      { id: 'Z-02', district: 'Quận 7', name: 'Vùng trũng Rạch Đĩa - Phú Thuận', riskLevel: 'danger' },
      { id: 'Z-03', district: 'TP. Thủ Đức', name: 'Lưu vực Chợ Thủ Đức', riskLevel: 'danger' }
    ];
    return res.json(zones);
  }
}
