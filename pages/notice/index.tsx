import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import { LIKE_HEART_CNT, NOTICE_ALERT } from "../../constants/localStorage";
import { useInteractionLikeQuery } from "../../hooks/interaction/queries";
import NoticeActive from "../../pagesComponents/notice/NoticeActive";
import NoticeItem from "../../pagesComponents/notice/NoticeItem";
import { isNoticeAlertState } from "../../recoil/renderTriggerAtoms";
import { AlertIcon } from "../../styles/icons";

function Notice() {
  const [isNotice, setIsNotice] = useState(true);
  const [isNoticeAlert, setIsNoticeAlert] = useRecoilState(isNoticeAlertState);
  const [isActiveAlert, setIsActiveAlert] = useState(false);

  useEffect(() => {
    if (isNoticeAlert) {
      localStorage.setItem(NOTICE_ALERT, "read");
      setIsNoticeAlert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: likeData } = useInteractionLikeQuery({
    onSuccess(data) {
      const likeCnt = localStorage.getItem(LIKE_HEART_CNT);
      if (JSON.stringify(likeCnt)?.length !== data?.length) {
        console.log(JSON.stringify(likeCnt), data);
        setIsActiveAlert(true);
      }
    },
  });

  useEffect(() => {
    if (!isNotice) {
      localStorage.setItem(LIKE_HEART_CNT, `${likeData?.length}`);
      setIsActiveAlert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNotice, likeData?.length]);

  return (
    <PageLayout>
      <Header title="알림" />
      <Layout>
        <Category>
          <Button isSelected={isNotice} onClick={() => setIsNotice(true)}>
            공지 알림
          </Button>
          <Button isSelected={!isNotice} onClick={() => setIsNotice(false)}>
            활동 알림
            {isActiveAlert && (
              <IconWrapper>
                <Alert />
              </IconWrapper>
            )}
          </Button>
        </Category>
        <Main>
          {isNotice ? <NoticeItem /> : <NoticeActive likeData={likeData} />}
        </Main>
      </Layout>
    </PageLayout>
  );
}

const Alert = styled(AlertIcon)`
  position: absolute;
  top: 0;
  right: 30%;
  width: 6px;
  height: 6px;
`;

const Layout = styled.div`
  margin-top: 14px;
`;

const IconWrapper = styled.div``;

const Category = styled.div`
  display: flex;
`;
const Button = styled.div<{ isSelected: boolean }>`
  position: relative;
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
