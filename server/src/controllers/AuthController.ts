import { Request, Response } from 'express';

export class AuthController {
  public static async login(req: Request, res: Response) {
    const { phone, code } = req.body;
    return res.json({
      token: 'jwt-auth-token-sample',
      user: {
        id: 'USR-01',
        phone: phone || '0901234567',
        fullName: 'Nguyễn Văn Công Dân',
        district: 'Quận 7',
        subscribedAlerts: true
      }
    });
  }

  public static async register(req: Request, res: Response) {
    const { fullName, phone, district } = req.body;
    return res.status(201).json({
      success: true,
      user: {
        id: `USR-${Date.now()}`,
        fullName,
        phone,
        district,
        subscribedAlerts: true
      }
    });
  }
}
