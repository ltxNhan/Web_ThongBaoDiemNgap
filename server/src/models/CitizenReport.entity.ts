export interface CitizenReportEntity {
  id: string;
  reporterPhone?: string;
  reporterName?: string;
  street: string;
  district: string;
  depthEstimateCm: number;
  description: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
  status: 'pending' | 'approved' | 'rejected';
  moderatedByStaffId?: string;
  moderatedAt?: Date;
  createdAt: Date;
}
