import { getStudyStandardDate } from "../libs/study/date/getStudyStandardDate";
import {
  ActiveLocation,
  LocationEn,
} from "../types/serviceTypes/locationTypes";
import { convertLocationLangTo } from "./converterHelpers";

export const getUrlWithLocationAndDate = (
  locationParam: LocationEn,
  dateParam: string,
  userLocation: ActiveLocation = "수원"
) => {
  const location =
    locationParam || convertLocationLangTo(userLocation || "suw", "en");
  const locationBaseUrl = `/home?location=${location}`;
  const dateQuery = !dateParam ? `&date=${getStudyStandardDate()}` : "";

  return locationBaseUrl + dateQuery;
};
