import { Box, Heading, Image, VStack } from '@chakra-ui/react';
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';

const Login: NextPage<{
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>,
}> = ({ providers }) => {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    router.push('/')
  }

  return (
    <VStack height='100%' justifyContent='center'>
      <Box marginBottom='20px'>
        <Image
          src='logo.png'
        />
        <Heading textAlign='center'>VOTE HELPER</Heading>
      </Box>
      {Object.values(providers).map((provider) => (
        <Box key={provider.name}>
          <Image
            src='kakao_login.png'
            htmlWidth='200px'
            onClick={() => signIn(provider.id)}
          />
        </Box>
      ))}
    </VStack>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}

export default Login
