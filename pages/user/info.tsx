import { RepeatIcon, SettingsIcon } from "@chakra-ui/icons"
import { Text, Container, Heading, HStack, Divider, Box, Button, Badge, Spinner, useToast, Tab, TabList, TabPanel, TabPanels, Tabs, Image, Grid, GridItem, Link, SimpleGrid } from "@chakra-ui/react"
import axios, { AxiosError } from "axios"
import { GetServerSideProps, NextPage } from "next"
import { getSession, signOut } from "next-auth/react"
import NextLink from "next/link"
import { useMemo, useState } from "react"
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
  user: string,
  attendences: string,
}> = ({ user: userParam, attendences: attendencesParam }) => {
  const toast = useToast()
  const [user, setUser] = useState(JSON.parse(userParam) as IUser)
  const attendences = useMemo(() => (JSON.parse(attendencesParam) as IAttendence[]), [attendencesParam])

  console.log(user)
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
          description: "프로필 사진을 업데이트하려면 재로그인이 필요해요.",
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
                  <Badge key='stranger' colorScheme='yellow'>{role.stranger.display}</Badge>
                )
              }
              {
                isMember(user.role) && (
                  <Badge key='member' colorScheme='green'>{role.member.display}</Badge>
                )
              }
              {
                isPreviliged(user.role) && (
                  <Badge key='previliged' colorScheme='red'>{role.previliged.display}</Badge>
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
      {
        isPreviliged(user.role) && (
          <>
            <Heading as='h2' size='lg'>관리</Heading>
            <Divider marginBottom='10px' />
            <SimpleGrid columns={2} spacing={1}>
              <NextLink href='/admin/user'>
                <Link fontSize='1.2rem' fontWeight='500'>사용자 관리</Link>
              </NextLink>
      
              <Text fontSize='1.2rem' fontWeight='500' color='gray.400'>투표 관리</Text>
              <Text fontSize='1.2rem' fontWeight='500' color='gray.400'>장소 관리</Text>
            </SimpleGrid>    
          </>
        )
      }
      <Divider marginBottom='10px' />
      <Tabs variant='enclosed' colorScheme='black'>
        <TabList>
          <Tab width='50%'>참여 통계</Tab>
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

  const user = await User.findOne({uid: session.uid})
  const attendences = await Attendence.find({
    date: {
      $gte: getToday().add(-4, 'week').toDate(),
      $lte: getInterestingDate().add(-1, 'day').toDate(),
    },
    'participants.user': user._id,
  }).populate('participants.user')

  return {
    props: {
      user: JSON.stringify(user),
      attendences: JSON.stringify(attendences),
    },
  }
}

export default UserInfo
