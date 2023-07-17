import { Accordion } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import Seo from "../../components/Seo";
import { NOTICE_ALERT } from "../../constants/localStorage";
import NoticeItem from "../../pagesComponents/notice/NoticeItem";
import { isNoticeAlertState } from "../../recoil/renderTriggerAtoms";
import { noticeData } from "../../storage/notice";

function Notice() {
  const [isNotice, setIsNotice] = useState(true);

  noticeData.sort((a, b) => Number(b.id) - Number(a.id));

  const [isNoticeAlert, setIsNoticeAlert] = useRecoilState(isNoticeAlertState);
  useEffect(() => {
    if (isNoticeAlert) {
      localStorage.setItem(NOTICE_ALERT, "read");
      setIsNoticeAlert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  padding-bottom: var(--margin-md);
  border-bottom: ${(props) => props.isSelected && "2px solid var(--font-h1)"};
  color: ${(props) =>
    props.isSelected ? " var(--font-h1)" : "var(--font-h3)"};
`;

const Main = styled.main`
  color: var(--font-h1);
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export default Notice;
