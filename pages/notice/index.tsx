import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageSlide from "../../components/layout/PageSlide";
import { useNoticeActiveLogQuery } from "../../hooks/user/sub/interaction/queries";
import NoticeActive from "../../pageTemplates/notice/NoticeActive";
import NoticeItem from "../../pageTemplates/notice/NoticeItem";
import NoticeNav from "../../pageTemplates/notice/NoticeNav";

function Notice() {
  const [isNotice, setIsNotice] = useState(true);

  const { data: activeLogs } = useNoticeActiveLogQuery();

  return (
    <PageSlide>
      <Header title="알림" />
      <Layout>
        <NoticeNav
          isNotice={isNotice}
          setIsNotice={setIsNotice}
          activeAlertCnt={activeLogs?.length}
        />
        <Container>
          {isNotice ? <NoticeItem /> : <NoticeActive activeLogs={activeLogs} />}
        </Container>
      </Layout>
    </PageSlide>
  );
}

const Layout = styled.div`
  background-color: white;
`;

const Container = styled.div`
  color: var(--gray-1);
  display: flex;
  flex-direction: column;
  margin-top: var(--gap-2);
`;

export default Notice;
