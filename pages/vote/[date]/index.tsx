import { Box, Button, Container, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import axios from "axios"
import { GetServerSideProps, NextPage } from "next"
import { getSession, useSession } from "next-auth/react"
import NextLink from 'next/link'
import { useEffect, useMemo, useState } from "react"
import BarChart from "../../../components/chart/barChart"
import FireIcon from "../../../components/icon/fireIcon"
import { isMember } from "../../../libs/authUtils"
import { convertToKr, getInterestingDate, getNextDate, getPreviousDate, strToDate, toDate } from "../../../libs/dateUtils"
import dbConnect from "../../../libs/dbConnect"
import { AttendDTO } from "../../../models/interface/vote"
import { Place } from "../../../models/place"
import { User } from "../../../models/user"
import { IParticipation, IVote, Vote } from "../../../models/vote"

const Main: NextPage<{
  serializedVote: string
}> = ({ serializedVote }) => {
  const { data: session } = useSession()
  const [vote, setVote] = useState<IVote>(JSON.parse(serializedVote) as IVote)

  useEffect(() => {
    setVote(JSON.parse(serializedVote) as IVote)
  }, [serializedVote])

  const [
    nextDate,
    previousDate,
    currentDate,
    dateKr,
    isAccessibleNextDay,
  ] = useMemo(() => {
    const interestingDate = getInterestingDate()
    const previous = getPreviousDate(vote.date)
    const next = getNextDate(vote.date)
    const isAccessibleNext = next.unix() - interestingDate.add(2, 'day').unix() <= 0
    const current = toDate(vote.date)

    return [
      next,
      previous,
      current,
      convertToKr(current),
      isAccessibleNext,
    ]
  }, [vote.date])

  const handleAttend = async () => {
    const attendDTO = {
      place: '62b7e654f1dcc41a72e12468',
      start: new Date(),
      end: new Date(),
      confirmed: false,
      anonymity: false,
    } as AttendDTO

    const res = await axios.post(`/api/vote/${currentDate.format('YYYY-MM-DD')}`, attendDTO)
  }
  
  return (
    <Container>
      <HStack margin='10px 0'>
        <NextLink href={`/vote/${previousDate.format('YYYY-MM-DD')}`}>
          <Button size='sm'>이전날</Button>
        </NextLink>
        <Heading as='h1' size='lg' width='100%' textAlign='center' letterSpacing={-1}>{dateKr}</Heading>
        <NextLink href={`/vote/${nextDate.format('YYYY-MM-DD')}`}>
          <Button
            size='sm'
            visibility={isAccessibleNextDay ? 'visible' : 'hidden'}
          >
            다음날
          </Button>
        </NextLink>
      </HStack>
      <HStack padding='0' alignItems='stretch' justifyContent='space-around'>
        <BarChart participations={vote.participations} />
        <VStack flex='1'>
          <Button
            width='100%'
            height='250px'
            borderRadius='5px'
            variant='solid'
            backgroundColor='gray.200'
            disabled={vote.participations.every((p) => (p.status !== 'pending'))}
            onClick={handleAttend}
          >
            <VStack>
              <Box>
                <FireIcon color='green' />
              </Box>
              <Text fontSize='2xl'>
                미참
              </Text>
            </VStack>
          </Button>
          </VStack>
        </HStack>
    </Container>
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

  const dateStr = context.params.date as string

  const dayjsDate = strToDate(dateStr)
  const interestingDate = getInterestingDate()

  if (!dayjsDate.isValid()) {
    return {
      redirect: {
        permanent: false,
        destination: `/vote/${interestingDate.format('YYYY-MM-DD')}`,
      },
      props:{},
    }
  }

  if (dayjsDate > interestingDate.add(2, 'day')) {
    return {
      redirect: {
        permanent: false,
        destination: `/vote/${interestingDate.format('YYYY-MM-DD')}`,
      },
      props: {},
    }
  }

  let vote = await Vote.findOne({ date: dayjsDate.toDate() }).populate([
    'participations.place',
  ])

  if (!vote) {
    const places = await Place.find({ status: 'active' })
    const participants = places.map((place) => {
      return {
        place: place._id,
        attendences: [],
        absences: [],
        invitations: [],
        status: 'pending',
      } as IParticipation
    })

    await Vote.create({
      date: dayjsDate.toDate(),
      participations: participants,
      regularMeeting: {
        enable: false,
      },
      agg: {
        invited: [],
        cancelled: [],
        voted: [],
      },
    })

    vote = await Vote.findOne({ date: dayjsDate.toDate() }).populate([
      'participations.place',
    ])
  }


  const serializedVote = JSON.stringify(vote)

  return { props: { serializedVote } }
}

export default Main
