import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { DispatchBoolean, DispatchType } from "../../types/reactTypes";
import { DeclareRequest } from "../../types/user/userRequest";

interface IBottomDrawer {
  isModal: boolean;
  setIsModal: DispatchBoolean;
  setDeclareModal?: DispatchType<DeclareRequest>;
}

function BottomDrawer({ isModal, setIsModal, setDeclareModal }: IBottomDrawer) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isModal) onOpen();
  }, [isModal, onOpen]);

  useEffect(() => {
    if (!isOpen) setIsModal(false);
  }, [isOpen, setIsModal]);

  const onClick = (type: DeclareRequest) => {
    setDeclareModal(type);
    onClose();
  };

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent bg="transparent">
        <DrawerBody display="flex" flexDir="column" p="0 var(--padding-md)">
          <Button
            onClick={() => onClick("distance")}
            color="var(--color-red)"
            h="48px"
            borderBottomRadius={0}
            borderBottom="var(--border-main)"
          >
            거리두기
          </Button>
          <Button
            onClick={() => onClick("declare")}
            color="var(--color-red)"
            borderTopRadius={0}
            h="48px"
          >
            신고하기
          </Button>
          <Button onClick={onClose} bg="white" my="var(--margin-md)" h="48px">
            취소
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default BottomDrawer;
