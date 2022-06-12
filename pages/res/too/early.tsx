import { Text, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { isMember } from "../../../libs/authUtils";

const TooEarly: NextPage = () => {
  return (
    <>
      <Head>
        <meta property="og:url" content="/res/too/early" /> 
        <meta property="og:type" content="website" /> 
        <meta property="og:title" content="스터디 결과" />
        <meta property="og:description" content="아직 결과가 오픈되지 않았습니다" /> 
        <meta property="og:image" content='https://user-images.githubusercontent.com/48513798/173183928-11974793-e983-48ec-b3da-42066deeabbc.png' /> 
      </Head>
      <VStack height='100%' justifyContent='center'>
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
