import { useEffect, useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modals/ModalComponents";
import { ModalLayout } from "../../components/modals/Modals";

import { useRouter } from "next/router";
import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";
import { IStoreApplicant } from "../../types/page/store";
import { IModal } from "../../types/reactTypes";
interface IStoreGiftWinModal extends IModal {
  applicants: IStoreApplicant[];
  win: number;
}

function StoreGiftWinModal({
  setIsModal,
  applicants,
  win,
}: IStoreGiftWinModal) {
  const [winner, setWinner] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const data = [];
    applicants.forEach((who) => {
      for (let i = 0; i < who?.cnt; i++) data.push(who);
    });
    const temp = [];
    if (win >= 1) temp.push(data[2]);
    if (win >= 2) temp.push(data[6]);
    if (win >= 3) temp.push(data[9]);
    setWinner(temp);
  }, [applicants, win]);

  const tempA = ["김유리", "김영우", "김예나"];

  return (
    <ModalLayout size="md">
      <ModalHeaderX title="당첨자 발표" setIsModal={setIsModal} />
      <ModalMain>
        <Message>당첨을 축하합니다!</Message>
        <Winner>
          {(router?.query.id as string) === "0"
            ? tempA.map((who, idx) => <Win key={idx}>{who}</Win>)
            : winner.map((who, idx) => <Win key={idx}>{who.name}</Win>)}
        </Winner>
      </ModalMain>
      <ModalFooterNav>
        <button onClick={() => setIsModal(false)}>확인</button>
      </ModalFooterNav>
    </ModalLayout>
  );
}

const Message = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  color: var(--font-h2);
  margin-top: var(--margin-sub);
  margin-bottom: 30px;
`;

const Winner = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  border-radius: var(--border-radius-sub);
  justify-content: space-around;
  border: var(--border-mint);
`;

const Win = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--font-h2);
`;

export default StoreGiftWinModal;
