import { CheckIcon, QuestionOutlineIcon } from "@chakra-ui/icons"
import { useToast, Spinner, VStack, Box, Heading, Image, AspectRatio, Text, Container, HStack, Divider, Badge, Button, useDisclosure, AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Alert, AlertIcon, AlertTitle, Tag } from "@chakra-ui/react"
import dayjs from "dayjs"
import { GetServerSideProps, NextPage } from "next"
import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useRef } from "react"
import { useQueryClient } from "react-query"
import NextLink from 'next/link'
import ProfileImage from "../../../../components/profileImage"
import TimeBoard from "../../../../components/timeBoard"
import { useAbsentMutation, useArrivedMutation, useConfirmMutation, useDismissMutation } from "../../../../hooks/vote/mutations"
import { useVoteQuery } from "../../../../hooks/vote/queries"
import dbConnect from "../../../../libs/dbConnect"
import { VOTE_GET } from "../../../../libs/queryKeys"
import { isMember } from "../../../../libs/utils/authUtils"
import { strToDate, convertToKr, canShowResult, now, dateToDayjs } from "../../../../libs/utils/dateUtils"
import { getCommonTime, getOptimalTime2, isAlone, openable } from "../../../../libs/utils/timeUtils"
import { IPlace } from "../../../../models/place"
import { IUser } from "../../../../models/user"
import { Vote } from "../../../../models/vote"
import ChangeTimeModal from "../../../../components/changeTimeModal"
import { statusMap } from "./summary"

