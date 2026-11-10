export type FloodSeverity = 'safe' | 'warning' | 'danger' | 'critical';

export interface FloodPoint {
  id: string;
  street: string;
  district: string;
  depthCm: number;
  level: FloodSeverity;
  lat: number;
  lng: number;
  description?: string;
  updatedAt: string;
}

export interface Station {
  id: string;
  code: string;
  name: string;
  type: 'rain' | 'tide' | 'combined';
  status: 'online' | 'offline' | 'error';
  currentRainMm: number;
  currentTideM: number;
  lat: number;
  lng: number;
  lastUpdated: string;
}

export interface CitizenReport {
  id: string;
  userName: string;
  userPhone: string;
  street: string;
  district: string;
  depthEstimate: number; // in cm
  image?: string;
  description: string;
  lat: number;
  lng: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface FloodAlert {
  id: string;
  level: 1 | 2 | 3;
  title: string;
  content: string;
  affectedDistricts: string[];
  issuedAt: string;
  validUntil: string;
}

export interface RescueRequest {
  id: string;
  citizenName: string;
  phone: string;
  address: string;
  district: string;
  needType: 'boat' | 'medical' | 'elderly' | 'evacuation';
  peopleCount: number;
  status: 'pending' | 'dispatching' | 'rescued';
  lat?: number;
  lng?: number;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  district: string;
  tag: 'Cứu hộ' | 'Hỏi đường' | 'Xe chết máy' | 'Cảnh báo';
  content: string;
  upvotes: number;
  commentsCount: number;
  createdAt: string;
}

export interface User {
  id: string;
  phone: string;
  fullName: string;
  district: string;
  subscribedAlerts: boolean;
  token?: string;
}
