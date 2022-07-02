import { Box, VStack, Text, HStack, useDisclosure, Heading, Image } from "@chakra-ui/react"
import { GetServerSideProps, NextPage } from "next"
import { getSession } from "next-auth/react"
import { useState } from "react"
import ProfileImage from "../../components/profileImage"
import UserInfoModal from "../../components/userInfoModal"
import { isMember } from "../../libs/authUtils"
import { canShowResult, convertToKr, getInterestingDate, strToDate } from "../../libs/dateUtils"
import dbConnect from "../../libs/dbConnect"
import { getOptimalPlace } from "../../libs/placeUtils"
import { getOptimalTime } from "../../libs/timeUtils"
import { Attendence, IParticipant } from "../../models/attendence"
import { IPlace, Place } from "../../models/place"
import { IUser } from "../../models/user"

const Result: NextPage<{
  isOpen: boolean,
  studyTime?: string,
  studyPlace?: string,
  date: string,
  participants: string,
}> = ({ isOpen, studyTime, studyPlace: rawStudyPlace, date, participants: rawParticipants }) => {
  const [activeUserId, setActiveUserId] = useState('')

  const {
    isOpen: isUserInfoModalOpen,
    onOpen: onUserInfoModalOpen,
    onClose: onUserInfoModalClose,
  } = useDisclosure()

  const studyPlace = JSON.parse(rawStudyPlace || null) as IPlace
  const participants = JSON.parse(rawParticipants) as IParticipant[]

  if (!isOpen) {
    return (
      <>
        <Heading
          as='h1'
          size='lg'
          width='100%'
          textAlign='center'
          letterSpacing={-1}
          marginBottom='15px'
        >
          {convertToKr(strToDate(date))}
        </Heading>
        <VStack height='100%'>
          <Image
            src='https://user-images.githubusercontent.com/48513798/173598609-8f0ceed0-968e-4ca5-afc8-4139db014069.png'
            alt='background-image'
          />
          <Text fontSize='xl'>이번 스터디는 열리지 못 했어요 🙅‍♀️</Text>
        </VStack>
      </>
    )
  }

  return (
    <>
      <VStack>
        <Box position='relative' marginBottom='40px'>
          <Image
            src='https://user-images.githubusercontent.com/48513798/173590653-56823862-d7ea-4963-85c1-9a1c1867165c.png'
            alt='background-image'
          />
          <Box position='absolute' bottom='-40px' width='100%' height='70px' overflow='hidden'>
              <Box width='70px' height='70px' margin='0 auto' position='relative'>
                {
                  participants.map((p, idx) => (
                    <Box key={(p.user as IUser).id} margin='0'>
                      <ProfileImage
                        position='absolute'
                        top='0'
                        right={`${-55 * ((participants.length+1) / 2 - (idx+1))}px`}
                        key={(p.user as IUser).uid}
                        src={(p.user as IUser).thumbnailImage}
                        alt={(p.user as IUser).name}
                        width='70px'
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
              </Box>
          </Box>
        </Box>
        <Heading
          as='h1'
          size='lg'
          width='100%'
          textAlign='center'
          letterSpacing={-1}
          marginBottom='20px'
        >
          {convertToKr(strToDate(date))}
        </Heading>
        <VStack>
          <Box width='fit-content' display='flex' alignContent='center' flexDirection='column' alignItems='center'>
            <Text as='span' fontSize='lg'>오늘 스터디는 </Text>
            <Text as='span' fontSize='lg'>
              <Text as='span' fontSize='2xl' color='purple'>{studyPlace.fullname}</Text>에서 
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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login?from=/res',
      },
      props: {},
    }
  }

  if (!isMember(session.role as string)) {
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
        destination: '/res/too/early'
      },
      props: {}
    }
  }

  let attendence = await Attendence.findOne({ date: interestingDate.toDate() })
    .populate(['participants.user', 'participants.place', 'meetingPlace'])
  if (!attendence) {
    const newAttendence = new Attendence({
      date: interestingDate.toDate(),
      participants: [],
      process: 'dismiss',
    })
    attendence = await newAttendence.save()
  }

  if (attendence.participants.length < 3) {
    if (attendence.meetingTime !== '') {
      await Attendence.updateOne({date: interestingDate.toDate()}, {
        $set: {
          meetingTime: undefined,
          meetingPlace: undefined,
          process: 'dismiss',
        }
      })
    }
    return {
      props: {
        isOpen: false,
        date: interestingDate.toISOString(),
        participants: JSON.stringify(attendence.participants),
      }
    }
  }

  const totalPlaces = await Place.find({status: 'active'})
  let studyPlace = attendence.meetingPlace as IPlace
  let studyTime = attendence.meetingTime

  if (!studyPlace || !studyTime) {
    studyPlace = getOptimalPlace(attendence.participants.map((p) => p.place as IPlace).filter(p => !!p), totalPlaces)
    studyTime = getOptimalTime(attendence.participants.map((p) => p.time))
  
    await Attendence.updateOne({date: interestingDate.toDate()}, {
      $set: {
        meetingPlace: studyPlace,
        meetingTime: studyTime,
        process: 'open',
      }
    })
  }

  return {
    props: {
      isOpen: true,
      studyTime,
      studyPlace: JSON.stringify(studyPlace),
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
