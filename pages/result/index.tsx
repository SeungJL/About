import { Box, VStack, Text, HStack } from "@chakra-ui/react"
import { GetServerSideProps, NextPage } from "next"
import { getSession } from "next-auth/react"
import ProfileImage from "../../components/profileImage"
import { canShowResult, convertToKr, getInterestingDate, strToDate } from "../../libs/dateUtils"
import dbConnect from "../../libs/dbConnect"
import { Attendence, IParticipant } from "../../models/attendence"
import { IUser } from "../../models/user"

const Result: NextPage<{
  isOpen: boolean,
  studyTime: string,
  date: string,
  participants: string,
}> = ({ isOpen, studyTime, date, participants: rawParticipants }) => {
  const participants = JSON.parse(rawParticipants) as IParticipant[]

  if (!isOpen) {
    return (
      <VStack>
        <Text fontSize='2xl'>{convertToKr(strToDate(date))}</Text>
        <Text>오늘은 스터디가 열리지 못 했어요</Text>
      </VStack>
    )
  }

  return (
    <VStack>
      <Text fontSize='3xl' marginBottom='20px'>{convertToKr(strToDate(date))}</Text>
      <HStack>
        {
          participants.map((p, idx) => (
            <Box key={(p.user as IUser).id} margin='0'>
              <ProfileImage
                position='relative'
                right={`${-20 * ((participants.length+1) / 2 - (idx+1))}px`}
                key={(p.user as IUser).uid}
                src={(p.user as IUser).thumbnailImage}
                alt={(p.user as IUser).name}
                width='60px'
              />
            </Box>
          ))
        }
      </HStack>
      <Box>
        <Box width='fit-content' margin='0 auto'>
          <Text as='span' fontSize='lg'>오늘 스터디는 </Text>
          <Text as='span' fontSize='2xl' color='purple'>커피빈 광교점</Text>
          <Text as='span' fontSize='lg'>에서 </Text>
        </Box>
        <Box width='fit-content' margin='0 auto'>
          <Text as='span' fontSize='2xl' color='#ff6b6b'>{strToTimeKr(studyTime)}</Text>
          <Text as='span' fontSize='lg'>에 열려요! 👏👏👏</Text>
        </Box>
      </Box>
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }
  await dbConnect()

  const interestingDate = getInterestingDate()
  const canWeResultOpen = canShowResult()
  if (!canWeResultOpen) {
    return {
      redirect: {
        permanent: false,
        destination: '/result/too/early'
      },
      props: {}
    }
  }

  let attendence = await Attendence.findOne({ date: interestingDate.format('YYYY-MM-DD') }).populate('participants.user')
  if (!attendence) {
    const newAttendence = new Attendence({
      date: interestingDate,
      participants: [],
      meetingTime: '',
    })
    attendence = await newAttendence.save()
  }

  if (attendence.participants.length < 3) {
    if (attendence.meetingTime !== '') {
      await Attendence.updateOne({date: interestingDate.format('YYYY-MM-DD')}, {
        $set: {
          meetingTime: '',
        }
      })
    }
    return {
      props: {
        isOpen: false,
        studyTime: '',
        date: interestingDate.format('YYYY-MM-DD'),
        participants: '[]',
      }
    }
  }
  let studyTime = attendence.meetingTime
  if (studyTime === '') {
    const rawStudyTime = attendence.participants
      .map((p) => p.time)
      .filter((t) => t !== '')
      .map((t) => {
        const [rawHour, rawMinute] = t.split(':')

        const hour = parseInt(rawHour)
        const minute = parseInt(rawMinute)

        const epochMinute = hour * 60 + minute

        return epochMinute
      })
      .reduce((pre, cur, _) => pre < cur ? cur : pre, Number.MAX_VALUE)

    if (rawStudyTime === Number.MAX_VALUE) { // 아무도 시간을 정하지 않은 경우
      studyTime = '01:00'
    } else {
      const hour = Math.floor(rawStudyTime / 60)
      const minute = rawStudyTime % 60
  
      studyTime = `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute }`  
    }

    await Attendence.updateOne({date: interestingDate.format('YYYY-MM-DD')}, {
      $set: {
        meetingTime: studyTime,
      }
    })
  }

  return {
    props: {
      isOpen: true,
      studyTime,
      date: interestingDate.format('YYYY-MM-DD'),
      participants: JSON.stringify(attendence.participants),
    },
  }
}

const strToTimeKr = (rawTime: string) => {
  if (rawTime === '' || rawTime.split(':').length !== 2) return ''

  const hour = parseInt(rawTime.substring(0, 2))
  const minute = rawTime.substring(3)

  return `${hour < 12 ? '오전' :'오후'} ${hour > 12 ? hour-12 : hour}시${minute}분`
}

export default Result
