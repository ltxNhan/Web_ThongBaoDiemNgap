export interface RescueRequestEntity {
  id: string;
  citizenName: string;
  phone: string;
  address: string;
  district: string;
  latitude?: number;
  longitude?: number;
  needType: 'boat' | 'medical' | 'elderly' | 'evacuation';
  peopleCount: number;
  notes?: string;
  status: 'pending' | 'dispatched' | 'rescued' | 'cancelled';
  dispatchedUnitId?: string;
  dispatchedAt?: Date;
  resolvedAt?: Date;
  createdAt: Date;
}
