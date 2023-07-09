import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import { useStudyCheckRecordsQuery } from "../../../hooks/study/queries";
interface IRecordDetailOverview {
  children: React.ReactNode;
}

function RecordDetailOverview({ children }: IRecordDetailOverview) {
  const [isFirst, setIsFirst] = useState();

//   const {data}=useStudyCheckRecordsQuery();
  return (
    <Layout>
      {children}
      <Container>
        <Title>{isFirst ? `${dayjs().month() + 1}월 참여` : "전체 참여"}</Title>
        <Value>

        </Value>
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  height: 160px;
  background-color: var(--color-mint);
`;

const Container = styled.div``;

const Title = styled.span``;

const Value = styled.span``;

const changeBtn = styled.button``;

export default RecordDetailOverview;
