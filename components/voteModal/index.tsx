import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useToast, Box } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { IPlace } from "../../models/place";
import { IParticipantNote, IParticipation } from "../../models/vote";
import { hourMinToDate } from "../../libs/utils/dateUtils";
import { AttendDTO } from "../../models/interface/vote";
import { useAttendMutation } from "../../hooks/vote/mutations";
import { useQueryClient } from "react-query";
import { VOTE_GET } from "../../libs/queryKeys";
import PlaceSelector from "./placeSelector";
import TimeSelector from "./timeSelector";
import Note from "./note";
import Confirm from "./confirm"

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
    start: Dayjs,
    end: Dayjs,
    desc: string,
    confirmed: boolean,
    lunch: 'attend' | 'absent' | 'no_select',
    dinner: 'attend' | 'absent' | 'no_select',
    afterDinner: 'attend' | 'absent' | 'no_select',
  }>({
    place: null,
    start: hourMinToDate(13, '00'),
    end: hourMinToDate(16, '00'),
    desc: '',
    confirmed: false,
    lunch: 'no_select',
    dinner: 'no_select',
    afterDinner: 'absent',
  })

  const toPreviousStep = () => setAccordionIndex(accordionIndex - 1)
  const toNextStep = () => setAccordionIndex(accordionIndex + 1)

  const { mutate: patchAttend } = useAttendMutation(date, {
    onSuccess: () => {
      queryClient.invalidateQueries(VOTE_GET)
      onClose()
    },
    onError: (err) => {
      
    }
  })

  const selectedParticipation = participations.find((participation) => (participation.place as IPlace)._id == (attendInfo.place as IPlace)?._id)

  const placeVoteInfo = participations.map((participant) => {
    const place = participant.place as IPlace
    const vote = participant.attendences.length
    const status = participant.status

    return { place, vote, status }
  })

  const onSubmit = () => {
    const { start, end } = attendInfo
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
      confirmed: attendInfo.confirmed,
      anonymity: false,
      lunch: attendInfo.lunch,
      dinner: attendInfo.dinner,
      afterDinner: attendInfo.afterDinner
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
              <PlaceSelector
                placeVoteInfo={placeVoteInfo}
                selectedPlace={attendInfo.place}
                setSelectedPlace={(place) => {
                  setAttendInfo({...attendInfo, place })
                  toNextStep()
                }}
              />
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton padding={0} />
            <AccordionPanel pb={4}>
              <TimeSelector
                participation={selectedParticipation}
                start={attendInfo.start}
                setStart={(start: Dayjs) => setAttendInfo({...attendInfo, start })}
                end={attendInfo.end}
                setEnd={(end: Dayjs) => setAttendInfo({...attendInfo, end})}
              />
              <HStack spacing={1}>
                <Button
                  flex={1}
                  onClick={toPreviousStep}
                >
                  뒤로
                </Button>
                <Button
                  flex={3}
                  colorScheme='yellow'
                  disabled={!canAccessTimeTab}
                  onClick={toNextStep}
                >
                  다음
                </Button>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton padding={0} />
            <AccordionPanel pb={4}>
              <Note
                note={attendInfo as IParticipantNote}
                setNote={(note) => setAttendInfo({ ...attendInfo, ...note })}
              />
              <HStack spacing={1}>
                <Button
                  flex={1}
                  onClick={toPreviousStep}
                >
                  뒤로
                </Button>
                <Button
                  flex={3}
                  colorScheme='yellow'
                  disabled={!canAccessTimeTab}
                  onClick={toNextStep}
                >
                  다음
                </Button>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton padding={0} />
            <AccordionPanel pb={4}>
              <Confirm
                confirmed={attendInfo.confirmed}
                setConfirmed={(c: boolean) => setAttendInfo({...attendInfo, confirmed: c})}
              />
              <HStack spacing={1}>
                <Button
                  flex={1}
                  onClick={toPreviousStep}
                >
                  뒤로
                </Button>
                <Button
                  flex={3}
                  colorScheme='yellow'
                  disabled={!canAccessTimeTab}
                  onClick={onSubmit}
                >
                  완료
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
