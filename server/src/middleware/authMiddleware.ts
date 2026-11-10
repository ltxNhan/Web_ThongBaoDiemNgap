import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    phone?: string;
  };
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // For demo convenience, allow anonymous read requests
    req.user = { id: 'USR-GUEST', role: 'citizen' };
    return next();
  }

  const token = authHeader.split(' ')[1];
  // Verify token or set user
  req.user = { id: 'USR-AUTH', role: token.includes('admin') ? 'admin' : 'citizen' };
  next();
}
