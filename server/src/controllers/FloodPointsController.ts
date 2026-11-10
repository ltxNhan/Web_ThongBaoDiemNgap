import { Request, Response } from 'express';
import { FloodPointService, floodPointService } from '../services/FloodPointService';
import { FloodPointView } from '../views/FloodPointView';

/**
 * FloodPointsController
 * ─────────────────────────────────────────────
 * Tầng Controller (thuộc VIEW). Là "pass-through" thuần, không còn chứa
 * danh sách `floodPoints` hay logic `addOrUpdatePointFromReport` (đã chuyển
 * vào FloodPointService). Chỉ gọi Service và trả Response.
 */

export class FloodPointsController {
  constructor(private readonly service = floodPointService) {}

  /** GET /api/flood-points */
  async getAll(req: Request, res: Response) {
    const floodPoints = await this.service.getAllPoints();
    if (req.query.format === 'geojson') {
      FloodPointView.renderGeoJson(res, floodPoints);
    } else {
      FloodPointView.renderList(res, floodPoints);
    }
  }

  /** POST /api/flood-points */
  async create(req: Request, res: Response) {
    try {
      const point = this.service.buildPointFromData(req.body);
      const saved = await this.service.create(point);
      res.status(201).json(saved);
    } catch (err: any) {
      res.status(400).json({
        success: false,
        error: 'INVALID_POINT',
        message: err.message || 'Dữ liệu điểm ngập không hợp lệ.',
      });
    }
  }
}

/** Singleton để route gọi. */
export const floodPointsController = new FloodPointsController(floodPointService);
