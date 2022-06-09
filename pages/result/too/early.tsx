import { Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

const TooEarly: NextPage = () => {
  return (
    <VStack height='100%' justifyContent='center'>
      <Text fontSize='xl'>아직 결과가 나오지 않았어요 🤷</Text>
    </VStack>
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

  if (!['member', 'previliged'].includes(session.role as string)) {
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
