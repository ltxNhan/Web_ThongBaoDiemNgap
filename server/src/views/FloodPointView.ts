import { Response } from 'express';

export class FloodPointView {
  public static renderList(res: Response, floodPoints: any[]) {
    return res.json(floodPoints);
  }

  public static renderCreated(res: Response, newPoint: any) {
    return res.status(201).json(newPoint);
  }

  public static renderGeoJson(res: Response, floodPoints: any[]) {
    const geoJson = {
      type: 'FeatureCollection',
      features: floodPoints.map((fp) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [fp.lng, fp.lat]
        },
        properties: {
          id: fp.id,
          street: fp.street,
          district: fp.district,
          depthCm: fp.depthCm,
          level: fp.level,
          description: fp.description,
          updatedAt: fp.updatedAt
        }
      }))
    };
    return res.json(geoJson);
  }
}

