import { faEllipsis } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { LOCATION_TABLE_COLOR } from "../../../constants/location";
import { PLACE_TO_LOCATION, PLACE_TO_NAME } from "../../../storage/study";
import { Location } from "../../../types/system";
import { ISortedLocationStudies } from "./RecordDetail";

interface IRecordDetailStudyBlock {
  locationStudies: ISortedLocationStudies;
}

const RecordDetailStudyBlock = ({
  locationStudies,
}: IRecordDetailStudyBlock) => (
  <Container>
    {locationStudies.places.map((arrivedInfoList, idx) => {
      const placeId = arrivedInfoList.placeId;
      const location = PLACE_TO_LOCATION[placeId];
      return (
        <PlaceInfo key={idx} location={location}>
          <PlaceName>
            <span>{PLACE_TO_NAME[placeId]}</span>
            <OpenLocation location={location}>{location}</OpenLocation>
          </PlaceName>
          {arrivedInfoList?.arrivedInfo.length > 0 && (
            <MemberWrapper>
              {arrivedInfoList.arrivedInfo.map((user, idx2) => (
                <>
                  {idx2 < 4 && (
                    <Member key={idx2}>{user.name.slice(-2)}</Member>
                  )}
                  {idx2 === 4 && (
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      size="sm"
                      color="var(--font-h3)"
                    />
                  )}
                </>
              ))}
            </MemberWrapper>
          )}
        </PlaceInfo>
      );
    })}
  </Container>
);

const Container = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const PlaceInfo = styled.div<{ location: Location }>`
  width: 148px;
  flex-shrink: 0;
  margin-bottom: var(--margin-main);
  border: ${(props) => `1px solid ${LOCATION_TABLE_COLOR[props.location]}`};
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius-main);
  padding: var(--padding-md);
  margin-right: var(--margin-md);
`;

const PlaceName = styled.div`
  display: flex;
  align-items: center;
  color: var(--font-h2);
  > span:first-child {
    font-size: 13px;
    font-weight: 600;
    margin-right: var(--margin-md);
  }
`;

const OpenLocation = styled.span<{ location: Location }>`
  font-size: 11px;
  color: ${(props) => LOCATION_TABLE_COLOR[props.location]};
`;

const MemberWrapper = styled.div`
  margin-top: var(--margin-sub);
  display: flex;
  align-items: center;
`;

const Member = styled.span`
  margin-right: var(--margin-min);
  color: var(--font-h3);
  font-size: 13px;
`;

export default RecordDetailStudyBlock;
