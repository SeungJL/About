import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import { FC } from "react";
import { splitDate } from "../libs/utils/dateUtils";
import { timeRange } from "../libs/utils/timeUtils";
import { IUser } from "../models/user";
import { IAttendence } from "../models/vote";
import ProfileImage from "./profileImage";

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
    <HStack alignItems='center'>
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
          timeRange.map((idx) => (
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
    <VStack spacing={7} marginBottom='30px'>
      {
        attendences.map((attendence, idx) => (
          <TimeRangeBar key={idx} attendence={attendence} />
        ))
      }
    </VStack>
  )
}

export default TimeBoard
