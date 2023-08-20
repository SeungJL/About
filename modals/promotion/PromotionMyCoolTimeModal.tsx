import dayjs from "dayjs";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
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
  const cool = dayjs(myApply.lastDate)
    .add(3, "day")
    .subtract(6, "hours")
    .diff(dayjs(), "hours");

  return (
    <ModalLayout size="md">
      <ModalHeaderX title="우리 학교 홍보 쿨타임" setIsModal={setIsModal} />
      <ModalMain>
        {myApply && <Uni>{myApply.name}</Uni>}
        <Container>
          {cool > 0
            ? `신청 가능 ${cool > 24 ? "날짜" : "시간"}까지 ${
                cool > 24 ? Math.ceil(cool / 24) : cool
              }${cool > 24 ? "일" : "시간"} 남았어요 !`
            : "신청 가능 !"}
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
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  border: var(--border-mint);
  border-radius: var(--border-radius-main);
`;

const Info = styled.div``;

const Uni = styled.span`
  font-weight: 600;
  color: var(--font-h2);
  font-size: 14px;
  flex: 0.4;
`;

export default PromotionMyCoolTimeModal;
