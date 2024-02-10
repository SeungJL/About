import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import styled from "styled-components";
import TwoButtonNav from "../../../components/layout/TwoButtonNav";
import { DispatchBoolean, DispatchString } from "../../../types/reactTypes";

interface IQuestionBottomDrawer {
  isModal: boolean;
  setIsModal: DispatchBoolean;
  setQuestion: DispatchString;
  question: string;
}

function QuestionBottomDrawer({
  isModal,
  setIsModal,
  setQuestion,
  question,
}: IQuestionBottomDrawer) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  
  useEffect(() => {
    if (isModal) {
     
      onOpen();
    }
    if (!isModal) {
      onClose();
    }
  }, [isModal, onClose, onOpen]);

  useEffect(() => {
    // if (!isOpen) setIsModal(false);
  }, [isOpen, setIsModal]);

  const onClickLeft = () => {
    setQuestion(null);
    onClose();
  };
 
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent borderTopRadius="var(--border-radius-main)">
        <DrawerBody
          display="flex"
          flexDir="column"
          p="var(--padding-main) var(--padding-main)"
        >
          <Title>가입 질문</Title>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="ex) 어떤 목적으로 가입을 희망하시나요?"
          />
          <TwoButtonNav
            leftText="생략"
            rightText="저장"
            onClickLeft={onClickLeft}
            onClickRight={() => setIsModal(false)}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

const Container = styled.div`
  border-radius: 20px;
  overflow: hidden;

`;

const BottomNav = styled.nav``;

const Title = styled.div`
  margin: var(--margin-main) 0;
  font-weight: 700;
  font-size: 18px;
`;

const Input = styled.input`
  padding: var(--padding-md);
  border: var(--border-main);
  height: 50px;
  border-radius: var(--border-radius2);
  margin-bottom: var(--margin-main);
  :focus {
    outline-color: var(--font-h1);
  }
`;

export default QuestionBottomDrawer;
