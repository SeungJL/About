import { Image, Accordion, AccordionButton, AccordionItem, AccordionPanel, AspectRatio, Button, Container, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Text, useToast, VStack, Box } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import Map from "./map";
import { ChangeEventHandler, FC, MouseEvent, useMemo, useState } from "react";
import { usePlaceQuery } from "../hooks/vote/queries";
import { IPlace } from "../models/place";
import { IParticipation } from "../models/vote";
import { MAX_USER_PER_PLACE } from "../constants/system";
import TimeBoard from "./timeBoard";

const VoteModal: FC<{
  isOpen: boolean,
  onClose: () => void,
  date: Dayjs,
  participations: IParticipation[],
}> = ({ isOpen, onClose, date, participations }) => {
  const toast = useToast()
  const [accordionIndex, setAccordionIndex] = useState(0)

  const [attendInfo, setAttendInfo] = useState<{
    place: IPlace,
    start: Date,
    end: Date,
  }>({
    place: null,
    start: null,
    end: null,
  })

  const places = participations.map((participation) => participation.place as IPlace)
  const selectedParticipation = participations.find((participation) => (participation.place as IPlace)._id == (attendInfo.place as IPlace)?._id)

  const handlePlaceIconClick = (event: MouseEvent<HTMLDivElement>) => {
    const placeId = event.currentTarget.title

    const targetParticipation = participations.find((participation) => (participation.place as IPlace)._id == placeId)
    if (targetParticipation.attendences.length < MAX_USER_PER_PLACE) {
      setAttendInfo({
        ...attendInfo,
        place: targetParticipation.place as IPlace
      })
    } else {
      toast({
        title: '정원초과',
        description: `장소당 최대 ${MAX_USER_PER_PLACE}명까지 신청할 수 있어요.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  const placeIconBorderColor = (participation: IParticipation) => {
    if (attendInfo?.place?._id == (participation.place as IPlace)._id) {
      return 'blue.200'
    }
    if (participation.attendences.length >= MAX_USER_PER_PLACE) {
      return 'red.400'
    }
    return 'gray.200'
  }

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value
    
    const selected = places.find(place => place._id === value)
    setAttendInfo({ ...attendInfo, place: selected })
  }

  const canAccessTimeTab = !!attendInfo.place

  return (
    <Modal size='sm' onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>참여</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding='0'>
        <Accordion index={accordionIndex}>
          <AccordionItem>
              <AccordionButton padding='0' />
            <AccordionPanel pb={4} padding='0'>
              <Map
                selectedPlace={attendInfo.place}
                places={places}
                width='100%'
                height='200px'
              />
              <Container>
                <Select id='place' value={attendInfo?.place?._id} margin='5px 0' placeholder='장소' width='100%' onChange={onChange}>
                  {
                    places.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.fullname}
                      </option>
                    ))
                  }
                </Select>
                <HStack justifyContent='center' width='100%'>
                  {
                    participations.map((participation) => (
                      <VStack flex={1}>
                        <AspectRatio
                          title={(participation.place as IPlace)._id}
                          ratio={1 / 1}
                          width='60px'
                          margin='5px 0'
                          onClick={handlePlaceIconClick}
                        >
                          <Image
                            borderRadius='25%'
                            src={(participation.place as IPlace).image}
                            alt={(participation.place as IPlace).fullname}
                            borderColor={placeIconBorderColor(participation)}
                            borderWidth='4px'
                            borderStyle='solid'
                          />
                        </AspectRatio>
                        <Text
                          position='relative'
                          top='-12px'
                          fontSize='5px'
                          letterSpacing={0}
                        >{(participation.place as IPlace).branch}</Text>
                      </VStack>
                    ))
                  }
                </HStack>
                <Button
                  width='100%'
                  marginTop='100px'
                  colorScheme='yellow'
                  disabled={!canAccessTimeTab}
                  onClick={() => setAccordionIndex(1)}
                >
                  다음
                </Button>
              </Container>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton padding={0} />
            <AccordionPanel pb={4}>
              <TimeBoard attendences={selectedParticipation?.attendences || []} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default VoteModal
