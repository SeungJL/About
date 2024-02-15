import { ModalHeader } from "@chakra-ui/react";
import { faLollipop } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalLayout,
} from "../../../components/modals/Modals";
import { attendCheckWinGiftState } from "../../../recoil/renderTriggerAtoms";
import { IModal } from "../../../types/reactTypes";

function DailyCheckWinModal({ setIsModal }: IModal) {
  const [attendCheckWinGift, setAttendCheckWinGift] = useRecoilState(
    attendCheckWinGiftState
  );

  const onClick = () => {
    setIsModal(false);
    setAttendCheckWinGift(null);
  };

  if (!attendCheckWinGift) return;

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader
        display="flex"
        p="var(--gap-3) var(--gap-4)"
        justifyContent="space-between"
      >
        <FontAwesomeIcon icon={faLollipop} color="var(--color-mint)" />
        <span>랜덤 선물 당첨</span>
        <FontAwesomeIcon icon={faLollipop} color="var(--color-mint)" />
      </ModalHeader>
      <ModalBody>
        <Message>
          <b>{attendCheckWinGift.percent}%</b> 확률을 뚫고 당첨되었어요!
        </Message>
        <GiftWrapper>
          <Gift>{attendCheckWinGift.item}</Gift>
        </GiftWrapper>
        <SubMessage>
          {attendCheckWinGift.item.includes("Point")
            ? "포인트가 적립되었습니다."
            : "상품은 확인후 카톡으로 보내드립니다."}
        </SubMessage>
      </ModalBody>
      <ModalFooterOne text="확인" onClick={onClick} />
    </ModalLayout>
  );
}

const GiftWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Gift = styled.div`
  border: var(--border-mint);
  width: 80%;
  height: 60%;
  border-radius: var(--rounded-lg);
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  text-align: center;
  color: var(--gray-1);
  > span:nth-child(2) {
    margin: 0 var(--gap-1);
  }
`;

const SubMessage = styled.span`
  font-size: 12px;
  color: var(--gray-3);
  text-align: center;
`;

export default DailyCheckWinModal;
