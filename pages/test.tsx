import { Button, useDisclosure } from "@chakra-ui/react";
import { ModalLayout } from "../components/modals/Modals";

function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <ModalLayout size="lg" isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default BasicUsage;
