export type UserRank = 'active_citizen' | 'street_knight' | 'golden_volunteer';

export interface RankInfo {
  id: UserRank;
  name: string;
  minPoints: number;
  badge: string;
  color: string;
  gradient: string;
  benefits: string[];
}

export interface RewardTransaction {
  id: string;
  type: 'earn' | 'redeem' | 'penalty';
  points: number; // positive for earn, negative for redeem/penalty
  title: string;
  description: string;
  district?: string;
  createdAt: string;
}

export type RewardCategory = 'all' | 'telco' | 'fuel' | 'transit' | 'mart' | 'gear';

export interface RewardItem {
  id: string;
  title: string;
  category: RewardCategory;
  pointsCost: number;
  partner: string;
  partnerLogo?: string;
  description: string;
  value: string;
  tag?: string;
  requiredRank?: UserRank;
  stock: number;
  featured?: boolean;
}

export interface RedeemedVoucher {
  id: string;
  rewardId: string;
  title: string;
  code: string;
  value: string;
  partner: string;
  category: RewardCategory;
  redeemedAt: string;
  expiresAt: string;
  status: 'available' | 'used';
  qrCodeUrl?: string;
}

export interface UserRewardsProfile {
  userId: string;
  fullName: string;
  phone: string;
  points: number;
  lifetimePoints: number;
  trustScore: number; // 0 - 100, default 100
  rank: UserRank;
  dailyDistrictReports: Record<string, number>; // district -> count today
  todayTotalReports: number;
  isRestricted: boolean; // if trustScore < 50
  restrictionReason?: string;
  history: RewardTransaction[];
  vouchers: RedeemedVoucher[];
}
