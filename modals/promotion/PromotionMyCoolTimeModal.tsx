import { faCircle } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { PROMOTION_WIN } from "../../storage/winRecord";
import { IPromotionApply } from "../../types/page/promotion";
import { IModal } from "../../types/reactTypes";

interface IPromotionMyCoolTimeModal extends IModal {
  myApply: IPromotionApply;
}

function PromotionMyCoolTimeModal({ setIsModal }: IModal) {
  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalHeader text="지난 당첨 기록" />
      <ModalBody>
        <Container>
          {PROMOTION_WIN.map((item, idx) => (
            <Item key={idx}>
              <Title>
                <Month>{item.month}월 당첨자</Month>
                {item?.rate && (
                  <Rank>
                    <span>당첨률 </span>
                    <span>{item.rate}</span>
                  </Rank>
                )}
              </Title>
              <Gift>
                <span>상품:</span>
                <span>{item.gift}</span>
              </Gift>
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
      </ModalBody>
      <ModalFooterOne onClick={() => setIsModal(false)} />
    </ModalLayout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-main);
  flex: 1;
  overflow-y: auto;
  border: var(--border-mint);
  border-radius: var(--border-radius-main);
`;

const Rank = styled.div`
  font-size: 11px;
  color: var(--color-mint);
`;

const Item = styled.div`
  padding: var(--padding-md) 0;
  border-bottom: var(--border-main-light);
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
  font-size: 12px;
  font-weight: 600;
  color: var(--font-h2);
`;

const WinnerItem = styled.div`
  margin-right: var(--margin-sub);
`;

const Gift = styled.div`
  color: var(--font-h1);
  font-size: 13px;
  margin-bottom: var(--margin-md);

  > span:first-child {
    margin-right: var(--margin-min);
  }
  > span:last-child {
    font-weight: 600;
  }
`;

const Info = styled.div``;

const Uni = styled.span`
  font-weight: 600;
  color: var(--font-h2);
  font-size: 14px;
  flex: 0.4;
`;

export default PromotionMyCoolTimeModal;
