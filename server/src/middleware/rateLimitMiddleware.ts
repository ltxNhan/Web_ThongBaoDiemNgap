import { Request, Response, NextFunction } from 'express';

const ipHits = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(limit = 60, windowMs = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const record = ipHits.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count++;
    }

    ipHits.set(ip, record);

    if (record.count > limit) {
      return res.status(429).json({
        message: 'Bạn đang gửi quá nhiều yêu cầu trong thời gian ngắn. Vui lòng chờ 1 phút.'
      });
    }

    next();
  };
}
