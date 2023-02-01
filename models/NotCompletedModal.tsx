import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isNotCompletedState } from "../recoil/atoms";
import { BaseModal, FullScreen } from "../styles/LayoutStyles";

const ModalLayout = styled(BaseModal)`
  text-align: center;
  width: 200px;
  height: 140px;
  font-size: 16px;
  padding: 20px;
`;

function NotCompletedModal() {
  const setIsNotCompletedState = useSetRecoilState(isNotCompletedState);
  return (
    <>
      <ModalLayout>
        아직 구현이 완료되지 않은 기능이에요!
        <br />
        <br />
        조금만 기다려주세요~!
      </ModalLayout>
      <FullScreen onClick={() => setIsNotCompletedState(false)} />
    </>
  );
}
export default NotCompletedModal;
