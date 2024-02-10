import { IArrivedData, IArrivedInfoList } from "../../../types/study/study";

import { Dayjs } from "dayjs";
import { Fragment } from "react";
import styled from "styled-components";
import { LOCATION_OPEN } from "../../../constants/location";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { PLACE_TO_LOCATION } from "../../../storage/study";
import { Location } from "../../../types/system";
import RecordDetailStudyBlock from "./RecordDetailStudyBlock";

interface IRecordDetail {
  navMonth: Dayjs;
  filterData: IArrivedData[];
}

export interface ISortedLocationStudies {
  location: Location;
  places: IArrivedInfoList[];
}

function RecordDetail({ filterData, navMonth }: IRecordDetail) {
  const reversedData = [...filterData]
    ?.reverse()
    .filter((item) => item && item.arrivedInfoList.length);

  const initializeLocations = () =>
    LOCATION_OPEN.map((location) => ({ location, places: [] }));

  const setSortedStudies = (arrivedData): ISortedLocationStudies[] => {
    return arrivedData.arrivedInfoList.reduce((acc, curr) => {
      const location = PLACE_TO_LOCATION[curr.placeId];
      const findItem = acc.find((item) => item.location === location) || {
        location,
        places: [],
      };
      findItem.places.push(curr);
      return acc;
    }, initializeLocations());
  };

  return (
    <Layout>
      {reversedData.map((arrivedData, idx) => {
        const sortedLocationStudies = setSortedStudies(arrivedData);
        return (
          <Fragment key={idx}>
            <Date>
              {dayjsToFormat(
                navMonth.date(arrivedData?.date).add(1, "day"),
                "M/D"
              )}
            </Date>
            {sortedLocationStudies.map((locationStudies, idx2) => (
              <RecordDetailStudyBlock
                locationStudies={locationStudies}
                key={idx2}
              />
            ))}
          </Fragment>
        );
      })}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--margin-main);
`;

const Date = styled.div`
  margin-top: var(--margin-md);
  margin-bottom: var(--margin-main);
  margin-left: 2px;
  font-size: 16px;
  font-weight: 600;
  color: var(--font-h2);
`;

export default RecordDetail;
