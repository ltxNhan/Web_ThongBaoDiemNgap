export interface ForecastBulletinsEntity {
  id: string;
  bulletinCode: string;
  timeWindow: '3h' | '6h' | '12h' | '24h';
  peakTideLevelM: number;
  expectedRainfallMm: number;
  peakHourRange: string;
  affectedDistricts: string[];
  issuedAt: Date;
  validUntil: Date;
}
