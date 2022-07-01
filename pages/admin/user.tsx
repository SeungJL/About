import { Container, Heading, HStack, useDisclosure } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useMemo, useState } from "react";
import ProfileImage from "../../components/profileImage";
import UserAdminModal from "../../components/userAdminModal";
import { role } from "../../libs/authUtils";
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

  const users = useMemo(() => (JSON.parse(usersParam) as IUser[]), [usersParam])
  return (
    <>
      <Container>
        <Heading as='h2'>{role.previliged.display}</Heading>
        <HStack flexWrap='nowrap' overflowX='auto' paddingBottom='10px'>
          {
            users.filter((user) => (user.role === role.previliged.value)).map((user) => (
              <ProfileImage
                key={user.uid}
                flex='0 0 auto'
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
        <Heading as='h2'>{role.member.display}</Heading>
        <HStack flexWrap='nowrap' overflowX='auto' paddingBottom='10px'>
          {
            users.filter((user) => (user.role === role.member.value)).map((user) => (
              <ProfileImage 
                key={user.uid}
                flex='0 0 auto'
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
        <Heading as='h2'>{role.stranger.display}</Heading>
        <HStack flexWrap='nowrap' overflowX='auto' paddingBottom='10px'>
        {
          users.filter((user) => (user.role === role.stranger.value)).map((user) => (
            <ProfileImage
              key={user.uid}
              flex='0 0 auto'
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

  // if (!isPreviliged(session.role as string)) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/forbidden',
  //     }
  //   }
  // }
  await dbConnect()

  const users = await User.find({status: 'active'})

  return {
    props: {
      users: JSON.stringify(users)
    },
  }
}

export default AdminUser
