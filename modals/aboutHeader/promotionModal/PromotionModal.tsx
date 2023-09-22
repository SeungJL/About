import { faCoins, faGift } from "@fortawesome/pro-duotone-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/modals/ModalComponents";
import { ModalLayout } from "../../../components/modals/Modals";
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
          <ImageContainer>
            <IconWrapper>
              <div>
                <FontAwesomeIcon
                  icon={faGift}
                  size="6x"
                  color="var(--color-red)"
                  style={
                    {
                      "--fa-primary-opacity": "1",
                      "--fa-secondary-opacity": "0.4",
                    } as React.CSSProperties
                  }
                />
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faCoins}
                  size="3x"
                  color="var(--color-red)"
                />
              </div>
            </IconWrapper>
            <Info>
              <span>+ 50 POINT</span>
              <span>+ 추첨 선물</span>
            </Info>
          </ImageContainer>
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

const ImageContainer = styled.div`
  margin-top: var(--margin-sub);
  height: 100%;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  > div:last-child {
    margin-left: var(--margin-min);
  }
`;

const Info = styled.div`
  line-height: 1.7;
  position: absolute;
  bottom: 23px;
  right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--font-h2);
  font-weight: 600;
  font-size: 12px;
`;

export default PromotionModal;
