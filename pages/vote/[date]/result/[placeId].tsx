import { CheckIcon, QuestionOutlineIcon } from "@chakra-ui/icons"
import { useToast, Spinner, VStack, Box, Heading, Image, AspectRatio, Text, Container, HStack, Divider, Badge, Button } from "@chakra-ui/react"
import dayjs from "dayjs"
import { GetServerSideProps, NextPage } from "next"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useQueryClient } from "react-query"
import ProfileImage from "../../../../components/profileImage"
import TimeBoard from "../../../../components/timeBoard"
import { useConfirmMutation } from "../../../../hooks/vote/mutations"
import { useVoteQuery } from "../../../../hooks/vote/queries"
import dbConnect from "../../../../libs/dbConnect"
import { VOTE_GET } from "../../../../libs/queryKeys"
import { isMember } from "../../../../libs/utils/authUtils"
import { strToDate, convertToKr } from "../../../../libs/utils/dateUtils"
import { getOptimalTime2 } from "../../../../libs/utils/timeUtils"
import { IPlace } from "../../../../models/place"
import { IUser } from "../../../../models/user"
import { Vote } from "../../../../models/vote"

const ParticipationResult: NextPage = () => {
  const router = useRouter()
  const toast = useToast()
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const placeId = router.query.placeId as string
  const date = strToDate(router.query.date as string)

  const { data: vote, isLoading } = useVoteQuery(
    date,
    {
      onError: (err) => {
        toast({
          title: '오류',
          description: "데이터를 불러오는 중 문제가 생겼어요.",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      },
    },
  )

  const { mutate: handleConfirm, isLoading: confirmLoading } = useConfirmMutation(
    date,
    {
      onSuccess: (data) => (
        queryClient.invalidateQueries(VOTE_GET)
      ),
      onError: (err) => {
        toast({
          title: '오류',
          description: "참여 확정 중 문제가 발생했어요. 다시 시도해보세요.",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      },
    },
  )

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  const participation = vote.participations.find((p) => (
    placeId === (p.place as IPlace)._id.toString()
  ))

  const status = participation.status
  const place = participation.place as IPlace
  const confirmedAttendences = participation.attendences
    .filter((att) => att.confirmed)
  const confirmedUser = participation.attendences
    .filter((att) => att.confirmed)
    .map((att) => att.user as IUser)
  const times = participation.attendences.map((att) => ({
    start: dayjs(att.time.start),
    end: dayjs(att.time.end),
  }))

  const myAttendence = participation.attendences
    .find((att) => (att.user as IUser).uid === session?.uid)

  const showConfirmButton = myAttendence && !myAttendence.confirmed

  const showExpectedTimeInfo = () => {
    toast({
      description: "참여 확정한 사용자 기준으로 예상한 참여시간이예요. 12시 전까지 변경될 수 있어요.",
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    })
  }

  return (
    <>
      <VStack>
        <Box position='relative' marginBottom='40px'>
          <Image
            src='https://user-images.githubusercontent.com/48513798/173590653-56823862-d7ea-4963-85c1-9a1c1867165c.png'
            alt='background-image'
          />
          {
            showConfirmButton && (
              <Box position='absolute' left='50%' top='50%'>
                <Button
                  size='lg'
                  isLoading={confirmLoading}
                  position='relative'
                  transform='translateY(-50%)'
                  right='50%'
                  colorScheme='green'
                  onClick={() => handleConfirm()}
                >
                  확정하기
                </Button>
              </Box>
            ) 
          }
          <Box position='absolute' bottom='-40px' width='100%' height='70px' overflow='hidden'>
            <Box width='70px' height='70px' margin='0 auto' position='relative'>
              {
                confirmedUser.map((user, idx) => (
                  <Box key={user.id} margin='0'>
                    <ProfileImage
                      position='absolute'
                      top='0'
                      right={`${-55 * ((confirmedUser.length+1) / 2 - (idx+1))}px`}
                      key={user.uid}
                      src={user.thumbnailImage}
                      alt={user.name}
                      width='70px'
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
          {convertToKr(date)}
        </Heading>
        <Box marginBottom='15px'>
          <AspectRatio
            ratio={1 / 1}
            width='90px'
          >
            <Image
              src={place.image}
              alt={place.fullname}
              borderRadius='15px'
              borderStyle='solid'
              borderWidth='3px'
              borderColor='gray.200'
            />
          </AspectRatio>
          <Heading
            as='h3'
            fontSize='md'
            textAlign='center'
            width='100%'
          >
            {place.branch}
          </Heading>
        </Box>
        {
          ['pending', 'open'].includes(status) && (
            <>
              <Box paddingBottom='20px'>
                {
                  status === 'waiting_confirm' ? (
                    <>
                      {
                        confirmedUser.length !== 0 && (
                          <Text fontSize='xl'>
                            {getOptimalTime2(times).format('HH시 mm분')}
                            <Text as='span' fontSize='xs' marginTop='0'>
                              (예상시간)
                            </Text>
                            <QuestionOutlineIcon
                              fontSize='xs'
                              color='yellow.600'
                              onClick={showExpectedTimeInfo}
                            />
                          </Text>
                        )
                      }
                    </>
                  ) : (
                    <Text fontSize='xl'>{participation.time && dayjs(participation.time).format('HH시 mm분')}</Text>
                  )
                }
              </Box>
              <Box marginBottom='15px'>
                <TimeBoard attendences={confirmedAttendences} />
              </Box>
              <Container>
                <Heading as='h2' fontSize='lg'>참여현황</Heading>
                <Divider marginBottom='10px' />
                <HStack justifyContent='start' overflowX='scroll' marginBottom='15px'>
                  {
                    participation.attendences.map((att) => {
                      const user = att.user as IUser
                      
                      return (
                        <Box margin='3px 6px'>
                          <Box position='relative'>
                            <ProfileImage
                              key={user.uid}
                              src={user.thumbnailImage}
                              alt={user.name}
                              width='40px'
                            />
                            <Badge
                              position='absolute'
                              width='20px'
                              height='20px'
                              borderRadius='100%'
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                              bottom='-2px'
                              right='-2px'
                              cursor='pointer'
                              backgroundColor={
                                att.confirmed ? 'green.400' : 'yellow.400'
                              }
                            >
                              {
                                att.confirmed ? (
                                  <CheckIcon color='white' />
                                ) : (
                                  <Text color='white'>?</Text>
                                )
                              }
                            </Badge>
                          </Box>
                          <Text
                            fontSize='xs'
                            width='100%'
                            textAlign='center'
                            whiteSpace='nowrap'
                            textOverflow='ellipsis'
                          >
                            {user.name}
                          </Text>
                        </Box>
                      )
                    })
                  }
                </HStack>
              </Container>
            </>
          )
        }
        {
          status === 'dismissed' && (
            <Text fontSize='xl'>이번 스터디는 열리지 못 했어요 🙅‍♀️</Text>
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

  const rawDate = context.params.date as string
  const placeId = context.params.placeId.toString()

  const dayjsDate = strToDate(rawDate)

  if (!dayjsDate.isValid()) {
    return {
      redirect: {
        permanent: false,
        destination: `/vote/${rawDate}}`,
      },
      props:{},
    }
  }


  await dbConnect()

  // const canWeResultOpen = canShowResult()
  // if (!canWeResultOpen) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/res/too/early'
  //     },
  //     props: {}
  //   }
  // }

  const vote = await Vote.findOne({ date: dayjsDate.toDate() })

  const participation = vote.participations.find((p) => (
    placeId === p.place.toString()
  ))

  if (!participation) {
    return {
      redirect: {
        permanent: false,
        destination: `/vote/${rawDate})}`,
      },
      props: {}
    }
  }

  if (participation.status === 'pending') {
    return {
      redirect: {
        permanent: false,
        destination: '/res/too/early'
      },
      props: {},
    }
  }

  return {
    props: {}
  }
}

export default ParticipationResult