export interface RescueUnitEntity {
  id: string;
  name: string;
  districtCoverage: string[];
  hotline: string;
  baseLocationLat: number;
  baseLocationLng: number;
  availableBoats: number;
  availableTrucks: number;
  dutyCommander: string;
  isAvailable: boolean;
}
