import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";

import { selectRandomWinners } from "../../helpers/validHelpers";
import { IGiftEntry } from "../../pages/store";
import { IModal } from "../../types/reactTypes";
interface IStoreGiftWinModal extends IModal {
  applicants: IGiftEntry;
  winCnt: number;
}

function StoreGiftWinModal({
  setIsModal,
  applicants,
  winCnt,
}: IStoreGiftWinModal) {
  const users = applicants.users.reduce((acc, curr) => {
    for (let i = 0; i < curr.cnt; i++) {
      acc.push(curr);
    }
    return acc;
  }, []);

  const winners: number[] = selectRandomWinners(
    applicants.max,
    winCnt,
    applicants.giftId
  );

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader text="당첨자 발표" />
      <ModalBody>
        <Message>당첨을 축하합니다!</Message>
        <Winner>
          {winners.map((num, idx) => (
            <Win key={idx}>{users[num]?.name || "비공개"}</Win>
          ))}
        </Winner>
      </ModalBody>
      <ModalFooterOne text="확인" onClick={() => setIsModal(false)} />
    </ModalLayout>
  );
}

const Message = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  color: var(--color-mint);
  margin-top: var(--gap-1);
  margin-bottom: var(--gap-5);
`;

const Winner = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  border-radius: var(--rounded-lg);
  justify-content: space-around;
  border: var(--border-mint);
`;

const Win = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--gray-2);
`;

export default StoreGiftWinModal;
