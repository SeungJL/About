import { faSparkles } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  ModalFooterTwo,
  ModalHeaderX,
} from "../../components/modals/ModalComponents";
import { ModalLayout } from "../../components/modals/Modals";
import { ModalMain, ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function FAQPopUp({ setIsModal }: IModal) {
  const router = useRouter();

  const onSubmit = () => {
    router.push(`/faq`);
  };

  return (
    <ModalLayout size="md">
      <ModalHeaderX title="뉴비 가이드" setIsModal={setIsModal} />
      <ModalMain>
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
      </ModalMain>
      <ModalFooterTwo
        right="확인하러가기"
        setIsModal={setIsModal}
        onSubmit={onSubmit}
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
