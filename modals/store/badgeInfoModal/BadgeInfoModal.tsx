import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";

import { ModalHeaderCenter, ModalXXL } from "../../../styles/layout/modal";
import BadgeInfoModalFirstInfo from "./BadgeInfoModalFirstInfo";
import BadgeInfoModalSecondInfo from "./BadgeInfoModalSecondInfo";

interface IBadgeInfoModal {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

function BadgeInfoModal({ setIsModal }: IBadgeInfoModal) {
  const [page, setPage] = useState(0);

  return (
    <Layout layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {page === 0 ? (
        <>
          <ModalHeaderCenter>
            <span>멤버 배지</span>
            <div>
              멤버 등급은 기본적으로 7가지로 나뉩니다. <br />
              흭득한 배지는 선택해서 사용할 수 있습니다.
            </div>
          </ModalHeaderCenter>
          <BadgeInfoModalFirstInfo />
          <Footer onClick={() => setPage(1)}>
            <button>다음 페이지</button>
          </Footer>
        </>
      ) : (
        <>
          <ModalHeaderCenter>
            <span>유니크 배지</span>
            <div>특정한 기간 또는 이벤트를 통해 얻을 수 있습니다.</div>
          </ModalHeaderCenter>
          <BadgeInfoModalSecondInfo />

          <Footer onClick={() => setIsModal(false)}>
            <button>확인했어요!</button>
          </Footer>
        </>
      )}
    </Layout>
  );
}

const Layout = styled(motion(ModalXXL))`
  padding: 12px 0 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.footer`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  > button {
    width: 100px;
    font-size: 16px;
    height: 26px;
    background-color: var(--color-red);
    color: white;
    border-radius: 10px;
  }
`;

export default BadgeInfoModal;
