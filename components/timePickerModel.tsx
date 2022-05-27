import { Modal, ModalOverlay, FormControl, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Select, ModalFooter, Button, HStack, Text, FormErrorMessage } from "@chakra-ui/react";
import axios from "axios";
import { Form, Field, Formik, FormikHelpers } from "formik";
import { FC, useRef, useState } from "react";
import { IAttendence } from "../models/attendence";

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const minutes = ['00', '10', '20', '30', '40', '50']

const TimePickerModal: FC<{
  isOpen: boolean,
  onClose: () => void,
  dateStr: string,
  setAttendence: (attendence: IAttendence) => void
}> = ({ isOpen, onClose, dateStr, setAttendence }) => {
  const time = useRef('')

  

  const onSubmit = async (values: { hour: string, minute: string }, action: FormikHelpers<{ hour: string, minute: string }>) => {
    const hour = values.hour.length < 2 ? `0${values.hour}` : values.hour
    const minute = values.minute

    const { setSubmitting } = action

    setSubmitting(true)
    
    const { data } = await axios.patch(`/api/attend/${dateStr}`, {
      operation: 'time_update',
      time: `${hour}:${minute}`,
    })
    setAttendence(data as IAttendence)
    setSubmitting(false)

    onClose()
  }

  const validateHour = (hour: string) => {
    if (!hour) 
    return '시간을 입력해주세요'
    
    if (!hours.includes(parseInt(hour))) 
      return '시간이 올바르지 않아요'
    
    return
  }

  const validateMinute = (minute: string) => {
    if (!minute)      
    return '분을 입력해주세요'
    
    if (!minutes.includes(minute))
      return '분이 올바르지 않아요'
    
    return
  }

  return (
      <Modal size='xs' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <Formik
          initialValues={{
            hour: '',
            minute: '',
          }}
          onSubmit={onSubmit}
        >
          {(props) => (
          <Form>
            <ModalContent>
              <ModalHeader>참여 시간 선택</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                스터디 참여 시간을 선택해주세요
                <HStack margin='10px 0' alignItems='flex-start' justifyContent='flex-start'>
                  <Field name='hour' validate={validateHour}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.hour && form.touched.hour} width='fit-content'>
                        <Select {...field} id='hour' placeholder='시간' width='fit-content'>
                          {
                            hours.map((h) => (
                              <option key={h} value={h}>
                                {(h > 12 ? h-12 : h).toString() }
                              </option>
                            ))
                          }
                        </Select>
                        <FormErrorMessage>{form.errors.hour}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Text alignSelf='center'>:</Text>
                  <Field name='minute' validate={validateMinute}>
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.minute && form.touched.minute} width='fit-content'>
                        <Select {...field} placeholder='분' width='fit-content'>
                          {
                            minutes.map((m) => (
                              <option key={m} value={m}>{m}</option>
                            ))
                          }
                        </Select>
                        <FormErrorMessage>{form.errors.minute}</FormErrorMessage>
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

export default TimePickerModal
