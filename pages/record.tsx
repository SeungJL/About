import { useState } from "react";
import styled from "styled-components";
import { useVoteRateQueries } from "../hooks/user/queries";

function Record() {
  const [isLog, setIsLog] = useState(true);

  return (
    <Layout>
      <AttendLog>
        <span>기록</span>

        <MainSection>
          <Category>
            <button>로그</button>
            <button>경고</button>
          </Category>
          1.내용
        </MainSection>
      </AttendLog>
      <GatherLog>
        {" "}
        <span>모임</span>
        <GatherSection>1</GatherSection>
      </GatherLog>
      <MoneyLog>
        돈 관리
        <MoneySection>2</MoneySection>
      </MoneyLog>
    </Layout>
  );
}

const Layout = styled.div`
  height: 90vh;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  > div {
    > section {
      background-color: lightgray;
      height: 100%;
    }
  }
`;

const AttendLog = styled.div`
  grid-column: 1;
  grid-row: 1/3;
`;

const Category = styled.div`
  background-color: lightgray;
`;
const MainSection = styled.section``;

const GatherSection = styled.section``;
const MoneySection = styled.section``;

const GatherLog = styled.div`
  grid-column: 2;
`;
const MoneyLog = styled.div`
  grid-column: 2;
  grid-row: 2;
`;

export default Record;
