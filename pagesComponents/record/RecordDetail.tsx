import styled from "styled-components";
import { IArrivedData } from "../../types/study/study";

import { Dayjs } from "dayjs";
import { LOCATION_TABLE_COLOR } from "../../constants/location";
import { dayjsToFormat } from "../../helpers/dateHelpers";
import { PLACE_TO_LOCATION, PLACE_TO_NAME } from "../../storage/study";
import { Location } from "../../types/system";

interface IRecordDetail {
  navMonth: Dayjs;
  filterData: IArrivedData[];
}
function RecordDetail({ filterData, navMonth }: IRecordDetail) {

  const reversedData = [...filterData]
    ?.reverse()
    .filter((item) => item && item.arrivedInfoList.length);

  return (
    <Layout>
      {reversedData.map((item, idx) => (
        <Block key={idx}>
          {item?.arrivedInfoList?.length > 0 && (
            <>
              <Date>
                {dayjsToFormat(navMonth.date(item?.date).add(1, "day"), "M/D")}
              </Date>
              <StudyInfo>
                {item.arrivedInfoList.map((space, idx2) => (
                  <PlaceInfo key={idx2}>
                    <PlaceName>
                      <span>{PLACE_TO_NAME[space.placeId]}</span>
                      <OpenLocation location={PLACE_TO_LOCATION[space.placeId]}>
                        {PLACE_TO_LOCATION[space.placeId]}
                      </OpenLocation>
                    </PlaceName>
                    <MemberWrapper>
                      {space.arrivedInfo.map((who, idx3) => (
                        <Member key={idx3}>{who.name}</Member>
                      ))}
                    </MemberWrapper>
                  </PlaceInfo>
                ))}
              </StudyInfo>
            </>
          )}
        </Block>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const Block = styled.div`
  border-top: 4px solid var(--font-h56);
  padding: var(--padding-sub) var(--padding-main);
  padding-bottom: 0;
`;
const Date = styled.div`
  margin-bottom: var(--margin-sub);
  font-size: 13px;
  color: var(--font-h2);
`;
const StudyInfo = styled.div`
  font-size: 12px;
  color: var(--font-h2);
`;
const PlaceInfo = styled.div`
  margin-bottom: var(--margin-sub);
`;

const PlaceName = styled.div`
  display: flex;
  align-items: center;
  color: var(--font-h2);
  font-size: 14px;
  > span:first-child {
    font-weight: 600;
    margin-right: var(--margin-min);
  }
`;
const OpenLocation = styled.span<{ location: Location }>`
  font-size: 11px;
  color: ${(props) => LOCATION_TABLE_COLOR[props.location]};
`;

const MemberWrapper = styled.div`
  margin-top: var(--margin-sub);

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  align-items: center;
  line-height: 2;
`;

const Member = styled.span`
  margin-right: var(--margin-min);
  color: var(--font-h3);
`;

export default RecordDetail;
