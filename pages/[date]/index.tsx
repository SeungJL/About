import { AspectRatio, Box, Button, Heading, HStack, Image, ListItem, Spinner, Tag, Text, UnorderedList, VStack } from '@chakra-ui/react';
import axios from 'axios';
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { getInterestingDate, getNextDate, getPreviousDate, strToDate } from '../../libs/dateUtils';
import dbConnect from '../../libs/dbConnect';
import { IAttendence, Attendence } from '../../models/attendence';

const GREEN = '#37b24d'
const YELLOW = '#ffd43b'
const dayEnToKr = {
  'Sun': '일',
  'Mon': '월',
  'Tue': '화',
  'Wed': '수',
  'Thu': '목',
  'Fri': '금',
  'Sat': '토',
}

const Home: NextPage<{
  attendence: IAttendence
}> = ({ attendence: attendenceParam }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [attendence, setAttendence] = useState<IAttendence>(attendenceParam)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setAttendence(attendenceParam)
  }, [attendenceParam])

  const isAttending = attendence.participants.some(p => p.id === session?.uid?.toString())
  const dateStr = router.query.date as string

  const currentDate = strToDate(dateStr)
  const nextDate = getNextDate(dateStr)
  const previousDate = getPreviousDate(dateStr)
  const interestingDate = getInterestingDate()
  
  const isActivated = interestingDate <= currentDate
  const isAccessibleNextDay = nextDate.toDate() <= interestingDate.add(1, 'day').toDate()
  const isOpen = attendence.participants.length >= 3
  const progress = isOpen ? 100 : attendence.participants.length / 3 * 100
  const progressColor = isOpen ? GREEN : YELLOW

  const dateKr = `${currentDate.format('YYYY년 MM월 DD일')}(${dayEnToKr[currentDate.format('ddd')]})`

  const attend = async () => {
    if(!isActivated) return
    setLoading(true)

    const { data } = await axios.patch(`/api/attend/${dateStr}`, {
      operation: 'append',
      time: '01:00',
    })

    setLoading(false)
    setAttendence(data as IAttendence)
  }

  const absent = async () => {
    if(!isActivated) return
    setLoading(true)

    const { data } = await axios.patch(`/api/attend/${dateStr}`, {
      operation: 'delete',
    })

    setLoading(false)
    setAttendence(data as IAttendence)
  }

  const onNextDay = async () => {
    router.push(`/${nextDate.format('YYYY-MM-DD')}`)
  }

  const onPreviousDay = () => {
    router.push(`/${previousDate.format('YYYY-MM-DD')}`)
  }

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
                  !isAttending ? '불참' : '참여중'
                }
              </Text>
            </VStack>
              { isLoading && <Spinner position='absolute' />}
          </Button>
        </CircularProgressbarWithChildren>
      </Box>
      <UnorderedList listStyleType='none' margin='10px 10px'>
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
                <AspectRatio ratio={1 / 1} width='40px' marginRight='10px'>
                  <Image 
                    borderRadius='35%'
                    src={p.img}
                    alt={p.name}
                  />
                </AspectRatio>
                <Text fontSize='lg' display='inline'>{p.name}</Text>
              </Box>
              <Tag
                colorScheme='green'
                borderRadius='full'
                variant='solid'
              >
                <Text fontSize='lg'>{p.time}</Text>
              </Tag>
            </ListItem>
          ))
        }
      </UnorderedList>
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
