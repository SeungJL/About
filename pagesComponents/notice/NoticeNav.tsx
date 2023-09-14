import { useEffect, useState } from "react";
import styled from "styled-components";
import { LIKE_HEART_CNT } from "../../constants/localStorage";
import { AlertIcon } from "../../styles/icons";
import { DispatchBoolean } from "../../types/reactTypes";

interface INoticeNav {
  isNotice: boolean;
  setIsNotice: DispatchBoolean;
  activeAlertCnt: number;
}

function NoticeNav({ isNotice, setIsNotice, activeAlertCnt }: INoticeNav) {
  const [isActiveAlert, setIsActiveAlert] = useState(false);

  useEffect(() => {
    if (!activeAlertCnt) return;
    if (!isNotice) {
      localStorage.setItem(LIKE_HEART_CNT, `${activeAlertCnt}`);
      setIsActiveAlert(false);
    }
    if (+localStorage.getItem(LIKE_HEART_CNT) < activeAlertCnt)
      setIsActiveAlert(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAlertCnt, isNotice]);

  return (
    <Layout>
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
    </Layout>
  );
}

const Layout = styled.div`
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
const IconWrapper = styled.div``;

const Alert = styled(AlertIcon)`
  position: absolute;
  top: 0;
  right: 30%;
  width: 6px;
  height: 6px;
`;

export default NoticeNav;
