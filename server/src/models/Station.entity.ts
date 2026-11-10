export interface StationEntity {
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
  lastUpdated?: string;
  lastPing?: string;
}
