import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
import { CHICKEN_IMAGE } from "../../../constants/imageUrl";
import { ModalMain } from "../../../styles/layout/modal";
import { IModal } from "../../../types/reactTypes";
import PromotionModalDetail from "./PromotionModalDetail";
import PromotionModalFooter from "./PromotionModalFooter";
import PromotionModalLastWinner from "./PromotionModalLastWinner";
import PromotionModalOverview from "./PromotionModalOverview";

function PromotionModal({ setIsModal }: IModal) {
  const [isFirst, setIsFirst] = useState(true);

  return (
    <>
      <ModalLayout size="xl">
        <ModalHeaderX title="홍보 이벤트" setIsModal={setIsModal} />
        <ModalMain>
          <PromotionModalOverview />
          <ImageWraaper>
            <Image width={100} height={100} alt="chicken" src={CHICKEN_IMAGE} />
          </ImageWraaper>
          {isFirst ? <PromotionModalDetail /> : <PromotionModalLastWinner />}
        </ModalMain>
        <PromotionModalFooter setIsFirst={setIsFirst} setIsModal={setIsModal} />
      </ModalLayout>
    </>
  );
}

const ImageWraaper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PromotionModal;
