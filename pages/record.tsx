import { useState } from "react";
import styled from "styled-components";
import RecordAttend from "../components/Record/RecordAttend";
import RecordGather from "../components/Record/RecordGather";
import RecordMoney from "../components/Record/RecordMoney";
import RecordNotice from "../components/Record/RecordNotice";
import { useVoteRateQueries } from "../hooks/user/queries";

function Record() {
  const [isLog, setIsLog] = useState(true);

  return (
    <Layout>
      <RecordNotice />
      <RecordAttend />
      <RecordGather />
      <RecordMoney />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  > div {
    margin-bottom: 10vh;
  }
`;

export default Record;
