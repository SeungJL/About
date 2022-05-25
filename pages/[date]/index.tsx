import { AspectRatio, Box, Button, Heading, Image, ListItem, Spinner, Tag, Text, UnorderedList, VStack } from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {useState} from 'react';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { getInterestingDate } from '../../libs/dateUtils';
import dbConnect from '../../libs/dbConnect';
import { IAttendence, Attendence } from '../../models/attendence';

const GREEN = '#37b24d'
const YELLOW = '#ffd43b'

const Home: NextPage<{
  attendence: IAttendence
}> = ({ attendence: attendenceParam }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [attendence, setAttendence] = useState<IAttendence>(attendenceParam)
  const [isLoading, setIsLoading] = useState(false)

  if (!attendence)
    return (
      <div>
        Invalid Date
      </div>
    )

  const isAttending = attendence.participants.some(p => p.id === session?.uid?.toString())
  const date = router.query.date as string

  const attend = async () => {
    setIsLoading(true)

    const { data } = await axios.patch(`/api/attend/${date}`, {
      operation: 'append',
      time: '01:00',
    })

    setIsLoading(false)
    setAttendence(data as IAttendence)
  }

  const absent = async () => {
    setIsLoading(true)

    const { data } = await axios.patch(`/api/attend/${date}`, {
      operation: 'delete',
    })

    setIsLoading(false)
    setAttendence(data as IAttendence)
  }
  const dateKr = `${date.substring(0, 4)}년 ${date.substring(5, 7)}월 ${date.substring(8)}일`

  const isOpen = attendence.participants.length >= 3
  const progress = isOpen ? 100 : attendence.participants.length / 3 * 100
  const progressColor = isOpen ? GREEN : YELLOW

  return (
    <Box>
      <Heading as='h1' size='xl' width='100%' textAlign='center' >{dateKr}</Heading>
      <Box padding='20px 50px'>
        <CircularProgressbarWithChildren
          value={progress}
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
              { isLoading && <Spinner />}
            </VStack>
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

  const rawDate = (context.params?.date || '') as string
  await dbConnect()
  
  const date = dayjs(rawDate, 'YYYY-MM-DD')
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
    if (date <= interestingDate) {
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
