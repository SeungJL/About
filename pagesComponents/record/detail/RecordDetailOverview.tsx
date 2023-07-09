import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { useStudyArrivedCntQuery } from "../../../hooks/study/queries";
interface IRecordDetailOverview {
  children: React.ReactNode;
}

function RecordDetailOverview({ children }: IRecordDetailOverview) {
  const { data: session } = useSession();

  const [isFirst, setIsFirst] = useState();

  //   const {data}=useStudyCheckRecordsQuery();
  const { data: myArrivedCnt } = useStudyArrivedCntQuery();
  return (
    <Layout>
      {children}
      <Container>
        <Title>{isFirst ? `${dayjs().month() + 1}월 참여` : "전체 참여"}</Title>
        <Value>{isFirst ? 22 : myArrivedCnt[session?.uid]}</Value>
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