const ParticipationResult: NextPage = () => {
  const router = useRouter()
  const toast = useToast()
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const placeId = router.query.placeId as string
  const date = strToDate(router.query.date as string)

  const cancelRef = useRef()
  const {
    isOpen: isAbsentAlertOpen,
    onOpen: onAbsentAlertOpen,
    onClose: onAbsentAlertClose,
  } = useDisclosure()

  const {
    isOpen: isDismissAlertOpen,
    onOpen: onDismissAlertOpen,
    onClose: onDismissAlertClose,
  } = useDisclosure()

  const {
    isOpen: isChangeTimeOpen,
    onOpen: onChangeTimeOpen,
    onClose: onChangeTimeClose,
  } = useDisclosure()

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
          description: "참여확정 중 문제가 발생했어요. 다시 시도해보세요.",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      },
    },
  )

  const { mutate: handleDismiss, isLoading: dismissLoading } = useDismissMutation(
    date,
    {
      onSuccess: (data) => (
        queryClient.invalidateQueries(VOTE_GET)
      ),
      onError: (err) => {
        toast({
          title: '오류',
          description: "불참처리 중 문제가 발생했어요. 다시 시도해보세요.",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      },
    },
  )

  const { mutate: handleAbsent, isLoading: absentLoading } = useAbsentMutation(
    date,
    {
      onSuccess: (data) => (
        queryClient.invalidateQueries(VOTE_GET)
      ),
      onError: (err) => {
        toast({
          title: '오류',
          description: "참여취소 중 문제가 발생했어요. 다시 시도해보세요.",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      },
    },
  )

  const { mutate: handleArrived } = useArrivedMutation(
    date,
    {
      onSuccess: (data) => (
        queryClient.invalidateQueries(VOTE_GET)
      ),
      onError: (err) => {
        toast({
          title: '오류',
          description: "출석체크 중 문제가 발생했어요. 다시 시도해보세요.",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      },
    }
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

  const participationTimes = participation.attendences.map((att) => att.time)
  const isOpenable = openable(participationTimes)
  const commonTime = getCommonTime(participationTimes)
  const amIAlone = myAttendence && isAlone(myAttendence.time, commonTime)

  const canShowAttendedButton = () => {
    if (!myAttendence) return false
    if (myAttendence.arrived) return false
    if (status !== 'open') return false

    const currentTime = now()

    const {
      start: markedStart,
      end: markedEnd,
    } = myAttendence.time

    const startable = dateToDayjs(markedStart).subtract(2, 'hour')
    const endable = dateToDayjs(markedEnd)

    return startable <= currentTime && currentTime <= endable
  }

  const showConfirmButton = myAttendence 
    && !myAttendence.confirmed
    && status === 'waiting_confirm'

  const imageSrc = status === 'dismissed' ?
    'https://user-images.githubusercontent.com/48513798/182346011-e9cbad49-9cde-4608-a24d-f56ab40cb84c.jpg'
    : 'https://user-images.githubusercontent.com/48513798/173590653-56823862-d7ea-4963-85c1-9a1c1867165c.png'

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
            src={imageSrc}
            alt='background-image'
          />
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
          paddingBottom='15px'
        >
          {place.fullname}
        </Heading>
        {
          participation.attendences.length > 1 && amIAlone && (
            <Alert status='error'>
              <AlertIcon />
              다른분들과 시간이 겹치지 않아요
              <Button
                marginLeft='auto'
                variant='link'
                colorScheme='black'
                onClick={onChangeTimeOpen}
              >
                시간 변경
              </Button>              
            </Alert>
          )
        }
        {
          canShowAttendedButton() && (
            <Alert status='success'>
              <AlertIcon />
              도착하셨나요? 출석체크해주세요!
              <Button
                marginLeft='auto'
                variant='link'
                colorScheme='black'
                onClick={() => handleArrived()}
              >
                출석체크
              </Button>              
            </Alert>
          )
        }
        {
          myAttendence?.confirmed === false && (
            <Alert status='warning'>
              <AlertIcon />
              참여확정을 하지 않으면 임의로 장소가 바뀔 수도 있어요         
            </Alert>
          )
        }
        {
          status !== 'dismissed' && (
            <>
              <Box>
                {
                  status === 'waiting_confirm' ? (
                    <>
                      {
                        confirmedUser.length !== 0 && isOpenable && (
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
              <Box paddingBottom='20px'>
                <Tag colorScheme={statusMap[participation.status].color}>
                  {statusMap[participation.status].value}
                </Tag>
              </Box>
              <Box marginBottom='15px'>
                <TimeBoard attendences={confirmedAttendences} />
              </Box>
              <Container>
                <Heading as='h2' marginTop='15px' fontSize='lg'>참여현황</Heading>
                <Divider marginBottom='10px' />
                <HStack spacing={1} justifyContent='start' overflowX='scroll' marginBottom='15px'>
                  {
                    participation.attendences.map((att) => {
                      const user = att.user as IUser
                      
                      return (
                        <Box key={user._id.toString()} margin='3px 0'>
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
              {
                myAttendence?.confirmed && !myAttendence?.arrived && (
                  <Button
                    size='sm'
                    colorScheme='red'
                    onClick={onDismissAlertOpen}
                  >
                    불참
                  </Button>
                )
              }
            </>
          )
        }
        {
          status === 'dismissed' && (
            <Text fontSize='xl'>이번 스터디는 열리지 못 했어요 🙅‍♀️</Text>
          )
        }
      </VStack>
      {
        showConfirmButton ? (
          <HStack
            borderTop='1px'
            borderColor='gray.200'
            backgroundColor='white'
            position='fixed'
            bottom='0'
            width='100%'
            padding='10px'
            zIndex={999}
          >
            <Button
              size='lg'
              flex='1'
              colorScheme='red'
              onClick={onAbsentAlertOpen}
            >
              참여취소
            </Button>
            <Button
              size='lg'
              flex='2'
              isLoading={confirmLoading}
              colorScheme='green'
              onClick={() => handleConfirm()}
            >
              참여확정
            </Button>
          </HStack>
        ) : (
          <Box
            backgroundColor='white'
            position='fixed'
            bottom='0'
            width='100%'
            maxWidth='500px'
            padding='10px'
            zIndex={999}
          >
            <NextLink href={`/vote/${date.format('YYYY-MM-DD')}/result/summary`}>
              <Button width='100%' size='lg'>
                투표현황
              </Button>
            </NextLink>
          </Box>
        )
      }
      {
        isChangeTimeOpen && (
          <ChangeTimeModal
            isOpen={isChangeTimeOpen}
            onClose={onChangeTimeClose}
            date={date}
            myParticipantTime={myAttendence.time}
            participation={participation}
          />
        )
      }
      <AlertDialog
        isOpen={isAbsentAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAbsentAlertClose}
        isCentered
        size='xs'
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              경고
            </AlertDialogHeader>

            <AlertDialogBody>
              정말 참여취소하실건가요?
              <br />
              취소하시면 <strong>다시 참여신청을 하실 수 없어요</strong>
            </AlertDialogBody>

            <AlertDialogFooter display='flex'>
              <Button 
                flex='1' 
                isLoading={absentLoading}
                colorScheme='red'
                onClick={() => { handleAbsent(); onAbsentAlertClose() }}
              >
                참여취소
              </Button>
              <Button flex='2' ref={cancelRef} onClick={onAbsentAlertClose} ml={3}>
                취소
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isDismissAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDismissAlertClose}
        isCentered
        size='xs'
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              경고
            </AlertDialogHeader>
            <AlertDialogBody>
              정말 불참하실건가요?
              <br />
              다시 참여신청을 하실 수 없고 불참으로 기록돼요
            </AlertDialogBody>

            <AlertDialogFooter display='flex'>
              <Button
                flex='1' 
                isLoading={dismissLoading}
                colorScheme='red'
                onClick={() => { handleDismiss(); onDismissAlertClose() }}
              >
                불참
              </Button>
              <Button flex='2' ref={cancelRef} onClick={onDismissAlertClose} ml={3}>
                취소
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
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