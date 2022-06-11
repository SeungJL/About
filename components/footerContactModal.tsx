import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Text, Button, Container } from "@chakra-ui/react"
import { FC } from "react"

const FooterContactModal: FC<{
  isOpen: boolean,
  onClose: () => void,
}> = ({ isOpen, onClose }) => {
  return (
      <Modal size='xs' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
            <ModalContent>
              <ModalHeader>Contact</ModalHeader>
              <ModalBody>
                <Text>문의사항은 아래 연락처로 부탁드립니다.</Text>
                <Container marginTop='10px'>
                  <Text fontSize='sm'>E-MAIL: gudfla0814@gmail.com</Text>
                </Container>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>닫기</Button>
              </ModalFooter>
            </ModalContent>
      </Modal>
  )
}

export default FooterContactModal
