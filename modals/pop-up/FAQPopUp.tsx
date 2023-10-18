import { faSparkles } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function FAQPopUp({ setIsModal }: IModal) {
  const router = useRouter();

  const onSubmit = () => {
    router.push(`/faq`);
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader text="뉴비 가이드" />
      <ModalBody>
        <ModalSubtitle>
          아직도 이걸 모른다고?! 아직도 이걸 모르는 당신은 뉴비! 궁금한 거
          있으면 보고 가~
        </ModalSubtitle>
        <Wrapper>
          <FontAwesomeIcon
            icon={faSparkles}
            size="2x"
            color="var(--color-orange)"
          />
          <FontAwesomeIcon
            icon={faSparkles}
            size="2x"
            color="var(--color-orange)"
          />
          <FontAwesomeIcon
            icon={faSparkles}
            size="2x"
            color="var(--color-orange)"
          />
        </Wrapper>
      </ModalBody>
      <ModalFooterTwo
        leftText="닫기"
        rightText="보러가기"
        onClickLeft={() => setIsModal(false)}
        onClickRight={onSubmit}
        isFull={true}
      />
    </ModalLayout>
  );
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default FAQPopUp;
