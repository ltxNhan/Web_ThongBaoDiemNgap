export interface AlertEntity {
  id: string;
  level: 1 | 2 | 3;
  title: string;
  messageContent: string;
  affectedDistricts: string[];
  isCitywide: boolean;
  issuedByStaffId: string;
  status: 'active' | 'expired' | 'revoked';
  issuedAt: Date;
  expiresAt: Date;
}
