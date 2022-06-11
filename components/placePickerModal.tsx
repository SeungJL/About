import { Modal, ModalOverlay, FormControl, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Select, ModalFooter, Button, HStack, FormErrorMessage } from "@chakra-ui/react";
import axios from "axios";
import { Form, Field, Formik, FormikHelpers } from "formik";
import { FC } from "react";
import { getPlaceFullName, getPlaces } from "../libs/placeUtils";
import { IAttendence } from "../models/attendence";

const places = getPlaces()

const PlacePickerModal: FC<{
  isOpen: boolean,
  onClose: () => void,
  dateStr: string,
  setAttendence: (attendence: IAttendence) => void
}> = ({ isOpen, onClose, dateStr, setAttendence }) => {
  
  const onSubmit = async (values: { place: string }, action: FormikHelpers<{ place: string }>) => {
    const { setSubmitting } = action

    setSubmitting(true)
    
    const { data } = await axios.patch(`/api/attend/${dateStr}`, {
      operation: 'place_update',
      place: values.place,
    })
    setAttendence(data as IAttendence)
    setSubmitting(false)

    onClose()
  }

  const validatePlace = (place: string) => {
    if (!place) 
    return '희망하는 스터디 장소를 입력해주세요'
    
    if (!places.includes(place)) 
      return '장소가 올바르지 않아요'
    
    return
  }

  return (
      <Modal size='xs' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <Formik
          initialValues={{
            place: '',
          }}
          onSubmit={onSubmit}
        >
          {(props) => (
          <Form>
            <ModalContent>
              <ModalHeader>장소 선택</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                희망하는 카페를 선택해주세요
                <HStack margin='10px 0' alignItems='flex-start' justifyContent='flex-start'>
                  <Field name='place' validate={validatePlace}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.place && form.touched.place} width='fit-content'>
                        <Select {...field} id='place' placeholder='장소' width='fit-content'>
                          {
                            places.map((p) => (
                              <option key={p} value={p}>
                                {getPlaceFullName(p)}
                              </option>
                            ))
                          }
                        </Select>
                        <FormErrorMessage>{form.errors.place}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </HStack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} marginRight='10px'>Close</Button>
                <Button isLoading={props.isSubmitting} type='submit' colorScheme='yellow'>확인</Button>
              </ModalFooter>
            </ModalContent>
            </Form>
          )}
          </Formik>
      </Modal>
  )
}

export default PlacePickerModal
