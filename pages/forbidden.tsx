import { NotAllowedIcon } from '@chakra-ui/icons'
import { Box, Container, HStack, Text, VStack } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'

const Forbidden: NextPage = () => (
  <VStack height='100%'>
      <Container width='fit-content'>
        <HStack marginTop='20vh' justifyContent='center' marginBottom='20px'>
          <NotAllowedIcon color='red' boxSize='120px'/>
          <Box>
            <Text fontSize='5xl'>403</Text>
            <Text fontSize='3xl'> FORBIDDEN</Text>
          </Box>
        </HStack>
        <Text fontSize='xl'>당신은 인가된 회원이 아닙니다</Text>
        <Text fontSize='xl'>관리자에게 회원 등록을 요청하십시오</Text>
        <Text fontSize='sm' marginTop='5px'>승인 후, 로그인 정보 갱신을 위해 다시 로그인해주십시오</Text>
      </Container>
  </VStack>
)

export const getServerSideProps: GetServerSideProps = async (context)=> {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  // if (session && ['member', 'previliged'].includes(session.role as string)) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/',
  //     },
  //     props: {},
  //   }
  // }

  return {
    props: {}
  }
}

export default Forbidden
