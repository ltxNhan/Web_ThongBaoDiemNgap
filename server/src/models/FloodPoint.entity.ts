export interface FloodPointEntity {
  id: string;
  street: string;
  district: string;
  depthCm: number;
  level: 'safe' | 'warning' | 'danger' | 'critical';
  latitude: number;
  longitude: number;
  elevationM: number;
  description: string;
  isVerified: boolean;
  updatedAt: Date;
}
