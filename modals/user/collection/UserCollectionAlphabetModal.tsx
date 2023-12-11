import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import {
  ModalBody,
  ModalHeaderCenter,
  ModalLayout,
} from "../../../components/modals/Modals";
import { ModalSubtitle } from "../../../styles/layout/modal";
import { IModal } from "../../../types/reactTypes";

function UserCollectionAlphabetModal({ setIsModal }: IModal) {
  return (
    <ModalLayout size="xl" onClose={() => setIsModal(false)}>
      <ModalHeaderCenter text="수집 보상" />
      <ModalBody>
        <ModalSubtitle isCenter={true}>
          알파벳을 수집하고 상품을 획득해 봐요!
        </ModalSubtitle>
        <Container>
          <Item>
            <div>스타벅스 아메리카노</div>
            <div>1회차 상품</div>
          </Item>
          <Item>
            <div>공차 상품권</div>
            <div>2회차 상품</div>
          </Item>
          <Item>
            <div>민트초코 배지</div>
            <div>3회차 상품</div>
          </Item>
          <Item>
            <div>배달의민족 10000원권</div>
            <div>4회차 상품</div>
          </Item>
          <Button
            w="100px"
            mt="auto"
            mb="var(--margin-main)"
            colorScheme="mintTheme"
            onClick={() => setIsModal(false)}
          >
            확인
          </Button>
        </Container>
      </ModalBody>
    </ModalLayout>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Item = styled.div`
  width: 100%;
  padding: var(--padding-sub) var(--padding-sub);
  display: flex;
  font-size: 13px;
  border-bottom: var(--border-main-light);
  color: var(--font-h2);
  > div {
    flex: 1;
    text-align: center;
  }
  > div:first-child {
    font-weight: 600;
  }
  > div:last-child {
  }
`;

export default UserCollectionAlphabetModal;
