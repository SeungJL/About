import { faGift } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
import { ModalMain } from "../../../styles/layout/modal";
import { IModal } from "../../../types/reactTypes";
import PromotionModalFooter from "./PromotionModalFooter";
import PromotionModalOverview from "./PromotionModalOverview";

function PromotionModal({ setIsModal }: IModal) {
  return (
    <>
      <ModalLayout size="xl">
        <ModalHeaderX title="" setIsModal={setIsModal} />
        <Container>
          <PromotionModalOverview />
          <IconWrapper>
            <FontAwesomeIcon
              icon={faGift}
              size="5x"
              color="var(--color-mint)"
            />
          </IconWrapper>
        </Container>
        <PromotionModalFooter setIsModal={setIsModal} />
      </ModalLayout>
    </>
  );
}

const Container = styled(ModalMain)`
  display: flex;
  flex-direction: column;
  margin-top: var(--margin-min);
`;

const IconWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PromotionModal;
