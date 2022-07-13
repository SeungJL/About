import { HStack, Box, Divider, Text } from "@chakra-ui/react"
import dayjs from "dayjs"
import { FC, useCallback } from "react"
import { attendStatus, getAttendStatus } from "../libs/attendUtils"
import { getToday } from "../libs/dateUtils"
import { IAttendence } from "../models/attendence"
import InfoPopOver from "./infoPopover"

const SummaryAttendenceInfo: FC<{
  attendences: IAttendence[],
}> = ({ attendences }) => {
  const oneWeekAgo = getToday().add(-1, 'week')
  const twoWeeksAgo = getToday().add(-2, 'week')

  const attendence7Days = attendences?.filter((a) => dayjs(a.date) >= oneWeekAgo)
  const cntVote7days = attendence7Days?.length
  const cntOpen7days = attendence7Days?.filter((a) => a.meetingTime !== '')?.length

  const attendence2Weeks = attendences?.filter((a) => dayjs(a.date) >= twoWeeksAgo)
  const cntVote2Weeks = attendence2Weeks?.length
  const cntOpen2Weeks = attendence2Weeks?.filter((a) => a.meetingTime !== '')?.length

  const cntVote1Mon = attendences?.length
  const cntOpen1Mon = attendences?.filter((a) => a.meetingTime !== '')?.length

  const attendenceStatus = getAttendStatus(cntOpen7days, cntVote7days, cntOpen2Weeks, cntVote2Weeks, cntOpen1Mon, cntVote1Mon)

  const getAttendStatusColor = useCallback((status: string) => {
    switch (status) {
      case attendStatus.high:
        return 'blue.400'
        case attendStatus.low:
        return 'yellow.500'
      case attendStatus.nothing:
        return 'black'
      default:
        return 'green'
    }
  }, [])

  return (
    <HStack justifyContent='space-between' margin='5px 0'>
      <Box key='1week' flex={1}>
        <HStack justifyContent='center' alignItems='center'>
          <Text as='span' fontSize='sm' width='fit-content' marginRight='2px'>7일</Text>
          <InfoPopOver content={'최근 7일간 참여횟수/투표횟수'} placement='top-start' />
        </HStack>
        <Text fontSize='lg' fontWeight='600' width='fit-content' margin='auto'>
          {cntOpen7days}회/{cntVote7days}회
        </Text>
      </Box>
      <Divider orientation='vertical' height='2rem' />
      <Box key='4week' flex={1}>
        <HStack justifyContent='center' alignItems='center'>
          <Text as='span' fontSize='sm' width='fit-content' marginRight='2px'>2주</Text>
          <InfoPopOver content={'최근 2주간 참여횟수/투표횟수'} placement='top' />
        </HStack>
        <Text fontSize='lg' fontWeight='600' width='fit-content' margin='auto'>
          {cntOpen2Weeks}회/{cntVote2Weeks}회
        </Text>
      </Box>
      <Divider orientation='vertical' height='2rem' />
      <Box key='status' flex={1}>
          <Text fontSize='sm' width='fit-content' marginRight='2px' margin='0 auto'>참여율</Text>
        <Text
          fontSize='lg'
          fontWeight='600'
          width='fit-content'
          margin='auto'
          color={getAttendStatusColor(attendenceStatus)}
        >
          {attendenceStatus}
        </Text>
      </Box>
    </HStack>
  )
}

export default SummaryAttendenceInfo