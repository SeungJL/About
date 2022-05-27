import { Box, Button, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, getSession, LiteralUnion, signIn } from 'next-auth/react'
import { useState } from 'react';
import { getInterestingDate } from '../libs/dateUtils';

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
        <svg fill="none" height="200" viewBox="0 0 20 20" width="200" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.2323 9H13.5C13.7761 9 14 9.22386 14 9.5C14 9.77614 13.7761 10 13.5 10H6.5C6.22386 10 6 9.77614 6 9.5C6 9.22386 6.22386 9 6.5 9H7.25718C6.9747 8.68674 6.91184 8.21533 7.13414 7.83029L9.63414 3.50017C9.91028 3.02187 10.5219 2.858 11.0002 3.13414L13.5982 4.63414C14.0765 4.91028 14.2404 5.52187 13.9643 6.00017L12.2323 9ZM13.0982 5.50017L10.5002 4.00017L8.00017 8.33029L9.16013 9H11.0776L13.0982 5.50017Z" fill="#212121"/>
          <path d="M13.9597 8L14.5367 7.00067C14.8377 7.01169 15.1185 7.15799 15.3 7.4L17.8 10.7333C17.9298 10.9064 18 11.117 18 11.3333V16C18 16.5523 17.5523 17 17 17H3C2.44772 17 2 16.5523 2 16V11.3333C2 11.117 2.07018 10.9064 2.2 10.7333L4.7 7.4C4.88885 7.14819 5.18524 7 5.5 7H6.46349L5.98412 7.83029C5.95234 7.88534 5.92639 7.94214 5.90607 8H5.5L3.25 11H16.75L14.5 8H13.9597ZM3 16H17V12H3V16Z" fill="#212121"/>
        </svg>
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

  const interestingDateStr = getInterestingDate().format('YYYY-MM-DD')

  if (session) {
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
