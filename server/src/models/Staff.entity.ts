export interface StaffEntity {
  id: string;
  username: string;
  fullName: string;
  role: 'admin' | 'moderator' | 'dispatcher' | 'technician';
  unit: string;
  phone: string;
  isActive: boolean;
  lastLoginAt?: Date;
}
