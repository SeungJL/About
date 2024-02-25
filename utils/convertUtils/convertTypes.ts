import { LocationEn } from "../../types2/serviceTypes/locationTypes";

export const createUrlWithLocation = (url: string, locationParam: LocationEn) =>
  url + `?location=${locationParam}`;
