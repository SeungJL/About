import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Select, ModalFooter, Button, HStack, Spinner, useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { ChangeEventHandler, FC, useState } from "react";
import { IAttendence } from "../models/attendence";
import Map from "./map";
import { IPlace } from "../models/place";
import { usePlaceQuery } from "../hooks/vote/queries";

const PlacePickerModal: FC<{
  isOpen: boolean,
  onClose: () => void,
  dateStr: string,
  setAttendence: (attendence: IAttendence) => void
}> = ({ isOpen, onClose, dateStr, setAttendence }) => {
  const toast = useToast()
  const [selectedPlace, setSelectedPlace] = useState<IPlace>()
  const { data: places, isLoading } = usePlaceQuery()

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value
    
    const selected = places.find(place => place._id === value)
    setSelectedPlace(selected)
  }
  
  const onSubmit = async () => {
    try {
      const { data } = await axios.patch(`/api/attend/${dateStr}`, {
        operation: 'place_update',
        place: selectedPlace?._id,
      })
      setAttendence(data as IAttendence)
      onClose()
    } catch (err) {
      const error = err as AxiosError
      if (error.response.status === 400) {
        toast({
          title: '투표 인원초과',
          description: "한 장소에 최대 6명까지 신청할 수 있어요",
          status: 'error',
          duration: 5000,
          isClosable: false,
          position: 'bottom',
        })
      }
    }
  }

  return (
    <Modal size='xs' onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>장소 선택</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          희망하는 카페를 선택해주세요
          {
            isLoading && (
              <Spinner />
            )
          }
          {
            places && (
              <>
                <Map
                  selectedPlace={selectedPlace}
                  places={places}
                  width='100%'
                  height='250px'
                />
                <HStack margin='10px 0' alignItems='flex-start' justifyContent='flex-start'>
                  <Select id='place' placeholder='장소' width='fit-content' onChange={onChange}>
                    {
                      places.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.fullname}
                        </option>
                      ))
                    }
                  </Select>
                </HStack>
              </>
            )
          }
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} marginRight='10px'>Close</Button>
          <Button onClick={onSubmit} colorScheme='yellow'>확인</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PlacePickerModal
