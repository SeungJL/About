import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import { useNoticeActiveLogQuery } from "../../hooks/user/sub/interaction/queries";
import NoticeActive from "../../pagesComponents/notice/NoticeActive";
import NoticeItem from "../../pagesComponents/notice/NoticeItem";
import NoticeNav from "../../pagesComponents/notice/NoticeNav";

function Notice() {
  const [isNotice, setIsNotice] = useState(true);

  const { data: activeLogs } = useNoticeActiveLogQuery();

  return (
    <PageLayout>
      <Header title="알림" isNoLine={true} />
      <Layout>
        <NoticeNav
          isNotice={isNotice}
          setIsNotice={setIsNotice}
          activeAlertCnt={activeLogs?.length}
        />
        <Container>
          {isNotice ? <NoticeItem /> : <NoticeActive activeLogs={activeLogs}/>}
        </Container>
      </Layout>
    </PageLayout>
  );
}

const Layout = styled.div`
  margin-top: 14px;
`;

const Container = styled.div`
  color: var(--font-h1);
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export default Notice;
