import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { isMember } from '../../libs/utils/authUtils'
import { getInterestingDate } from '../../libs/utils/dateUtils'

const Root: NextPage = () => (
  <div />
)

export const getServerSideProps: GetServerSideProps = async ( context )=> {
  const session = await getSession({ req: context.req })
  if (session) {
    if (!isMember(session.role as string)) {
      return {
        redirect: {
          permanent: false,
          destination: '/forbidden',
        }
      }
    }

    const today = getInterestingDate()

    return {
      redirect: {
        permanent: false,
        destination: `/vote/${today.format('YYYY-MM-DD')}/result`,
      },
      props: {},
    }
  }
  return {
    redirect: {
      permanent: false,
      destination: '/login?from=/',
    },
    props: {},
  }
}


export default Root
