import { Box, VStack, Text, HStack } from "@chakra-ui/react"
import { GetServerSideProps, NextPage } from "next"
import { getSession } from "next-auth/react"
import ProfileImage from "../../components/profileImage"
import { canResultOpen, convertToKr, getInterestingDate, strToDate } from "../../libs/dateUtils"
import dbConnect from "../../libs/dbConnect"
import { Attendence, IParticipant } from "../../models/attendence"

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
      <Text fontSize='2xl'>{convertToKr(strToDate(date))}</Text>
      <HStack>
        {
          participants.map((p) => (
            <ProfileImage
              src={p.img}
              alt={p.name}
              width='60px'
            />
          ))
        }
      </HStack>
      <Text fontSize='xl'>{studyTime}</Text>
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
  const canIResultOpen = canResultOpen()
  if (!canIResultOpen) {
    return {
      redirect: {
        permanent: false,
        destination: '/result/too/early'
      },
      props: {}
    }
  }

  let attendence = await Attendence.findOne({ date: interestingDate.format('YYYY-MM-DD') })
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
      .reduce((pre, cur, _) => pre < cur ? cur : pre)

    const hour = Math.floor(rawStudyTime / 60)
    const minute = rawStudyTime % 60

    studyTime = `${hour < 10 ? '0'+hour : hour}:${minute < 10 ? '0'+minute : minute }`

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

export default Result
