import { useRouter } from "next/router";
import styled from "styled-components";
import { AlphabetIcon } from "../../components/common/Icon/AlphabetIcon";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import { Alphabet } from "../../types/user/collections";

function AlphabetPopUp({ setIsModal }: IModal) {
  const router = useRouter();
  const alphabets: Alphabet[] = ["A", "B", "O", "U", "T"];
  return (
    <ModalLayout onClose={() => setIsModal(false)} size="lg">
      <ModalHeader text="알파벳 컬렉션" />
      <ModalBody>
        <ModalSubtitle>
          스터디 출석 또는 친구와의 교환을 통해 알파벳을 수집해봐요! 다양한
          상품을 드립니다!
        </ModalSubtitle>
        <AlphabetContainer>
          {alphabets.map((item) => (
            <AlphabetIcon key={item} alphabet={item} size="md" isBg={true} />
          ))}
        </AlphabetContainer>
      </ModalBody>
      <ModalFooterTwo
        isFull={true}
        rightText="보러가기"
        onClickLeft={() => setIsModal(false)}
        onClickRight={() => router.push("/user/collection")}
      />
    </ModalLayout>
  );
}

const AlphabetContainer = styled.div`
  display: flex;
  margin-top: var(--gap-1);
  margin-bottom: var(--gap-5);
  font-size: 14px;
  align-items: center;

  flex: 1;
  justify-content: space-around;
  > * {
    margin-right: var(--gap-1);
  }
`;

const Content = styled.div`
  font-size: 12px;
  color: var(--gray-2);
  font-weight: 600;
`;

export default AlphabetPopUp;
