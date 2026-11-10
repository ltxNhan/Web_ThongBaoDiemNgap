export interface DistrictEntity {
  id: string;
  code: string;
  name: string;
  city: string;
  population: number;
  totalVulnerablePoints: number;
  createdAt: Date;
  updatedAt: Date;
}
