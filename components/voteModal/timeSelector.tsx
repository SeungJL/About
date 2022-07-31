import { Box, Select, Text } from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import { ChangeEvent, FC } from "react";
import { IParticipation } from "../../models/vote";
import TimeBoard from "../timeBoard";

const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 22]
const minutes = ['00', '30']

const TimeSelector: FC<{
  participation: IParticipation,
  start: Dayjs,
  setStart: (date: Dayjs) => void,
  end: Dayjs,
  setEnd: (date: Dayjs) => void,
}> = ({ participation, start, setStart, end, setEnd }) => {
  const onChangeHour = (type: string) => (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value
    switch (type) {
      case 'start':
        setStart(start.hour(parseInt(value, 10)))
        break
      case 'end':
        setEnd(end.hour(parseInt(value, 10)))
        break
    }
  }
  const onChangeMin = (type: string) => (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value
    switch (type) {
      case 'start':
        setStart(start.minute(parseInt(value, 10)))
        break
      case 'end':
        setEnd(end.minute(parseInt(value, 10)))
        break
    }
  }

  return (
    <>
      {
        participation?.attendences && (
          <TimeBoard attendences={participation.attendences} />
        )
      }
      <Box key='start' margin='10px 0'>
        <Box display='inline-block' width='40px'>
          <Text>시작</Text>
        </Box>
        <Select
          defaultValue={start.hour()}
          placeholder='시간'
          width='fit-content'
          display='inline-block'
          onChange={onChangeHour('start')}  
        >
          {
            hours.map((h) => (
              <option key={h} value={h}>
                { h.toString() }
              </option>
            ))
          }
        </Select>
          : 
        <Select
          defaultValue={start.minute() === 0 ? '00' : '30'}
          placeholder='분'
          width='fit-content'
          display='inline-block'
          onChange={onChangeMin('start')}
        >
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
        <Select
          defaultValue={end.hour()}
          placeholder='시간'
          width='fit-content'
          display='inline-block'
          onChange={onChangeHour('end')}  
        >
          {
            hours.map((h) => (
              <option key={h} value={h}>
                { h.toString() }
              </option>
            ))
          }
        </Select>
          : 
        <Select
          defaultValue={end.minute() === 0 ? '00' : '30'}
          placeholder='분'
          width='fit-content'
          display='inline-block'
          onChange={onChangeMin('end')}
        >
          {
            minutes.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))
          }
        </Select>
      </Box>
    </>
  )
}

export default TimeSelector
