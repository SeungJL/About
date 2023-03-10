import Link from "next/link";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isShowNotCompletedState } from "../../recoil/modalAtoms";

import { BaseModal, FullScreen } from "../../styles/LayoutStyles";

const ModalLayout = styled(BaseModal)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  width: 280px;
  height: 160px;
  font-size: 16px;
  padding: 0;
  padding-top: 25px;
  > span {
    font-size: 14px;
    color: rgb(0, 0, 0, 0.6);
  }
  > div {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-color);
    color: white;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

function NotCompletedModal() {
  const setIsNotCompletedState = useSetRecoilState(isShowNotCompletedState);
  return (
    <>
      <ModalLayout>
        개발이 완료되지 않은 기능입니다.
        <br />
        <span>조금만 더 기다려주세요!</span>
        <div onClick={() => setIsNotCompletedState(false)}>닫기</div>
      </ModalLayout>
      <FullScreen onClick={() => setIsNotCompletedState(false)} />
    </>
  );
}
export default NotCompletedModal;
