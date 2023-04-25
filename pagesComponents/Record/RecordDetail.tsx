import styled from "styled-components";
import { IArrivedData } from "../../types/studyRecord";
import { Dispatch, SetStateAction } from "react";
import { SPACE_LOCATION, SPACE_NAME } from "../../constants/study";
import dayjs from "dayjs";

function RecordDetail({
  totalData,
  setMyRecentAttend,
}: {
  totalData: IArrivedData[];
  setMyRecentAttend: Dispatch<SetStateAction<string>>;
}) {
  console.log(totalData);
  return (
    <Layout>
      {[...totalData]?.reverse().map((item, idx) => (
        <Block key={idx}>
          <Date>{dayjs(item.date).add(1, "day").format("YYYY-MM-DD")}</Date>
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
                  <span>참여인원: </span>
                  {space.arrivedInfo.map((who, idx3) => (
                    <Member key={idx3}>{who.name}</Member>
                  ))}
                </MemberWrapper>
              </div>
            ))}
          </SpaceWrapper>
        </Block>
      ))}
    </Layout>
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
  align-items: center;
  color: var(--font-h2);
  font-size: 13px;
  > span:first-child {
    font-weight: 600;
    margin-right: 16px;
  }
  > span:last-child {
    font-size: 11px;
    > span {
      color: var(--font-h1);
      font-weight: 600;
    }
  }
`;

const MemberWrapper = styled.div`
  display: flex;

  height: 36px;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--font-h6);
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
