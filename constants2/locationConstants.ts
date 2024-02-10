import {
  ActiveLocation,
  InactiveLocation,
  Location,
} from "@/types/serviceTypes/locationTypes";

export const ACTIVE_LOCATIONS: ActiveLocation[] = [
  "수원",
  "양천",
  "안양",
  "강남",
  "동대문",
];

export const INACTIVE_LOCATIONS: InactiveLocation[] = ["마포", "인천"];

export const LOCATIONS: Location[] = [
  ...ACTIVE_LOCATIONS,
  ...INACTIVE_LOCATIONS,
];
