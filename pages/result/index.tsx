import { Box, VStack, Text, HStack, useDisclosure } from "@chakra-ui/react"
import { GetServerSideProps, NextPage } from "next"
import { getSession } from "next-auth/react"
import { useState } from "react"
import ProfileImage from "../../components/profileImage"
import UserInfoModal from "../../components/userInfoModal"
import { canShowResult, convertToKr, getInterestingDate, strToDate } from "../../libs/dateUtils"
import dbConnect from "../../libs/dbConnect"
import { getOptimalPlace, getPlaceFullName } from "../../libs/placeUtils"
import { getOptimalTime } from "../../libs/timeUtils"
import { Attendence, IParticipant } from "../../models/attendence"
import { IUser } from "../../models/user"

const Result: NextPage<{
  isOpen: boolean,
  studyTime: string,
  studyPlace: string,
  date: string,
  participants: string,
}> = ({ isOpen, studyTime, studyPlace, date, participants: rawParticipants }) => {
  const [activeUserId, setActiveUserId] = useState('')

  const participants = JSON.parse(rawParticipants) as IParticipant[]

  if (!isOpen) {
    return (
      <VStack>
        <Text fontSize='2xl'>{convertToKr(strToDate(date))}</Text>
        <Text>오늘은 스터디가 열리지 못 했어요</Text>
      </VStack>
    )
  }

  const {
    isOpen: isUserInfoModalOpen,
    onOpen: onUserInfoModalOpen,
    onClose: onUserInfoModalClose,
  } = useDisclosure()

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
                onClick={() => {
                  setActiveUserId((p.user as IUser).uid)
                  if ((p.user as IUser).uid) {
                    onUserInfoModalOpen()
                  }
                }}
              />
            </Box>
          ))
        }
      </HStack>
      <VStack>
        <Box width='fit-content' display='flex' alignContent='center' flexDirection='column' alignItems='center'>
          <Text as='span' fontSize='lg'>오늘 스터디는 </Text>
          <Text as='span' fontSize='lg'>
            <Text as='span' fontSize='2xl' color='purple'>{getPlaceFullName(studyPlace)}</Text>에서 
          </Text>

          
          <Text as='span' fontSize='lg'>
            <Text as='span' fontSize='2xl' color='#ff6b6b'>{strToTimeKr(studyTime)}</Text>에 열려요!
          </Text>
        </Box>
        <Box width='fit-content' margin='0 auto'>
        </Box>
      </VStack>
      {
        isUserInfoModalOpen && (
          <UserInfoModal
            isOpen={isUserInfoModalOpen}
            onClose={onUserInfoModalClose}
            userId={activeUserId}
            setActiveUserId={setActiveUserId}
          />
        )
      }
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

  if (!['member', 'previliged'].includes(session.role as string)) {
    return {
      redirect: {
        permanent: false,
        destination: '/forbidden',
      }
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

  let attendence = await Attendence.findOne({ date: interestingDate.toDate() }).populate('participants.user')
  if (!attendence) {
    const newAttendence = new Attendence({
      date: interestingDate.toDate(),
      participants: [],
      meetingTime: '',
      studyPlace: '',
    })
    attendence = await newAttendence.save()
  }

  if (attendence.participants.length < 3) {
    if (attendence.meetingTime !== '') {
      await Attendence.updateOne({date: interestingDate.toDate()}, {
        $set: {
          meetingTime: '',
          meetingPlace: '',
        }
      })
    }
    return {
      props: {
        isOpen: false,
        studyTime: '',
        studyPlace: '',
        date: interestingDate.toISOString(),
        participants: '[]',
      }
    }
  }

  let studyPlace = attendence.meetingPlace
  if (!studyPlace) {
    studyPlace = getOptimalPlace(attendence.participants.map((p) => p.place))

    await Attendence.updateOne({date: interestingDate.toDate()}, {
      $set: {
        meetingPlace: studyPlace,
      }
    })
  }
  
  let studyTime = attendence.meetingTime

  if (!studyTime) {
    studyTime = getOptimalTime(attendence.participants.map((p) => p.time))
  
    await Attendence.updateOne({date: interestingDate.toDate()}, {
      $set: {
        meetingTime: studyTime,
      }
    })
  }

  return {
    props: {
      isOpen: true,
      studyTime,
      studyPlace,
      date: interestingDate.toISOString(),
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
