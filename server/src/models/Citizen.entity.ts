export interface CitizenEntity {
  id: string;
  phone: string;
  fullName: string;
  district: string;
  ward?: string;
  subscribedChannels: ('zalo' | 'sms' | 'push')[];
  isVerified: boolean;
  registeredAt: Date;
}
