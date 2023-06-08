import styled from "styled-components";

import { motion } from "framer-motion";
import { useState } from "react";
import Header from "../../components/layouts/Header";
import Seo from "../../components/Seo";
import { noticeData } from "../../storage/notice";

import { Accordion } from "@chakra-ui/react";
import NoticeItem from "../../pagesComponents/Notice/NoticeItem";

function Notice() {
  const [isNotice, setIsNotice] = useState(true);

  noticeData.sort((a, b) => {
    if (Number(a.id) > Number(b.id)) return -1;
    if (Number(a.id) < Number(b.id)) return 1;
    return 0;
  });

  return (
    <NoticeLayout
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <Seo title="Notice" />
      <Header title="알림" />
      <Layout>
        <Category>
          <Button isSelected={isNotice} onClick={() => setIsNotice(true)}>
            공지 알림
          </Button>
          <Button isSelected={!isNotice} onClick={() => setIsNotice(false)}>
            활동 알림
          </Button>
        </Category>
        <Main>
          {/* <Content>도착한 알림이 없습니다.</Content> */}
          <Accordion allowToggle>
            {noticeData.map((item) => (
              <NoticeItem key={item.id} item={item} isNotice={isNotice} />
            ))}
          </Accordion>
        </Main>
      </Layout>
    </NoticeLayout>
  );
}

const NoticeLayout = styled(motion.div)``;

const Layout = styled.div`
  margin-top: 14px;
`;

const Category = styled.div`
  display: flex;
`;
const Button = styled.div<{ isSelected: boolean }>`
  width: 50%;
  text-align: center;
  font-weight: 600;
  padding-bottom: 8px;
  border-bottom: ${(props) =>
    props.isSelected ? "2px solid var(--font-h1)" : null};
  color: ${(props) => (props.isSelected ? " var(--font-h1)" : "#767d8a")};
`;

const Main = styled.main`
  color: var(--font-h1);
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Content = styled.div`
  height: 80px;
`;

export default Notice;
