import { Image, Accordion, AccordionButton, AccordionItem, AccordionPanel, AspectRatio, Button, Container, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Text, useToast, VStack, Box } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import Map from "../map";
import { ChangeEvent, ChangeEventHandler, FC, MouseEvent, useState } from "react";
import { IPlace } from "../../models/place";
import { IParticipation } from "../../models/vote";
import { MAX_USER_PER_PLACE } from "../../constants/system";
import TimeBoard from "../timeBoard";
import { getInterestingDate, hourMinToDate } from "../../libs/utils/dateUtils";
import { AttendDTO } from "../../models/interface/vote";
import { useAttendMutation } from "../../hooks/vote/mutations";
import { useQueryClient } from "react-query";
import { VOTE_GET } from "../../libs/queryKeys";

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22]
const minutes = ['00', '30']

const VoteModal: FC<{
  isOpen: boolean,
  onClose: () => void,
  date: Dayjs,
  participations: IParticipation[],
}> = ({ isOpen, onClose, date, participations }) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const [accordionIndex, setAccordionIndex] = useState(0)

  const [attendInfo, setAttendInfo] = useState<{
    place: IPlace,
    startHour: number,
    startMin: string,
    endHour: number,
    endMin: string,
    lunch: 'attend' | 'absent' | 'no_select',
    dinner: 'attend' | 'absent' | 'no_select',
  }>({
    place: null,
    startHour: 0,
    startMin: '',
    endHour: 0,
    endMin: '',
    lunch: 'no_select',
    dinner: 'no_select',
  })

  const { mutate: patchAttend } = useAttendMutation(getInterestingDate(), {
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries(VOTE_GET)
    },
    onError: (err) => {
      
    }
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

      setAccordionIndex(1)
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

  const onChangePlace: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value
    
    const selected = places.find(place => place._id === value)
    setAttendInfo({ ...attendInfo, place: selected })
  }

  const onChangeHour = (type: string) => (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.currentTarget.value, 10)
    switch (type) {
      case 'start':
        setAttendInfo({ ...attendInfo, startHour: value })
        break
      case 'end':
        setAttendInfo({ ...attendInfo, endHour: value })
        break
    }
  }

  const onChangeMin = (type: string) => (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value
    switch (type) {
      case 'start':
        setAttendInfo({ ...attendInfo, startMin: value })
        break
      case 'end':
        setAttendInfo({ ...attendInfo, endMin: value })
        break
    }
  }

  const onSubmit = () => {
    const { startHour, startMin, endHour, endMin } = attendInfo
    if (!(startHour && startMin && endHour && endMin)) {
      toast({
        title: '시간 미입력',
        description: '시작시간과 끝시간을 모두 입력해주세요',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }
    const start = hourMinToDate(startHour, startMin)
    const end = hourMinToDate(endHour, endMin)

    if (start >= end) {
      toast({
        title: '잘못된 입력',
        description: '시작시간은 끝시간 이전이여야 합니다',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
      return
    }

    const attendDTO = {
      place: (attendInfo.place as IPlace)._id,
      start: start.toDate(),
      end: end.toDate(),
      confirmed: false,
      anonymity: false,
      lunch: attendInfo.lunch,
      dinner: attendInfo.dinner,
    } as AttendDTO

    patchAttend(attendDTO)
  }

  const canAccessTimeTab = !!attendInfo.place

  return (
    <Modal id='vote-modal' size='sm' onClose={onClose} isOpen={isOpen} isCentered>
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
                <Select value={attendInfo?.place?._id} margin='5px 0' placeholder='장소' width='100%'>
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
                    participations.map((participation, idx) => (
                      <VStack key={idx} flex={1}>
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
                          fontSize='xs'
                          letterSpacing={0}
                        >{(participation.place as IPlace).branch}</Text>
                      </VStack>
                    ))
                  }
                </HStack>
              </Container>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton padding={0} />
            <AccordionPanel pb={4}>
              {
                selectedParticipation?.attendences && (
                  <TimeBoard attendences={selectedParticipation?.attendences || []} />
                )
              }
              <Box key='start' margin='10px 0'>
                <Box display='inline-block' width='40px'>
                  <Text>시작</Text>
                </Box>
                <Select placeholder='시간' width='fit-content' display='inline-block' onChange={onChangeHour('start')}>
                  {
                    hours.map((h) => (
                      <option key={h} value={h}>
                        {(h > 12 ? h-12 : h).toString() }
                      </option>
                    ))
                  }
                </Select>
                 : 
                <Select placeholder='분' width='fit-content' display='inline-block' onChange={onChangeMin('start')}>
                  {
                    minutes.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))
                  }
                </Select>
              </Box>

              <Box key='end' margin='10px 0'>
                <Box display='inline-block' width='40px'>
                  <Text>끝</Text>
                </Box>
                <Select placeholder='시간' width='fit-content' display='inline-block' onChange={onChangeHour('end')}>
                  {
                    hours.map((h) => (
                      <option key={h} value={h}>
                        {(h > 12 ? h-12 : h).toString() }
                      </option>
                    ))
                  }
                </Select>
                 : 
                <Select placeholder='분' width='fit-content' display='inline-block' onChange={onChangeMin('end')}>
                  {
                    minutes.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))
                  }
                </Select>
              </Box>
              <HStack spacing={1}>
                <Button
                  flex={1}
                  onClick={() => setAccordionIndex(0)}
                >
                  뒤로
                </Button>
                <Button
                  flex={3}
                  colorScheme='yellow'
                  disabled={!canAccessTimeTab}
                  onClick={() => setAccordionIndex(2)}
                >
                  다음
                </Button>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton padding={0} />
            <AccordionPanel pb={4}>
              <Text>
                같이 점심식사하실래요?
              </Text>
              <Box marginBottom='10px'>
                <Button colorScheme='yellow' onClick={() => {setAttendInfo({ ...attendInfo, lunch: 'attend'}); setAccordionIndex(3)}}>
                  네 좋아요ㅎㅎ
                </Button>
                <Button onClick={() => {setAttendInfo({ ...attendInfo, lunch: 'absent' }); setAccordionIndex(3)}}>
                  아니요 다음에 먹을게요
                </Button>
              </Box>
              <Button
                width='100%'
                marginTop='100px'
                onClick={() => setAccordionIndex(1)}
              >
                뒤로
              </Button>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton padding={0} />
            <AccordionPanel pb={4}>
              <Text>
                저녁식사는요?
              </Text>
              <Box marginBottom='10px'>
                <Button colorScheme='yellow' onClick={() => { setAttendInfo({ ...attendInfo, dinner: 'attend' }); onSubmit() }}>
                  네 좋아요ㅎㅎ
                </Button>
                <Button onClick={() => { setAttendInfo({ ...attendInfo, dinner: 'absent' }); onSubmit() }}>
                  아니요 다음에 먹을게요
                </Button>
              </Box>
              <HStack>
                <Button
                  width='100%'
                  marginTop='100px'
                  onClick={() => setAccordionIndex(2)}
                >
                  뒤로
                </Button>
              </HStack>
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
