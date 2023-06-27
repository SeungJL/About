import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isNotCompletedState } from "../../recoil/renderTrigger2Atoms";

import { ModalMd } from "../../styles/layout/modal";

function NotCompletedModal({ setIsModal }) {
  const setIsNotCompletedState = useSetRecoilState(isNotCompletedState);
  return (
    <>
      <ModalLayout>
        개발이 완료되지 않은 기능입니다.
        <br />
        <span>조금만 더 기다려주세요!</span>
        <div onClick={() => setIsModal(false)}>닫기</div>
      </ModalLayout>
    </>
  );
}

const ModalLayout = styled(ModalMd)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  width: var(--width-80);
  height: 160px;
  font-size: 14px;
  padding: 0;
  padding-top: 25px;
  font-weight: 600;

  > div {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--font-h5);
    font-weight: 600;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
export default NotCompletedModal;
