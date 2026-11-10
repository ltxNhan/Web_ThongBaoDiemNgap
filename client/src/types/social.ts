export type UserBadgeType = 
  | 'ACTIVE_CITIZEN' 
  | 'ROUTE_GUARDIAN' 
  | 'FLOOD_KNIGHT' 
  | 'PIONEER_VOLUNTEER';

export interface BadgeConfig {
  id: UserBadgeType;
  name: string;
  badge: string;
  color: string;
  bgRgba: string;
  gradient: string;
  requirement: string;
  description: string;
  minPoints?: number;
  requiredDeepReports?: number;
}

export interface FriendUser {
  id: string;
  name: string;
  phone: string;
  district: string;
  avatar: string;
  badge: UserBadgeType;
  online: boolean;
  lastActive: string;
  distanceKm?: number;
  status: 'friend' | 'pending_sent' | 'pending_received' | 'suggested';
  recentReportStreet?: string;
}

export interface ChatMessageLocation {
  lat: number;
  lng: number;
  streetName: string;
  district: string;
  depthCm?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  location?: ChatMessageLocation;
  image?: string;
  createdAt: string;
  isRead: boolean;
}

export interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  phone: string;
  district: string;
  avatar: string;
  badge: UserBadgeType;
  monthlyPoints: number;
  lifetimePoints: number;
  deepReportsCount: number;
  isCurrentUser?: boolean;
}
