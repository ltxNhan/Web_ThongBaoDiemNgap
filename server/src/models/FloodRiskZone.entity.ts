export interface FloodRiskZoneEntity {
  id: string;
  zoneCode: string;
  districtId: string;
  areaName: string;
  polygonGeoJson: string; // PostGIS Polygon WKT or GeoJSON
  riskLevel: 'safe' | 'warning' | 'danger' | 'critical';
  averageElevationM: number;
  drainageCapacity: string;
  createdAt: Date;
}
