import React from 'react';

export interface PolygonZone {
  id: string;
  district: string;
  name: string;
  riskLevel: 'safe' | 'warning' | 'danger' | 'critical';
  fillColor: string;
  coordinates: string; // SVG path or polygon points
}

export const sampleFloodPolygons: PolygonZone[] = [
  {
    id: 'Z-01',
    district: 'Bình Thạnh',
    name: 'Vùng trũng Bán đảo Thanh Đa',
    riskLevel: 'critical',
    fillColor: 'rgba(239, 68, 68, 0.45)',
    coordinates: 'M 180 80 L 260 90 L 250 160 L 170 140 Z'
  },
  {
    id: 'Z-02',
    district: 'Quận 7',
    name: 'Vùng trũng ven rạch Đĩa & Phú Thuận',
    riskLevel: 'danger',
    fillColor: 'rgba(249, 115, 22, 0.4)',
    coordinates: 'M 220 220 L 320 200 L 340 280 L 240 290 Z'
  },
  {
    id: 'Z-03',
    district: 'TP. Thủ Đức',
    name: 'Lưu vực Chợ Thủ Đức - Rạch Cầu Ngang',
    riskLevel: 'danger',
    fillColor: 'rgba(249, 115, 22, 0.4)',
    coordinates: 'M 320 60 L 410 70 L 390 130 L 310 110 Z'
  }
];

interface FloodPolygonLayerProps {
  onSelectZone?: (zone: PolygonZone) => void;
}

export const FloodPolygonLayer: React.FC<FloodPolygonLayerProps> = ({ onSelectZone }) => {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto'
      }}
    >
      {sampleFloodPolygons.map((zone) => (
        <path
          key={zone.id}
          d={zone.coordinates}
          fill={zone.fillColor}
          stroke={zone.riskLevel === 'critical' ? '#ef4444' : '#f97316'}
          strokeWidth="2"
          strokeDasharray="4 2"
          style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
          onClick={() => onSelectZone && onSelectZone(zone)}
        >
          <title>{`${zone.name} (${zone.district}) - Mức độ: ${zone.riskLevel}`}</title>
        </path>
      ))}
    </svg>
  );
};
