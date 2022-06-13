import { RepeatIcon } from "@chakra-ui/icons"
import { Text, Container, Heading, HStack, Divider, Box, Button, Badge, Spinner, useToast } from "@chakra-ui/react"
import axios, { AxiosError } from "axios"
import { GetServerSideProps, NextPage } from "next"
import { getSession, signOut } from "next-auth/react"
import { useState } from "react"
import { useMutation } from "react-query"
import ProfileImage from "../../components/profileImage"
import { getRoleName, isMember, isPreviliged, isStranger, role } from "../../libs/authUtils"
import dbConnect from "../../libs/dbConnect"
import { kakaoProfileInfo } from "../../models/interface/kakaoProfileInfo"
import { IUser, User } from "../../models/user"

const UserInfo: NextPage<{
  user: IUser
}> = ({ user: userParam }) => {
  const toast = useToast()
  const [user, setUser] = useState(userParam)

  const { isLoading, mutate: onUpdateProfile } = useMutation<kakaoProfileInfo, AxiosError>(
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
      <Heading as='h1' fontSize='3xl' marginBottom='5px'>내정보</Heading>
      <Divider marginBottom='10px' />
      <HStack>
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
              isLoading ? <Spinner size='sm' /> : <RepeatIcon fontSize='lg' rotate='' />
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
  user._id = user._id.toString()

  return {
    props: { user },
  }
}

export default UserInfo
