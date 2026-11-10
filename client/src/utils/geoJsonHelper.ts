export interface GeoPolygon {
  type: 'Feature';
  properties: {
    district: string;
    riskLevel: 'safe' | 'warning' | 'danger' | 'critical';
    color: string;
    areaName: string;
  };
  geometry: {
    type: 'Polygon';
    coordinates: [number, number][][];
  };
}

export function getSeverityColor(depthCm: number): { color: string; label: string; badgeClass: string } {
  if (depthCm < 10) return { color: '#10b981', label: 'Bình thường (<10cm)', badgeClass: 'bg-emerald-500' };
  if (depthCm < 20) return { color: '#f59e0b', label: 'Ngập nhẹ (10-20cm)', badgeClass: 'bg-amber-500' };
  if (depthCm <= 40) return { color: '#f97316', label: 'Ngập sâu (20-40cm)', badgeClass: 'bg-orange-500' };
  return { color: '#ef4444', label: 'Nguy hiểm (>40cm)', badgeClass: 'bg-red-500' };
}
