import { Text, HStack, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Heading, Container, VStack, Box, Divider } from "@chakra-ui/react";
import { FC } from "react";
import { Button } from '@chakra-ui/react'
import { IPlace } from "../../models/place";
import { IParticipation } from "../../models/vote";
import TimeBoard from "../timeBoard";
import ProfileImage from "../profileImage";
import { IUser } from "../../models/user";

const AttendInfoModal: FC<{
  participation: IParticipation,
  isOpen: boolean,
  onClose: () => void,
}> = ({ participation, isOpen, onClose }) => {
  const place = participation.place as IPlace

  const lunchUser = participation.attendences
    .filter((att) => (att.note.lunch === 'attend'))
    .map((att) => (att.user as IUser))
  const dinnerUser = participation.attendences
    .filter((att) => (att.note.dinner === 'attend'))
    .map((att) => (att.user as IUser))
  const afterDinnerUser = participation.attendences
    .filter((att) => (att.note.afterDinner === 'attend'))
    .map((att) => (att.user as IUser))

  const mealData = {
    '점심식사': lunchUser,
    '저녁식사': dinnerUser,
  }

  return (
    <Modal size='sm' onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>투표 정보</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding='0'>
          <HStack
            padding='0 16px'
            alignItems='center'
            marginBottom='20px'
          >
            <Image
              src={place.image}
              alt={place.fullname}
              width='80px'
              marginRight='10px'
              display='inline-block'
              borderRadius='10px'
            />
            <Text
              fontSize='xl'
              display='inline-block'
            >
              {place.fullname}
            </Text>
          </HStack>
          <Divider />
          <Box maxHeight='60vh' overflowY='scroll'>
            <Box marginTop='20px'>
              <TimeBoard attendences={participation.attendences} />
            </Box>
            <Divider marginTop='30px' />
            {
              Object.keys(mealData).map((title) => (
                <Container key={title}>
                  <Heading as='h2' fontSize='md' marginTop='15px'>
                    {title}
                  </Heading>
                  <HStack
                    padding='8px'
                    alignItems='center'
                    minHeight='80px'
                    backgroundColor='gray.100'
                    borderRadius='10px'
                    overflowX='scroll'
                  >
                    {
                      mealData[title].map((user, idx) => (
                        <VStack key={idx} width='45px'>
                          <ProfileImage
                            marginTop='5px'
                            src={user.thumbnailImage}
                            alt={user.name}
                          />
                          <Text
                            fontSize='sm'
                            width='100%'
                            textAlign='center'
                            margin='0 !important'
                            overflow='hidden'
                            whiteSpace='nowrap'
                            textOverflow='ellipsis'
                          >
                            {user.name}
                          </Text>
                        </VStack>
                      ))
                    }
                  </HStack>
                </Container>
              ))
            }
          </Box>
          <HStack>
            <Button
              width='100%'
              margin='30px 10px 10px'
              onClick={onClose}
            >
              닫기
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
      <ModalFooter>
        <Button onClick={onClose}>닫기</Button>
      </ModalFooter>
    </Modal>
  )
}

export default AttendInfoModal
