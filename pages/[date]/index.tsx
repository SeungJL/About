import { Alert, AlertIcon, Box, Button, Center, Heading, HStack, ListItem, Spinner, Tag, Text, UnorderedList, useDisclosure, VStack } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next'
import NextLink from "next/link"
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { canShowResult, convertToKr, getInterestingDate, getNextDate, getPreviousDate, strToDate } from '../../libs/dateUtils';
import dbConnect from '../../libs/dbConnect';
import { IAttendence, Attendence } from '../../models/attendence';
import TimePickerModal from '../../components/timePickerModal';
import ProfileImage from '../../components/profileImage';
import PlacePickerModal from '../../components/placePickerModal';
import { Colors } from '../../libs/colors';
import { IUser, User } from '../../models/user';
import UserInfoModal from '../../components/userInfoModal';
import Head from 'next/head';
import { isMember } from '../../libs/authUtils';
import FireIcon from '../../components/icon/fireIcon';
import { IPlace } from '../../models/place';

const Home: NextPage<{
  serializedAttendence: string,
}> = ({ serializedAttendence }) => {
  const router = useRouter()
  const { data: session } = useSession()

  const [attendence, setAttendence] = useState<IAttendence>(JSON.parse(serializedAttendence) as IAttendence)
  const [isLoading, setLoading] = useState(false)
  const [activeUserId, setActiveUserId] = useState('')
  const {
    isOpen: isTimePickerModalOpen,
    onOpen: onTimePickerModalOpen,
    onClose: onTimePickerModalClose
  } = useDisclosure()
  const {
    isOpen: isPlacePickerModalOpen,
    onOpen: onPlacePickerModalOpen,
    onClose: onPlacePickerModalClose,
  } = useDisclosure()
  const {
    isOpen: isUserInfoModalOpen,
    onOpen: onUserInfoModalOpen,
    onClose: onUserInfoModalClose,
  } = useDisclosure()

  useEffect(() => {
    setAttendence(JSON.parse(serializedAttendence) as IAttendence)
  }, [serializedAttendence])

  const dateStr = router.query.date as string

  const [isAttending, isSetTime, isSetPlace] = useMemo(
    () => {
      const attending = attendence.participants.some(p => (p.user as IUser).uid === session?.uid?.toString())
      const setTime = !!attendence.participants.find((p) => ((p.user as IUser).uid == session?.uid?.toString()))?.time
      const setPlace = !!attendence.participants.find((p) => ((p.user as IUser).uid == session?.uid?.toString()))?.place

      return [attending, setTime, setPlace]
    },
    [attendence, session],
  )

  const [
    nextDate,
    previousDate,
    dateKr,
    isActivated,
    isAccessibleNextDay,
  ] = useMemo(() => {
    const interestingDate = getInterestingDate()
    const next = getNextDate(dateStr)
    const isAccessibleNext = next.unix() - interestingDate.add(1, 'week').unix() <= 0
    const currentDate = strToDate(dateStr)

    return [
      next,
      getPreviousDate(dateStr),
      convertToKr(currentDate),
      interestingDate <= currentDate,
      isAccessibleNext,  
    ]
  }, [dateStr])

  const [
    progress,
    progressColor,
  ] = useMemo(() => {

    const isStudyOpen = attendence.participants.length >= 3
    const progress = isStudyOpen ? 100 : attendence.participants.length / 3 * 100
    const progressColor = isStudyOpen ? Colors.green : Colors.yellow

    return [
      progress,
      progressColor,
    ]
  }, [attendence])

  const onAttend = useCallback(async () => {
    if(!isActivated) return
    setLoading(true)

    const { data } = await axios.patch(`/api/attend/${dateStr}`, {
      operation: 'append',
    })

    setLoading(false)
    setAttendence(data as IAttendence)
  }, [dateStr])

  const absent = useCallback(async () => {
    if(!isActivated) return
    setLoading(true)

    const { data } = await axios.patch(`/api/attend/${dateStr}`, {
      operation: 'delete',
    })

    setLoading(false)
    setAttendence(data as IAttendence)
  }, [dateStr])
  return (
    <>
      <Head>
        <meta property="og:url" content={`${process.env.NEXTAUTH_URL}/${dateStr}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="스터디 투표" />
        <meta property="og:description" content="스터디 투표" />
        <meta property="og:image" content='/meta_tag_img.png' /> 
      </Head>
      <Box>
        <HStack margin='0 10px'>
          <NextLink href={`/${previousDate.format('YYYY-MM-DD')}`}>
            <Button size='sm'>이전날</Button>
          </NextLink>
          <Heading as='h1' size='lg' width='100%' textAlign='center' letterSpacing={-1}>{dateKr}</Heading>
          <NextLink href={`/${nextDate.format('YYYY-MM-DD')}`}>
            <Button
              size='sm'
              visibility={isAccessibleNextDay ? 'visible' : 'hidden'}
            >
              다음날
            </Button>
          </NextLink>
        </HStack>
        <Box padding='20px 50px'>
          <CircularProgressbarWithChildren
            value={progress}
            strokeWidth={10}
            styles={
              buildStyles({
                strokeLinecap: 'round',
                pathTransitionDuration: 0.5,
                pathColor: progressColor,
                trailColor: '#d6d6d6',
              })
            }
          >
            <Button
              width='80%'
              height='80%'
              borderRadius='100%'
              variant='solid'
              background='none'
              sx={{
                ':hover': {
                  background: 'none'
                }
              }}
              isDisabled={isLoading || !isActivated}
              onClick={!isAttending ? onAttend : absent}
            >
              <VStack>
                <Box>
                  <FireIcon color={progressColor} />
                </Box>
                <Text fontSize='5xl'>{attendence.participants.length}명</Text>
                <Text>
                  {
                    !isAttending ? '미참' : '참여중'
                  }
                </Text>
              </VStack>
                { isLoading && <Spinner position='absolute' />}
            </Button>
          </CircularProgressbarWithChildren>
        </Box>
        {
          (isActivated && isAttending && !isSetTime) && (
            <Alert status='warning'>
              <AlertIcon />
              시간을 선택하지 않았어요!
              <Button
                marginLeft='auto'
                variant='link'
                colorScheme='black'
                onClick={onTimePickerModalOpen}
              >
                시간 선택
              </Button>
            </Alert>
          )
        }
        {
          (isActivated && isAttending && !isSetPlace) && (
            <Alert status='warning'>
              <AlertIcon />
              장소를 선택하지 않았어요!
              <Button
                marginLeft='auto'
                variant='link'
                colorScheme='black'
                onClick={onPlacePickerModalOpen}
              >
                장소 선택
              </Button>
            </Alert>
          )
        }
        <UnorderedList listStyleType='none' margin='10px 15px'>
          {
            attendence.participants.map(p => (
              <ListItem
                key={(p.user as IUser).uid}
                display='flex'
                justifyItems='space-between'
                alignItems='center'
                marginBottom='5px'
              >
                <Box
                  display='flex'
                  flex='1'
                  flexDirection='row'
                  alignItems='center'
                >
                  <ProfileImage
                    src={(p.user as IUser).thumbnailImage}
                    alt={(p.user as IUser).name}
                    marginRight='10px'
                    onClick={() => {
                      setActiveUserId((p.user as IUser).uid)
                      if ((p.user as IUser).uid) {
                        onUserInfoModalOpen()
                      }
                    }}
                  />
                  <Text fontWeight='600' fontSize='lg' display='inline'>
                    { (p.user as IUser).name }
                    { session?.uid === (p.user as IUser).uid ? '(나)' : '' }
                  </Text>
                </Box>
                
                <Box
                    height='1.8em'
                    width='1.8em'
                    visibility={p.place ? 'visible' : 'hidden'}
                    borderRadius='0.375rem'
                    marginRight='4px'
                    boxShadow={`0px 0px 0px 0.15em ${(p.place as IPlace)?.color || 'black'} inset`}
                    onClick={(isActivated && session?.uid?.toString() === (p.user as IUser).uid) ? onPlacePickerModalOpen: null}
                    backgroundImage={`url('${(p.place as IPlace)?.image}')`}
                    backgroundSize='2em'
                    backgroundPosition='center'
                    cursor='pointer'
                />
                <Tag
                  width='4.5em'
                  height='2em'
                  colorScheme={p.time ? 'green' : 'yellow'}
                  variant='solid'
                  cursor='pointer'
                  onClick={(isActivated && session?.uid?.toString() === (p.user as IUser).uid) ? onTimePickerModalOpen : null}
                >
                  <Text margin='auto' align='center' fontSize='lg'>{p.time || '-'}</Text>
                </Tag>
              </ListItem>
            ))
          }
        </UnorderedList>
        {
          isTimePickerModalOpen && (
            <TimePickerModal
              dateStr={dateStr}
              isOpen={isTimePickerModalOpen}
              onClose={onTimePickerModalClose}
              setAttendence={setAttendence}
            />
          )
        }
        {
          isPlacePickerModalOpen && (
            <PlacePickerModal
              dateStr={dateStr}
              isOpen={isPlacePickerModalOpen}
              onClose={onPlacePickerModalClose}
              setAttendence={setAttendence}
            />
          )
        }
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
        {
          canShowResult() && (
            <Center
            width='100%'
            maxWidth='500px'
            display='flex'
            position='fixed'
            bottom='9vh'
            >
              <Button
                colorScheme='green'
                variant='outline'
                backgroundColor='white'
                borderRadius='100px'
                margin='auto auto'
                onClick={() => {
                  router.push('/res')
                }}
              >
                결과 보기
              </Button>
            </Center>
          )
        }
      </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context)=> {
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

  const user = await User.findOne({ uid: session.uid })

  if (!isMember(user?.role)) {
    if (session.role !== user?.role) {
      context.res.setHeader('Set-Cookie', 'next-auth.session-token=deleted')

      return {
        redirect: {
          permanent: false,
          destination: '/login?force_signout=true',
        }
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/forbidden',
        }
      }
    }
  }

  const rawDate = context.params.date as string

  const dayjsDate = strToDate(rawDate)
  const interestingDate = getInterestingDate()

  if (!dayjsDate.isValid()) {
    return {
      redirect: {
        permanent: false,
        destination: `/${interestingDate.format('YYYY-MM-DD')}`,
      },
      props:{},
    }
  }

  const nullableAttendence = await Attendence.findOne({ date: dayjsDate.toDate() }).populate(['participants.user', 'participants.place', 'meetingPlace'])
  let attendence: IAttendence
  if (!nullableAttendence) {
    if (dayjsDate <= interestingDate.add(1, 'week')) {
      const newAttendence = new Attendence({
        date: dayjsDate.toDate(),
        participants: [],
      })

      await newAttendence.save()
      attendence = newAttendence
    } else {
      return {
        redirect: {
          permanent: false,
          destination: `/${interestingDate.format('YYYY-MM-DD')}`,
        },
        props:{},
      }
    }
  } else {
    attendence = nullableAttendence
  }
  const serializedAttendence = JSON.stringify(attendence)

  return { props: { serializedAttendence } }
}

export default Home
