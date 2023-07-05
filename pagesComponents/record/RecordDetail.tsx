import styled from "styled-components";
import { IArrivedData } from "../../types/studyRecord";

import dayjs from "dayjs";
import { SPACE_NAME } from "../../storage/study";

interface IRecordDetail {
  monthData: IArrivedData[];
}
function RecordDetail({ monthData }: IRecordDetail) {
  console.log(34, monthData);
  const reversedData = [...monthData]?.reverse();
  console.log(reversedData);
  return (
    <>
      {reversedData && (
        <Layout>
          {reversedData?.map((item, idx) => (
            <Block key={idx}>
              {item !== null && item?.arrivedInfoList.length !== 0 && (
                <>
                  <Date>
                    {dayjs()
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
      )}
    </>
  );
}

const Layout = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Block = styled.div``;
const Date = styled.div`
  padding: 4px 14px;
  font-weight: 600;
  font-size: 12px;
  color: var(--font-h3);
  background-color: var(--font-h7);
`;

const SpaceWrapper = styled.div`
  padding: 14px;
  padding-bottom: 6px;
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
    margin-right: 12px;
  }
  > span:last-child {
    font-size: 12px;
    > span {
      font-weight: 600;
    }
  }
`;

const MemberWrapper = styled.div`
  padding: 8px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, auto));

  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--font-h6);
  line-height: 2;
  > span {
    color: var(--font-h3);
    margin-right: 8px;
  }
`;

const Member = styled.div`
  margin-right: 4px;

  color: var(--font-h1);
`;

export default RecordDetail;
