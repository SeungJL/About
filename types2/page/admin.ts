import { Location } from "../../types2/serviceTypes/locationTypes";

export interface ISpaceControl {
  branch?: string;
  latitude?: number;
  longitude?: number;
  brand?: string;
  location?: Location;
  status?: string;
  image?: string;
}

export interface ICounter {
  key: "enthusiasticMember";
  location: Location;
}
