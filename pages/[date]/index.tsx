import { Alert, AlertIcon, AspectRatio, Box, Button, Heading, HStack, Image, ListItem, Spinner, Tag, Text, UnorderedList, useDisclosure, VStack } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next'
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
import { getPlaceColor, getPlaceImg } from '../../libs/placeUtils';
import { Colors } from '../../libs/colors';

const Home: NextPage<{
  attendence: IAttendence
}> = ({ attendence: attendenceParam }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [attendence, setAttendence] = useState<IAttendence>(attendenceParam)
  const [isLoading, setLoading] = useState(false)
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

  useEffect(() => {
    setAttendence(attendenceParam)
  }, [attendenceParam])

  const dateStr = router.query.date as string

  const isAttending = useMemo(() => attendence.participants.some(p => p.id === session?.uid?.toString()), [attendence])

  const [
    nextDate,
    previousDate,
    dateKr,
    isActivated,
    isAccessibleNextDay,
  ] = useMemo(() => {
    const interestingDate = getInterestingDate()
    const nextDate = getNextDate(dateStr)
    const isAccessibleNextDay = nextDate.unix() <= interestingDate.add(1, 'day').unix()
    const currentDate = strToDate(dateStr)

    return [
      nextDate,
      getPreviousDate(dateStr),
      convertToKr(currentDate),
      interestingDate <= currentDate,
      isAccessibleNextDay,  
    ]
  }, [dateStr])

  const [
    isSetTime,
    isSetPlace,
    progress,
    progressColor,
  ] = useMemo(() => {

    const isStudyOpen = attendence.participants.length >= 3
    const isSetTime = attendence.participants.find((p) => (p.id == session?.uid?.toString()))?.time !== ''
    const isSetPlace = attendence.participants.find((p) => (p.id == session?.uid?.toString()))?.place !== ''
    const progress = isStudyOpen ? 100 : attendence.participants.length / 3 * 100
    const progressColor = isStudyOpen ? Colors.green : Colors.yellow

    return [
      isSetTime,
      isSetPlace,
      progress,
      progressColor,
    ]
  }, [attendence])

  const attend = useCallback(async () => {
    if(!isActivated) return
    setLoading(true)

    const { data } = await axios.patch(`/api/attend/${dateStr}`, {
      operation: 'append',
      time: '',
    })

    setLoading(false)
    setAttendence(data as IAttendence)
  }, [])

  const absent = useCallback(async () => {
    if(!isActivated) return
    setLoading(true)

    const { data } = await axios.patch(`/api/attend/${dateStr}`, {
      operation: 'delete',
    })

    setLoading(false)
    setAttendence(data as IAttendence)
  }, [])

  const onNextDay = useCallback(async () => {
    router.push(`/${nextDate.format('YYYY-MM-DD')}`)
  }, [dateStr])

  const onPreviousDay = useCallback(() => {
    router.push(`/${previousDate.format('YYYY-MM-DD')}`)
  }, [dateStr])

  return (
    <Box>
      <HStack margin='0 10px'>
        <Button size='sm' onClick={() => onPreviousDay()}>이전날</Button>
        <Heading as='h1' size='lg' width='100%' textAlign='center' >{dateKr}</Heading>
        <Button
          visibility={isAccessibleNextDay ? 'visible' : 'hidden'}
          size='sm'
          onClick={() => onNextDay()}
        >
          다음날
        </Button>
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
            onClick={!isAttending ? attend : absent}
          >
            <VStack>
              <Box>
                <svg width='100px' viewBox='0 0 24 24'>
                  <g>
                    <path d='M0 0h24v24H0z' fill='none'/>
                    <path d='M12 23a7.5 7.5 0 0 1-5.138-12.963C8.204 8.774 11.5 6.5 11 1.5c6 4 9 8 3 14 1 0 2.5 0 5-2.47.27.773.5 1.604.5 2.47A7.5 7.5 0 0 1 12 23z' fill={progressColor} />
                  </g>
                </svg>
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
      <UnorderedList listStyleType='none' margin='10px 25px'>
        {
          attendence.participants.map(p => (
            <ListItem
              key={p.id}
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
                  src={p.img}
                  alt={p.name}
                  marginRight='10px'
                />
                <Text fontWeight='600' fontSize='lg' display='inline'>{p.name}</Text>
              </Box>
              <Box
                  height='1.8em'
                  width='1.8em'
                  visibility={p.place ? 'visible' : 'hidden'}
                  borderRadius='0.375rem'
                  marginRight='4px'
                  boxShadow={`0px 0px 0px 0.15em ${getPlaceColor(p.place)} inset`}
                  onClick={(isActivated && session?.uid?.toString() === p.id) ? onPlacePickerModalOpen: null}
                  backgroundImage={`url('${getPlaceImg(p.place)}')`}
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
                onClick={(isActivated && session?.uid?.toString() === p.id) ? onTimePickerModalOpen : null}
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
        canShowResult() && (
          <Box
           width='100%'
           display='flex'
           position='fixed'
           bottom='20px'
          >
            <Button
              colorScheme='green'
              variant='outline'
              borderRadius='100px'
              margin='auto auto'
              onClick={() => {
                router.push('/result')
              }}
            >
              결과 보기
          </Button>
          </Box>
        )
      }
    </Box>
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

  const rawDate = context.params.date as string
  await dbConnect()

  const date = strToDate(rawDate)
  const interestingDate = getInterestingDate()

  if (!date.isValid()) {
    return {
      redirect: {
        permanent: false,
        destination: `/${interestingDate.format('YYYY-MM-DD')}`,
      },
      props:{},
    }
  }

  const nullableAttendence = await Attendence.findOne({ date: rawDate })
  let attendence: IAttendence
  if (!nullableAttendence) {
    if (date <= interestingDate.add(1, 'day')) {
      const newAttendence = new Attendence({
        date: rawDate,
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

  const serializableAttendence = attendence.toObject()
  serializableAttendence._id = serializableAttendence._id.toString()
  serializableAttendence.createdAt = (serializableAttendence.createdAt as Date).toISOString()
  serializableAttendence.updatedAt = (serializableAttendence.updatedAt as Date).toISOString()

  return { props: { attendence: serializableAttendence } }
}

export default Home
