import { Text, VStack, Image } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { isMember } from "../../../libs/authUtils";

const TooEarly: NextPage = () => {
  return (
    <>
      <VStack height='100%' justifyContent='center'>
        <Image
          src='https://user-images.githubusercontent.com/48513798/178657442-1e0dc9f2-a256-4740-9f16-1e63ac570695.jpg'
          alt='early'
          marginTop='100px'
        />
        <Text fontSize='xl'>아직 결과가 나오지 않았어요 🤷</Text>
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
        destination: '/login',
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
  return {
    props: {},
  }
}

export default TooEarly
