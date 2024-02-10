import { LocationEn } from "@/types/serviceTypes/locationTypes";

export const createUrlWithLocation = (url: string, locationParam: LocationEn) =>
  url + `?location=${locationParam}`;
