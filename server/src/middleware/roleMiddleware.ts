import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export function requireRole(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Truy cập bị từ chối: Không đủ thẩm quyền truy cập phân hệ này.' });
    }
    next();
  };
}
