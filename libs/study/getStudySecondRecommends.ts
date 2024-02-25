import { STUDY_DISTANCE } from "../../constants2/serviceConstants/studyConstants/studyDistanceConstants";
import { ActiveLocation } from "../../types2/serviceTypes/locationTypes";

export const getStudySecondRecommendation = (
  location: ActiveLocation,
  startPlace: string,
  targetDistance: number
) => {
  let placesAtDistance = new Set();

  const targets = STUDY_DISTANCE[location][targetDistance];
  if (targets) {
    targets.forEach((pair) => {
      if (pair[0] === startPlace) placesAtDistance.add(pair[1]);
      else if (pair[1] === startPlace) placesAtDistance.add(pair[0]);
    });
  }

  return Array.from(placesAtDistance);
};
