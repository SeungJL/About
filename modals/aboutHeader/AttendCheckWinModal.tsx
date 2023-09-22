import { Button } from "@chakra-ui/react";
import { faLollipop } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ModalLayout } from "../../components/modals/Modals";
import { attendCheckWinGiftState } from "../../recoil/renderTriggerAtoms";
import { IModal } from "../../types/reactTypes";

interface IAttendCheckWinModal extends IModal {}

function AttendCheckWinModal({ setIsModal }: IAttendCheckWinModal) {
  const [attendCheckWinGift, setAttendCheckWinGift] = useRecoilState(
    attendCheckWinGiftState
  );

  const onClick = () => {
    setIsModal(false);
    setAttendCheckWinGift(null);
  };

  if (!attendCheckWinGift) return;
  return (
    <ModalLayout size="lg">
      <Header>
        <FontAwesomeIcon icon={faLollipop} color="var(--color-mint)" />
        <span>랜덤 선물 당첨</span>
        <FontAwesomeIcon icon={faLollipop} color="var(--color-mint)" />
      </Header>
      <Container>
        <Message>
          <b>{attendCheckWinGift.percent}%</b>의 확률을 뚫고 당첨되었어요 !
        </Message>
        <GiftWrapper>
          <Gift>{attendCheckWinGift.item}</Gift>
        </GiftWrapper>
      </Container>
      <SubMessage>
        {attendCheckWinGift.item.includes("Point")
          ? "포인트는 즉시 적립되었습니다."
          : "상품은 운영진이 확인하는대로 카톡으로 보내드려요!"}
      </SubMessage>
      <Button colorScheme="mintTheme" onClick={onClick}>
        확인
      </Button>
    </ModalLayout>
  );
}

const Header = styled.header`
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const GiftWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Gift = styled.div`
  border: var(--border-mint);
  width: 80%;
  height: 50%;
  border-radius: var(--border-radius-main);
  font-size: 16px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.div`
  margin-top: var(--margin-sub);
  text-align: center;
  color: var(--font-h1);
  > span:nth-child(2) {
    margin: 0 var(--margin-min);
  }
`;

const SubMessage = styled.span`
  margin-bottom: var(--margin-main);
  font-size: 12px;
  color: var(--font-h3);
`;

export default AttendCheckWinModal;
