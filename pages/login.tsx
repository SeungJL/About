import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, getSession, LiteralUnion, signIn } from 'next-auth/react'
import { useState } from 'react';
import { getInterestingDate } from '../libs/dateUtils';
import Logo from '../components/logo';

const Login: NextPage<{
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>,
}> = ({ providers }) => {
  const [loading, setLoading] = useState(false)

  const customSignin = async (kakaoProvider: ClientSafeProvider) => {
    setLoading(true)

    await signIn(kakaoProvider.id)

    setLoading(false)
  }

  const kakaoProvider = Object.values(providers).find((p) => p.id == 'kakao')

  return (
    <VStack height='100%' justifyContent='center'>
      <VStack marginBottom='20px'>
        <Logo />
        <Heading textAlign='center'>VOTE HELPER</Heading>
      </VStack>

      <Box key={kakaoProvider.id}>
        <Button
          width='230px'
          height='60px'
          backgroundColor='#FEE500'
          borderRadius='6px'
          isLoading={loading}
          onClick={() => customSignin(kakaoProvider)}
        >
          <HStack width='200px' justifyContent='space-between'>
            <Box display='inline'
              marginRight='10px'
            >
              <svg width="25" height="23" viewBox="0 0 348 317" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M348 135.5C348 210.335 270.098 271 174 271C77.9025 271 0 210.335 0 135.5C0 60.6654 77.9025 0 174 0C270.098 0 348 60.6654 348 135.5Z" fill="#000000"/>
                <path d="M91.0331 216.167C91.6506 213.791 93.9017 212.215 96.3456 212.447L193.205 221.656C197.833 222.096 199.408 228.063 195.6 230.729L74.2661 315.688C70.4575 318.355 65.3894 314.834 66.559 310.335L91.0331 216.167Z" fill="#000000"/>
              </svg>
            </Box>
            <Text fontSize='lg' flex='1' display='inline'>카카오 로그인</Text>
          </HStack>
        </Button>
      </Box>
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  const session = await getSession({ req: context.req })
  const returnTo = context.query.from as string

  const interestingDateStr = getInterestingDate().format('YYYY-MM-DD')

  if (session) {
    if (returnTo) {
      return {
        redirect: {
          permanent: false,
          destination: returnTo,
        }
      }
    }
    return {
      redirect: {
        permanent: false,
        destination: `/${interestingDateStr}`,
      },
      props: {},
    }
  }

  return {
    props: { providers },
  }
}

export default Login
