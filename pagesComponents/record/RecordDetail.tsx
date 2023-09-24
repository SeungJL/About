import styled from "styled-components";
import { IArrivedData } from "../../types/study/study";

import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { isRecordLoadingState } from "../../recoil/loadingAtoms";
import { SPACE_NAME } from "../../storage/study";
import RecordDetailSkeleton from "./skeleton/RecordDetailSkeleton";

interface IRecordDetail {
  month: number;
  monthData: IArrivedData[];
}
function RecordDetail({ monthData, month }: IRecordDetail) {
  const isRecordLoading = useRecoilValue(isRecordLoadingState);
  const reversedData = [...monthData]?.reverse();
  return (
    <>
      {reversedData && !isRecordLoading ? (
        <Layout>
          {reversedData?.map((item, idx) => (
            <Block key={idx}>
              {item !== null && item?.arrivedInfoList.length !== 0 && (
                <>
                  <Date>
                    {dayjs()
                      .month(month)
                      .date(item?.date as number)
                      .add(1, "day")
                      .format("YYYY-MM-DD")}
                  </Date>
                  <SpaceWrapper>
                    {item.arrivedInfoList.map((space, idx2) => (
                      <div key={idx2}>
                        <SpaceHeader>
                          <span> {SPACE_NAME[space.placeId]}</span>
                          <span>
                            참여자수: <span>{space.arrivedInfo.length}명</span>
                          </span>
                        </SpaceHeader>
                        <MemberWrapper>
                          {space.arrivedInfo.map((who, idx3) => (
                            <Member key={idx3}>{who.name}</Member>
                          ))}
                        </MemberWrapper>
                      </div>
                    ))}
                  </SpaceWrapper>
                </>
              )}
            </Block>
          ))}
        </Layout>
      ) : (
        <RecordDetailSkeleton />
      )}
    </>
  );
}

const Layout = styled.div`
  margin-top: var(--margin-main);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Block = styled.div``;
const Date = styled.div`
  padding: var(--padding-min) var(--padding-main);
  font-weight: 600;
  font-size: 12px;
  color: var(--font-h3);
  background-color: var(--font-h7);
`;

const SpaceWrapper = styled.div`
  padding: var(--padding-main);
  font-size: 12px;
  color: var(--font-h2);
`;

const SpaceHeader = styled.header`
  display: flex;
  align-items: flex-end;
  color: var(--font-h2);
  font-size: 14px;
  > span:first-child {
    font-weight: 600;
    margin-right: var(--margin-sub);
  }
  > span:last-child {
    font-size: 12px;
    > span {
      font-weight: 600;
    }
  }
`;

const MemberWrapper = styled.div`
  padding: var(--padding-sub) 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));
  align-items: center;
  line-height: 2;
`;

const Member = styled.div`
  margin-right: var(--margin-min);
  color: var(--font-h1);
`;

export default RecordDetail;
