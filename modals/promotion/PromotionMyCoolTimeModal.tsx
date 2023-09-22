import { faCircle } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modal/ModalComponents";
import { ModalLayout } from "../../components/modal/Modals";
import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";
import { IPromotionApply } from "../../types/page/promotion";
import { IModal } from "../../types/reactTypes";

interface IPromotionMyCoolTimeModal extends IModal {
  myApply: IPromotionApply;
}

function PromotionMyCoolTimeModal({
  myApply,
  setIsModal,
}: IPromotionMyCoolTimeModal) {
  const monthArr = [
    { month: 9, winner: [] },
    {
      month: 8,
      gift: "황금 올리브 치킨 세트",
      winner: [
        { name: "임성", location: "수원" },
        { name: "연", location: "수원" },
      ],
    },
    {
      month: 7,
      gift: "황금 올리브 치킨 세트",
      winner: [
        { name: "김소", location: "양천" },
        { name: "이승", location: "수원" },
        { name: "송재", location: "양천" },
      ],
    },
  ];

  const cool = dayjs(myApply.lastDate)
    .add(3, "day")
    .subtract(6, "hours")
    .diff(dayjs(), "hours");

  return (
    <ModalLayout size="xl">
      <ModalHeaderX title="지난 당첨 기록" setIsModal={setIsModal} />
      <ModalMain>
        <Container>
          {monthArr.map((item, idx) => (
            <Item key={idx}>
              <Title>
                <Month>{item.month}월 당첨자</Month>
                <Gift>황금 올리브 치킨 세트</Gift>
              </Title>
              <Winner>
                {item.winner.map((who, idx) => (
                  <WinnerItem key={idx}>
                    {who.name}
                    <FontAwesomeIcon icon={faCircle} size="sm" />({who.location}
                    )
                  </WinnerItem>
                ))}
              </Winner>
            </Item>
          ))}
        </Container>
      </ModalMain>
      <ModalFooterNav>
        <button
          onClick={() => {
            setIsModal(false);
          }}
        >
          확인
        </button>
      </ModalFooterNav>
    </ModalLayout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-main);
  flex: 1;

  border: var(--border-mint);
  border-radius: var(--border-radius-main);
`;

const Item = styled.div`
  margin-bottom: var(--margin-main);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-md);
`;

const Month = styled.div`
  font-weight: 600;

  font-size: 14px;
  margin-right: var(--margin-md);
`;

const Winner = styled.div`
  display: flex;
`;

const WinnerItem = styled.div`
  margin-right: var(--margin-sub);
`;

const Gift = styled.div`
  color: var(--font-h3);
  font-size: 11px;
`;

const Info = styled.div``;

const Uni = styled.span`
  font-weight: 600;
  color: var(--font-h2);
  font-size: 14px;
  flex: 0.4;
`;

export default PromotionMyCoolTimeModal;
