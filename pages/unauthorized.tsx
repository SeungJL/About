import { Box } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { getInterestingDate } from '../libs/dateUtils'

const Unauthorized: NextPage = () => (
  <Box>
    권한이 없습니다
  </Box>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
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
    props: {},
  }
}

export default Unauthorized
