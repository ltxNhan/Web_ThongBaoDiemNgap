import { Response } from 'express';

export class ApiResponseView {
  public static sendSuccess<T>(res: Response, data: T, message?: string, statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      ...(message ? { message } : {}),
      data
    });
  }

  public static sendError(res: Response, error: string, message: string, statusCode = 400) {
    return res.status(statusCode).json({
      success: false,
      error,
      message
    });
  }
}

