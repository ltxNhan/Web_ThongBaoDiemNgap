export interface Point {
  lat: number;
  lng: number;
}

export interface Polygon {
  coordinates: Point[];
}

export class GisSpatialService {
  /**
   * Ray casting algorithm to check if a GPS Point is inside a Risk Polygon
   */
  public static isPointInPolygon(point: Point, polygon: Point[]): boolean {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat;
      const yi = polygon[i].lng;
      const xj = polygon[j].lat;
      const yj = polygon[j].lng;

      const intersect =
        yi > point.lng !== yj > point.lng &&
        point.lat < ((xj - xi) * (point.lng - yi)) / (yj - yi) + xi;
      if (intersect) isInside = !isInside;
    }
    return isInside;
  }

  /**
   * Calculate distance between two coordinates in Kilometers (Haversine Formula)
   */
  public static calculateDistanceKm(p1: Point, p2: Point): number {
    const R = 6371; // Earth radius in km
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLng = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((p1.lat * Math.PI) / 180) *
        Math.cos((p2.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Route avoidance calculation: Find routes that circumvent flood points over threshold
   */
  public static filterSafeRouteNodes(nodes: Point[], activeFloodPoints: { lat: number; lng: number; depthCm: number }[]): Point[] {
    const safetyBufferKm = 0.15; // 150m avoidance buffer
    return nodes.filter((node) => {
      const isBlocked = activeFloodPoints.some(
        (fp) => fp.depthCm > 20 && this.calculateDistanceKm(node, fp) < safetyBufferKm
      );
      return !isBlocked;
    });
  }
}
