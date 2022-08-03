import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Container, ModalFooter, Button, useToast } from "@chakra-ui/react"
import { Dayjs } from "dayjs"
import { FC, useState } from "react"
import { useQueryClient } from "react-query"
import { useChangeTimeMutation } from "../hooks/vote/mutations"
import { VOTE_GET } from "../libs/queryKeys"
import { dateToDayjs, hourMinToDate } from "../libs/utils/dateUtils"
import { IParticipation, IParticipantTime } from "../models/vote"
import TimeSelector from "./voteModal/timeSelector"

const ChangeTimeModal: FC<{
  isOpen: boolean,
  onClose: () => void,
  date: Dayjs,
  myParticipantTime: IParticipantTime,
  participation: IParticipation,
}> = ({ isOpen, onClose, date, participation, myParticipantTime }) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  
  const [start, setStart] = useState<Dayjs>(dateToDayjs(myParticipantTime.start))
  const [end, setEnd] = useState<Dayjs>(dateToDayjs(myParticipantTime.end))

  const { mutate: handleChangeTime, isLoading } = useChangeTimeMutation(
    date,
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(VOTE_GET)
        onClose()
      },
      onError: (err) => {
        toast({
          title: '오류',
          description: "날짜변경 중 문제가 발생했어요. 다시 시도해보세요.",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      },
    }
  )

  return (
      <Modal size='md' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
            <ModalContent>
              <ModalHeader>시간변경</ModalHeader>
              <ModalBody>
                <TimeSelector
                  start={start}
                  setStart={setStart}
                  end={end}
                  setEnd={setEnd}
                  participation={participation}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>닫기</Button>
                <Button
                  isLoading={isLoading}
                  colorScheme='yellow'
                  onClick={() => handleChangeTime({ start: start.toDate(), end: end.toDate() })}
                >
                  변경
                </Button>
              </ModalFooter>
            </ModalContent>
      </Modal>
  )
}

export default ChangeTimeModal
