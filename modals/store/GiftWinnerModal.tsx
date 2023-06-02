import { Button, ModalFooter, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { ModalHeaderXLine } from "../../components/ui/Modal";
import CountNum from "../../components/utils/CountNum";
import { useStoreMutation } from "../../hooks/store/mutation";

import { usePointMutation } from "../../hooks/user/pointSystem/mutation";
import { usePointQuery } from "../../hooks/user/pointSystem/queries";

import {
  ModalFooterNav,
  ModalLgLight,
  ModalMain,
  ModalMd,
  ModalXs,
} from "../../styles/layout/modal";
import { IStoreApplicant, IStoreGift } from "../../types/store";

function GiftWinnerModal({
  setIsModal,
  applyData,
  win,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  applyData: IStoreApplicant[];
  win: number;
}) {
  const { data: session } = useSession();

  const [winner, setWinner] = useState([]);

  useEffect(() => {
    const data = [];
    applyData.forEach((who) => {
      for (let i = 0; i < who?.cnt; i++) data.push(who);
    });

    const temp = [];
    if (win >= 1) temp.push(data[2]);
    if (win >= 2) temp.push(data[6]);
    if (win >= 3) temp.push(data[9]);
    setWinner(temp);
  }, [applyData, win]);

  const isMyWin = winner?.some((who) => who?.uid === session?.uid);

  return (
    <Layout>
      <ModalHeaderXLine title="당첨자 발표" setIsModal={setIsModal} />
      <ModalMain>
        <Message>당첨을 축하합니다!</Message>
        <Main>
          {winner?.map((who, idx) => (
            <Win key={idx}>{who?.name}</Win>
          ))}
        </Main>
      </ModalMain>
      <ModalFooterNav>
        <button
          style={{ color: "var(--font-h1)" }}
          onClick={() => setIsModal(false)}
        >
          확인
        </button>
      </ModalFooterNav>
    </Layout>
  );
}

const Layout = styled(ModalXs)``;

const Message = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 15px;
  color: var(--font-h2);
  margin-top: 12px;
  margin-bottom: 30px;
`;

const Main = styled.main`
  display: flex;
  padding: 0 14px;
  align-items: center;

  flex: 1;
  border-radius: var(--border-radius);
  justify-content: space-around;
  border: 1.5px solid var(--color-mint);
`;

const Win = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: var(--color-mint);
`;

const Footer = styled.footer``;

export default GiftWinnerModal;
