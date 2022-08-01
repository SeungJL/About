import { Container, Divider, Text, Heading, HStack, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useMemo, useState } from "react";
import ProfileImage from "../../components/profileImage";
import UserAdminModal from "../../components/userAdminModal";
import { isPreviliged, role } from "../../libs/utils/authUtils";
import { convertToKr, getToday } from "../../libs/utils/dateUtils";
import dbConnect from "../../libs/dbConnect";
import { IUser, User } from "../../models/user";

const AdminUser: NextPage<{
  users: string,
}> = ({ users: usersParam }) => {
  const [activeUserId, setActiveUserId] = useState('')
  const {
    isOpen: isUserAdminModalOpen,
    onOpen: onUserAdminModalOpen,
    onClose: onUserAdminModalClose,
  } = useDisclosure()

  const users = useMemo(() => ((JSON.parse(usersParam) as IUser[])), [usersParam])
  const [startDay, endDay] = useMemo(() => {
    const today = getToday()
    const start = today.subtract(2, 'week').startOf('week').add(1, 'day')
    const end = today.subtract(1, 'week').endOf('week').add(1, 'day')

    return [start, end]
  }, [])


  return (
    <>
      <Container>
        <Container marginBottom='20px'>
          <Heading as='h1'>권한별</Heading>
          <Divider />
          {
            Object.values(role).map((r => (
              <>
                <Heading as='h2' size='lg'>{r.display}</Heading>
                <HStack flexWrap='nowrap' overflowX='auto' paddingBottom='10px'>
                  {
                    users.filter((user) => (user.role === r.value)).map((user) => (
                      <ProfileImage
                        key={user.uid}
                        flex='0 0 auto'
                        width='60px'
                        src={user.thumbnailImage}
                        alt={user.name}
                        onClick={() => {
                          setActiveUserId(user.uid)
                          onUserAdminModalOpen()
                        }}
                      />
                    ))
                  }
                </HStack>
              </>
            )))
          }
        </Container>
        <Heading as='h1'>참여별(2주)</Heading>
        <Text>{convertToKr(startDay)} ~ {convertToKr(endDay)}</Text>
        <Divider />
          {
            [0, 1, 2, 3, 4].map((attendCnt => (
              <>
                <Heading as='h2' size='lg'>{attendCnt}회</Heading>
                <HStack flexWrap='nowrap' overflowX='auto' paddingBottom='10px'>
                  {
                    users.filter((user) => (user.statistic.openCnt2Week === attendCnt)).map((user) => (
                      <ProfileImage
                        key={user.uid}
                        flex='0 0 auto'
                        width='60px'
                        src={user.thumbnailImage}
                        alt={user.name}
                        onClick={() => {
                          setActiveUserId(user.uid)
                          onUserAdminModalOpen()
                        }}
                      />
                    ))
                  }
                </HStack>
              </>
            )))
          }
        <Heading as='h2' size='lg'>5회 이상</Heading>
        <HStack flexWrap='nowrap' overflowX='auto' paddingBottom='10px'>
          {
            users.filter((user) => (user.statistic.openCnt2Week > 4)).map((user) => (
              <ProfileImage
                key={user.uid}
                flex='0 0 auto'
                width='60px'
                src={user.thumbnailImage}
                alt={user.name}
                onClick={() => {
                  setActiveUserId(user.uid)
                  onUserAdminModalOpen()
                }}
              />
            ))
          }
        </HStack>
      </Container>
      {
        isUserAdminModalOpen && (
          <UserAdminModal
            isOpen={isUserAdminModalOpen}
            onClose={onUserAdminModalClose}
            userId={activeUserId}
          />
        )
      }
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

  if (!isPreviliged(session.role as string)) {
    return {
      redirect: {
        permanent: false,
        destination: '/forbidden',
      }
    }
  }
  await dbConnect()

  const users = await User.find({role: {$in: ['member', 'previliged']}})

  return {
    props: {
      users: JSON.stringify(users)
    },
  }
}

export default AdminUser
