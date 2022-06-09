import { CloseIcon } from '@chakra-ui/icons'
import { Box, Text } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'

const Forbidden: NextPage = () => (
  <Box>
    <CloseIcon
      color='red'
      boxSize='100px'
    />
    <Text fontSize='25px'>403 FORBIDDEN</Text>
    <Text as='span' margin='auto 0'>권한이 없습니다</Text>
    <Text as='span' margin='auto 10'>관리자에게 회원 등록을 요청하십시오</Text>
  </Box>
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
