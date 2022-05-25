import { AspectRatio, Box, Button, Heading, Image, ListItem, Tag, Text, UnorderedList } from '@chakra-ui/react';
import axios from 'axios';
import dayjs from 'dayjs';
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {useState} from "react";
import { getInterestingDate } from '../../libs/dateUtils';
import dbConnect from "../../libs/dbConnect";
import { IAttendence, Attendence } from "../../models/attendence";

const Home: NextPage<{
  attendence: IAttendence
}> = ({ attendence: attendenceParam }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [attendence, setAttendence] = useState<IAttendence>(attendenceParam)

  if (!attendence)
    return (
      <div>
        Invalid Date
      </div>
    )

  const isAttending = attendence.participants.some(p => p.id === session?.uid?.toString())
  const date = router.query.date as string

  const attend = async () => {

    const { data } = await axios.patch(`/api/attend/${date}`, {
      operation: 'append',
      time: '01:00',
    })

    setAttendence(data as IAttendence)
  }

  const absent = async () => {

    const { data } = await axios.patch(`/api/attend/${date}`, {
      operation: 'delete',
    })

    setAttendence(data as IAttendence)
  }
  const dateKr = `${date.substring(0, 4)}년 ${date.substring(5, 7)}월 ${date.substring(8)}일`

  return (
    <div>
      <Heading as='h1' size='2xl'>{dateKr}</Heading>
      <Text>{attendence.participants.length}명</Text>
      <UnorderedList listStyleType='none' margin='10px 10px'>
        {
          attendence.participants.map(p => (
            <ListItem
              key={p.id}
              display='flex'
              // flexDirection='row'
              justifyItems='space-between'
              alignItems='center'
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
              <Tag>
                <Text fontSize='lg'>{p.time}</Text>
              </Tag>
            </ListItem>
          ))
        }
      </UnorderedList>
      {
        !isAttending ? (
          <Button
            colorScheme='yellow'
            size='sm'
            onClick={attend}
          >
            참가
          </Button>
        ) : (
          <Button
            colorScheme='yellow'
            size='sm'
            onClick={absent}
          >
            불참
          </Button>
        )
      }
      
    </div>
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
