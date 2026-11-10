import { Request, Response } from 'express';
import { StationService } from '../services/StationService';

export class StationsController {
  public static async getAll(req: Request, res: Response) {
    try {
      const stations = StationService.getAllStations();
      return res.json(stations);
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        error: 'FETCH_STATIONS_ERROR',
        message: err.message || 'Lỗi khi tải danh sách trạm quan trắc.'
      });
    }
  }

  public static async getByCode(req: Request, res: Response) {
    const code = String(req.params.code);
    const station = StationService.getStationByCode(code);
    if (!station) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: `Không tìm thấy trạm quan trắc với mã ${code}.`
      });
    }
    return res.json(station);
  }

  public static async restart(req: Request, res: Response) {
    const code = String(req.params.code);
    const ip = req.ip || '127.0.0.1';
    const result = await StationService.restartStation(code, ip);
    if (!result.success) {
      return res.status(404).json(result);
    }
    return res.json(result);
  }

  public static async getClosest(req: Request, res: Response) {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_COORDINATES',
        message: 'Vui lòng cung cấp tọa độ lat và lng hợp lệ.'
      });
    }

    const correlation = StationService.findClosestStation(lat, lng);
    if (!correlation) {
      return res.status(404).json({
        success: false,
        error: 'NO_STATION_FOUND',
        message: 'Không tìm thấy trạm quan trắc lân cận.'
      });
    }

    return res.json(correlation);
  }
}
