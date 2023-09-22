import { Button } from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";
import { ModalLayout } from "../../../components/modals/Modals";
import { ModalHeaderCenter } from "../../../styles/layout/modal";
import { IModal } from "../../../types/reactTypes";
import BadgeInfoModalFirstInfo from "./BadgeInfoModalFirstInfo";
import BadgeInfoModalSecondInfo from "./BadgeInfoModalSecondInfo";

function BadgeInfoModal({ setIsModal }: IModal) {
  const [page, setPage] = useState(0);

  return (
    <ModalLayout size="xxl">
      {page === 0 ? (
        <>
          <ModalHeaderCenter>
            <span>멤버 배지</span>
            <div>
              멤버 등급은 기본적으로 7가지로 나뉩니다. <br />
              흭득한 배지는 선택해서 사용할 수 있습니다.
            </div>
          </ModalHeaderCenter>
          <BadgeInfoModalFirstInfo />
          <Footer onClick={() => setPage(1)}>
            <Button colorScheme="mintTheme">다음 페이지</Button>
          </Footer>
        </>
      ) : (
        <>
          <ModalHeaderCenter>
            <span>유니크 배지</span>
            <div>특정한 기간 또는 이벤트를 통해 얻을 수 있습니다.</div>
          </ModalHeaderCenter>
          <BadgeInfoModalSecondInfo />
          <Footer onClick={() => setIsModal(false)}>
            <Button colorScheme="mintTheme">확인했어요!</Button>
          </Footer>
        </>
      )}
    </ModalLayout>
  );
}

const Footer = styled.footer`
  margin-top: var(--margin-main);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default BadgeInfoModal;
