export interface Station {
  id: string;
  code: string;
  name: string;
  type: 'rain' | 'tide' | 'combined';
  status: 'online' | 'offline' | 'error';
  currentRainMm: number;
  currentTideM: number;
  batteryPercent: number;
  signalDbm: number;
  lat: number;
  lng: number;
  lastPing: string;
}

export interface ModerationReport {
  id: string;
  userName: string;
  userPhone: string;
  street: string;
  district: string;
  depthEstimate: number;
  description: string;
  imageUrl?: string;
  lat: number;
  lng: number;
  closestStationName: string;
  sensorCorrelationMm: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  category: 'AUTH' | 'STATION' | 'MODERATION' | 'CONFIG' | 'SECURITY';
  staffName: string;
  ipAddress: string;
  timestamp: string;
  severity: 'info' | 'warn' | 'error';
}

export interface SystemConfig {
  alarmThreshold1: number; // 1.40
  alarmThreshold2: number; // 1.50
  alarmThreshold3: number; // 1.60
  rainAlertThreshold: number; // 50 mm/h
  floodDepthCritical: number; // 40 cm
  iotStationScanFrequencyMin: number; // 5 min
  aiModelRunFrequencyMin: number; // 15 min
  autoTelegramTrigger: boolean;
  autoSmsZnsTrigger: boolean;
  weatherApiKey: string;
  gisTileServerUrl: string;
}

export interface RescueDispatchItem {
  id: string;
  citizenName: string;
  phone: string;
  address: string;
  district: string;
  needType: string;
  peopleCount: number;
  status: 'pending' | 'dispatched' | 'completed';
  assignedUnit?: string;
  createdAt: string;
}
