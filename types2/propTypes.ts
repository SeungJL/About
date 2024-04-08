import { ThemeTypings } from "@chakra-ui/react";
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

export interface ITextAndColorSchemes {
  text: string;
  colorScheme: ThemeTypings["colorSchemes"];
}
