import { faCoins, faGift } from "@fortawesome/pro-duotone-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalLayout,
} from "../../../components/modals/Modals";
import { IModal } from "../../../types/reactTypes";
import PromotionModalOverview from "./PromotionModalOverview";

function PromotionModal({ setIsModal }: IModal) {
  const router = useRouter();
  const onClickAttend = () => {
    router.push(`/promotion`);
    setIsModal(false);
  };
  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xl">
      <ModalBody>
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
            <span>+ 100 POINT</span>
            <span>+ 추첨 선물</span>
          </Info>
        </ImageContainer>
      </ModalBody>
      <ModalFooterTwo
        isFull={true}
        leftText="다음에"
        rightText="참여할래 !"
        onClickLeft={() => setIsModal(false)}
        onClickRight={onClickAttend}
      />
    </ModalLayout>
  );
}

const ImageContainer = styled.div`
  margin-top: var(--gap-3);
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
    margin-left: var(--gap-1);
  }
`;

const Info = styled.div`

  position: absolute;
  bottom: 24px;
  right: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: var(--gray-2);
  font-weight: 600;
  font-size: 12px;
`;

export default PromotionModal;
