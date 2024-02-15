import { Button } from "@chakra-ui/react";
import { useState } from "react";
import styled from "styled-components";
import {
  ModalBody,
  ModalHeaderCenter,
  ModalLayout,
} from "../../../components/modals/Modals";

import { IModal } from "../../../types/reactTypes";
import BadgeInfoModalFirstInfo from "./BadgeInfoModalFirstInfo";
import BadgeInfoModalSecondInfo from "./BadgeInfoModalSecondInfo";

function BadgeInfoModal({ setIsModal }: IModal) {
  const [page, setPage] = useState(0);

  const onClick = () => {
    if (page === 0) setPage(1);
    else setIsModal(false);
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xxl">
      <ModalHeaderCenter text={page === 0 ? "멤버 배지" : "유니크 배지"} />
      <ModalBody>
        <Subtitle>
          {page === 0
            ? "활동을 통해 다양한 배지를 획득해 보세요!"
            : "특정 기간 또는 이벤트를 통해 획득 수 있습니다!"}
        </Subtitle>
        {page === 0 ? (
          <BadgeInfoModalFirstInfo />
        ) : (
          <BadgeInfoModalSecondInfo />
        )}
      </ModalBody>
      <Footer>
        <Button onClick={onClick} colorScheme="mintTheme">
          {page === 0 ? "다음 페이지" : "확인했어요!"}
        </Button>
      </Footer>
    </ModalLayout>
  );
}

const Subtitle = styled.div`
  text-align: center;
`;

const Footer = styled.footer`
  padding: var(--gap-3) var(--gap-4);
  display: flex;
  justify-content: center;
`;

export default BadgeInfoModal;
