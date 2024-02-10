import { ColorType } from "./assetTypes";
import { LocationEn } from "./serviceTypes/locationTypes";

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ILocationParam {
  locationParam: LocationEn;
}

export interface LinkButtonProp {
  text: string;
  url: string;
}

export interface ITextAndColorType {
  text: string;
  colorType: ColorType;
}
