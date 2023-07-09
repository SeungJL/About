import { useState } from "react";
import styled from "styled-components";
interface IRecordDetailOverview {
  children: React.ReactNode;
}

function RecordDetailOverview({ children }: IRecordDetailOverview) {
  const [isFirst, setIsFirst] = useState();

  return (
    <Layout>
      {children}
      <Container>
        <Title></Title>
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
