import { RepeatIcon, SettingsIcon } from "@chakra-ui/icons"
import { Text, Container, Heading, HStack, Divider, Box, Button, Badge, Spinner, useToast, Tab, TabList, TabPanel, TabPanels, Tabs, Image } from "@chakra-ui/react"
import axios, { AxiosError } from "axios"
import { GetServerSideProps, NextPage } from "next"
import { getSession, signOut } from "next-auth/react"
import NextLink from "next/link"
import { useState } from "react"
import { useMutation } from "react-query"
import ProfileImage from "../../components/profileImage"
import SummaryAttendenceInfo from "../../components/summaryAttendenceInfo"
import { getRoleName, isMember, isPreviliged, isStranger, role } from "../../libs/authUtils"
import { getToday, getInterestingDate } from "../../libs/dateUtils"
import dbConnect from "../../libs/dbConnect"
import { Attendence, IAttendence } from "../../models/attendence"
import { kakaoProfileInfo } from "../../models/interface/kakaoProfileInfo"
import { IUser, User } from "../../models/user"

const UserInfo: NextPage<{
  user: IUser,
  attendences: IAttendence[],
}> = ({ user: userParam, attendences }) => {
  const toast = useToast()
  const [user, setUser] = useState(userParam)

  const { isLoading: isFetchingProfile, mutate: onUpdateProfile } = useMutation<kakaoProfileInfo, AxiosError>(
    'updateProfile', 
    async () => {
      const res = await axios.patch('/api/user/profile')

      return res.data
    },
    {
      onSuccess: (data: IUser) => {
        setUser(data)
      },
      onError: (error: AxiosError) => {
        console.error(error)
        toast({
          title: '업데이트 실패',
          description: "프로필 사진을 가져오지 못 했어요.",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      }
    },
  )

  return (
    <Container>
      <HStack justifyContent='space-between' alignItems='center'>
        <Heading as='h1' fontSize='3xl' marginBottom='5px'>내정보</Heading>
        <NextLink href='/settings'>
          <SettingsIcon fontSize='30px' />
        </NextLink>
      </HStack>
      <Divider marginBottom='10px' />
      <HStack marginBottom='10px'>
        <Box position='relative'>
          <ProfileImage
            src={user.profileImage}
            alt={user.name}
            width='80px'
          />
          <Badge
            position='absolute'
            width='30px'
            height='30px'
            borderRadius='100%'
            display='flex'
            justifyContent='center'
            alignItems='center'
            bottom='-5px'
            right='-5px'
            cursor='pointer'
            onClick={() => onUpdateProfile()}
          >
            {
              isFetchingProfile ? <Spinner size='sm' /> : <RepeatIcon fontSize='lg' rotate='' />
            }
          </Badge>
        </Box>
        <HStack flex={1} justifyContent='space-between' padding='0 5px'>
          <Box>
            <Text fontSize='2xl' fontWeight='600'>{user.name}</Text>
            <HStack spacing={1}>
              {
                isStranger(user.role) && (
                  <Badge key='stranger' colorScheme='yellow'>{role.stranger}</Badge>
                )
              }
              {
                isMember(user.role) && (
                  <Badge key='member' colorScheme='green'>{role.member}</Badge>
                )
              }
              {
                isPreviliged(user.role) && (
                  <Badge key='previlied' colorScheme='red'>{getRoleName(user.role)}</Badge>
                )
              }
            </HStack>
          </Box>
          <Button
            size='sm'
            variant='outline'
            onClick={() => signOut()}
          >
            로그아웃
          </Button>
        </HStack>
      </HStack>
      <Divider />
      <SummaryAttendenceInfo attendences={attendences} />
      <Divider marginBottom='10px' />
      <Tabs variant='enclosed' isFitted colorScheme='black'>
        <TabList>
          <Tab>참여 통계</Tab>
          <Tab></Tab>   {/* TODO something */}
        </TabList>
        <TabPanels>
          <TabPanel>
            <Container position='relative'>
              <Image
                src='/temp_line_chart.svg'
                filter='blur(5px)'
              />
              <Box width='fit-content' position='absolute' top='40%' left='50%'>
                <Text
                  fontSize='2xl'
                  fontWeight='700'
                  position='relative'
                  bottom='50%'
                  right='50%'
                  color='green.500'
                >
                  COMING SOON!
                </Text>
              </Box>
            </Container>
          </TabPanel>
          <TabPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
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
  await dbConnect()

  const user = (await User.findOne({uid: session.uid})).toObject()
  const attendences = await Attendence.find({
    date: {
      $gte: getToday().add(-4, 'week').toDate(),
      $lte: getInterestingDate().add(-1, 'day').toDate(),
    },
    'participants.user': user._id,
  }).populate('participants.user')

  user._id = user._id.toString()
  const attendenceObjects = attendences.map(a => {
    const attObj = a.toObject()
    attObj._id = attObj._id.toString()
    attObj.participants = attObj.participants.map(p => {
      p.user._id = p.user._id.toString()
      return p
    })
    attObj.date = (attObj.date as Date).toISOString()
    attObj.createdAt = (attObj.createdAt as Date).toISOString()
    attObj.updatedAt = (attObj.updatedAt as Date).toISOString()

    return attObj
  })

  return {
    props: {
      user,
      attendences: attendenceObjects,
    },
  }
}

export default UserInfo
