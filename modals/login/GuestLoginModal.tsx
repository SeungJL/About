import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import { ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

interface IGuestLoginModal extends IModal {
  customSignin: (type: "member" | "guest") => void;
}

function GuestLoginModal({ setIsModal, customSignin }: IGuestLoginModal) {
  return (
    <>
      <ModalLayout size="md" isWideShort={true}>
        <ModalHeaderX title="게스트 로그인" setIsModal={setIsModal} />
        <Main>
          게스트 로그인은 동아리 외부인을 위한 것으로 기능과 이용에 많은 제한이
          있습니다.
          <span>
            동아리 소속의 인원은 카카오 로그인을 통해 접속해 주시기 바랍니다.
          </span>
        </Main>
        <Footer>
          <Button
            w="50%"
            mr="var(--margin-sub)"
            onClick={() => setIsModal(false)}
          >
            닫기
          </Button>
          <Button
            colorScheme="mintTheme"
            w="50%"
            onClick={() => customSignin("guest")}
          >
            로그인
          </Button>
        </Footer>
      </ModalLayout>
    </>
  );
}

const Main = styled(ModalMain)`
  line-height: 1.7;
  > span {
    margin-top: var(--margin-md);
    font-weight: 600;
  }
`;

const Footer = styled.div`
  display: flex;
`;

export default GuestLoginModal;
