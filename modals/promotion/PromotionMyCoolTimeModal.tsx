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
  const diff =
    myApply && dayjs(myApply.lastDate).add(4, "day").diff(dayjs(), "day");
  const diffHours =
    72 - dayjs(myApply.lastDate).add(3, "day").diff(dayjs(), "hours");
  console.log(myApply, diff);
  return (
    <ModalLayout size="md">
      <ModalHeaderX title="내 신청 쿨타임" setIsModal={setIsModal} />
      <ModalMain>
        {myApply && <Uni>학교: {myApply.name}</Uni>}
        <Container>
          {diff > 0 && diff <= 3
            ? `신청 가능 날짜까지 ${diff > 1 ? diff : diffHours}${
                diff > 1 ? "일" : "시간"
              } 남았어요 !`
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
  color: var(--font-h1);
  font-size: 14px;
  flex: 0.4;
`;

export default PromotionMyCoolTimeModal;
