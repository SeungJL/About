import Image from "next/image";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/layouts/Modals";
import { CHICKEN_IMAGE } from "../../../constants/imageUrl";

import { ModalMain, ModalXL } from "../../../styles/layout/modal";
import PromotionModalDetail from "./PromotionModalDetail";
import PromotionModalFooter from "./PromotionModalFooter";
import PromotionModalLastWinner from "./PromotionModalLastWinner";
import PromotionModalOverview from "./PromotionModalOverview";

interface IPromotionModal {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}

function PromotionModal({ setIsModal }: IPromotionModal) {
  const [isFirst, setIsFirst] = useState(true);

  return (
    <>
      <Layout>
        <ModalHeaderX title="홍보 이벤트" setIsModal={setIsModal} />
        <ModalMain>
          <PromotionModalOverview />
          <ImageWraaper>
            <Image width={120} height={120} alt="chicken" src={CHICKEN_IMAGE} />
          </ImageWraaper>
          {isFirst ? <PromotionModalDetail /> : <PromotionModalLastWinner />}
        </ModalMain>
        <PromotionModalFooter setIsFirst={setIsFirst} setIsModal={setIsModal} />
      </Layout>
    </>
  );
}

const Layout = styled(ModalXL)``;

const ImageWraaper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PromotionModal;
