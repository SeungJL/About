import { ACTIVE_LOCATIONS } from "../constants/locationConstants";
import { ActiveLocation } from "../types2/serviceTypes/locationTypes";

export function isLocationType(value: string): value is ActiveLocation {
  return ACTIVE_LOCATIONS.includes(value as ActiveLocation);
}
