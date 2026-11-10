/**
 * HCM FloodSafe - Design Tokens & TypeScript Types
 * Civic-Tech / Meteorological Editorial Standard (Slate Navy Edition)
 */

export const BRAND_COLORS = {
  navy: '#0E1A2B',
  blue: '#0B6BB5',
  blueHover: '#0A5C9B',
  accent: '#38A9E8',
  page: '#0E1A2B',
  surface: '#132235',
  subtle: '#182A40',
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.16)',
  ink: '#E6ECF2',
  description: '#A9B7C6',
  muted: '#8FA3B8',
  subtleText: '#8FA3B8'
} as const;

export const FLOOD_LEVELS = {
  safe: {
    key: 'safe',
    label: 'An toàn',
    range: '< 10 cm',
    color: '#3FB67A', // 20-25% desaturated green
    description: 'Nước khô ráo, tất cả phương tiện lưu thông bình thường.'
  },
  caution: {
    key: 'caution',
    label: 'Thận trọng',
    range: '10 - 25 cm',
    color: '#D9A93A', // 20-25% desaturated yellow
    description: 'Nước mấp mé mép đường, xe máy giảm tốc độ.'
  },
  danger: {
    key: 'danger',
    label: 'Nguy hiểm',
    range: '25 - 40 cm',
    color: '#E08A3C', // 20-25% desaturated orange
    description: 'Ngập nửa bánh xe, khuyến cáo xe máy không đi vào.'
  },
  critical: {
    key: 'critical',
    label: 'Rất nguy hiểm',
    range: '> 40 cm',
    color: '#D9534F', // 20-25% desaturated red
    description: 'Ngập sâu ngập ống pô xe máy, cấm phương tiện nhỏ.'
  },
  sos: {
    key: 'sos',
    label: 'Cứu nạn 114',
    color: '#C8312B'
  }
} as const;

export interface HeroSensorNode {
  id: string; // Sensor code: HCM-NHC-07
  name: string;
  street: string;
  district: string;
  depthCm: number;
  ratePerHourCm: number;
  lat: number;
  lng: number;
  status: 'online' | 'updating';
  lastPing: string;
}

export const HERO_SAMPLE_SENSORS: HeroSensorNode[] = [
  {
    id: 'HCM-NHC-07',
    name: 'Trạm Nguyễn Hữu Cảnh',
    street: 'Nguyễn Hữu Cảnh',
    district: 'Bình Thạnh',
    depthCm: 38,
    ratePerHourCm: 4,
    lat: 10.793,
    lng: 106.718,
    status: 'online',
    lastPing: '18 giây trước'
  },
  {
    id: 'HCM-HTP-03',
    name: 'Trạm Huỳnh Tấn Phát',
    street: 'Huỳnh Tấn Phát',
    district: 'Quận 7',
    depthCm: 29,
    ratePerHourCm: 2,
    lat: 10.738,
    lng: 106.732,
    status: 'online',
    lastPing: '24 giây trước'
  },
  {
    id: 'HCM-VVN-12',
    name: 'Trạm Võ Văn Ngân',
    street: 'Võ Văn Ngân',
    district: 'Thủ Đức',
    depthCm: 18,
    ratePerHourCm: -1,
    lat: 10.851,
    lng: 106.771,
    status: 'online',
    lastPing: '32 giây trước'
  },
  {
    id: 'HCM-TDA-01',
    name: 'Trạm Bình Quới - Thanh Đa',
    street: 'Bình Quới',
    district: 'Bình Thạnh',
    depthCm: 44,
    ratePerHourCm: 3,
    lat: 10.824,
    lng: 106.735,
    status: 'online',
    lastPing: '12 giây trước'
  }
];

export const INITIAL_LIVE_METRICS = {
  activeFloodPoints: 14,
  onlineSensors: 142,
  totalSensors: 150,
  todayCitizenReports: 1284,
  rescuedCases: 38
};
