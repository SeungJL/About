import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FC } from "react";
import { splitDate } from "../libs/utils/dateUtils";
import { IUser } from "../models/user";
import { IAttendence } from "../models/vote";
import ProfileImage from "./profileImage";

const START_HOUR = 9
const END_HOUR = 22

const range = []
for (let i=START_HOUR; i<END_HOUR; i+=1/2) {
  range.push(i)
}

const TimeRangeBar: FC<{
  attendence: IAttendence,
}> = ({ attendence }) => {
  const start = dayjs(attendence.time.start)
  const end = dayjs(attendence.time.end)

  const [startHour, startMin] = splitDate(start)
  const [endHour, endMin] = splitDate(end)

  const startIdx = startHour + startMin / 60
  const endIdx = endHour + endMin / 60

  const user = attendence.user as IUser

  return (
    <HStack alignItems='center' marginBottom='20px'>
      <Box position='relative'>
        <ProfileImage
          src={user.thumbnailImage}
          alt={user.name}
        />
        <Text
          width='100%'
          position='absolute'
          as='div'
          align='center'
          fontSize='12px'
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
        >
          {user.name}
        </Text>
      </Box>
      <Box width='100%' height='35px'>
        {
          range.map((idx) => (
            <Box
              key={idx}
              width='10px'
              height='35px'
              display='inline-block'
              position='relative'
              borderRightStyle={idx % 1 !== 0 ? 'solid' : 'none'}
              borderLeftStyle={idx % 1 === 0 ? 'solid' : 'none'}
              borderRightWidth='1px'
              borderLeftWidth='1px'
              borderRightColor='gray.100'
              borderLeftColor='gray.100'
            >
              {
                idx % 1 === 0 && (
                  <Text fontSize='8px' position='absolute' top='-12px' left='-5px' zIndex='100'>{idx}</Text>
                )
              }
              {
                startIdx === idx && (
                  <Box
                    width={`${10 * (endIdx - startIdx)*2}px`}
                    height='100%'
                    display='inline-block'
                    backgroundColor='green.200'
                  />
                )
              }
            </Box>
          ))
        }
      </Box>
    </HStack>
  )
}

const TimeBoard: FC<{
  attendences: IAttendence[],
}> = ({ attendences }) => {
  return (
    <VStack>
      <TimeRangeBar attendence={{
        user: { name: '도형림', uid: '', role: '', thumbnailImage: 'https://p.kakaocdn.net/th/talkp/wmDxMsJ8sA/NjOtzO6eb3u9Zu35Xq5oE1/u88khj_110x110_c.jpg', email: '', status: '' },
        time: { start: dayjs('1995-12-17T00:30:00Z').toDate(), end: dayjs('1995-12-17T09:00:00Z').toDate() },
        note: {
          desc: '',
          lanch: 'no_select',
          dinner: 'no_select',
          afterDinner: 'no_select',
        },
        confirmed: false,
        anonymity: false,
        created: new Date(),
      }} />
      {
        attendences.map((attendence) => (
          <Box>
          </Box>
        ))
      }
    </VStack>
  )
}

export default TimeBoard
