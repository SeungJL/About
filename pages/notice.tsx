import styled from "styled-components";
import CreateNotice from "../components/Pages/Notice/CreateNotice";
import NoticeCategory from "../components/Pages/Notice/NoticeCategory";
import NoticeContents from "../components/Pages/Notice/NoticeContents";
import Seo from "../components/common/Seo";
import Header from "../components/common/Header";
import { useState } from "react";
import { motion } from "framer-motion";

// const MainContent = styled.main`
//   background: RGB(113, 85, 63, 0.9);
//   display: flex;
//   flex-direction: column;
//   align-items: stretch;
//   height: 93%;
//   border-radius: 10px;

//   padding: 15px 5px;
// `;

function Notice() {
  const [isNotice, setIsNotice] = useState(true);
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
          <Content>도착한 알림이 없습니다.</Content>
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
  border-bottom: ${(props) =>
    props.isSelected ? "2px solid var(--font-h1)" : null};
  color: ${(props) => (props.isSelected ? " var(--font-h1)" : "#767d8a")};
`;

const Main = styled.main`
  margin: 30px 16px 34px 16px;
  color: var(--font-h1);
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  height: 80px;
`;

export default Notice;
