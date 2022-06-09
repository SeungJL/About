import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { getInterestingDate } from '../libs/dateUtils';

const Root: NextPage = () => <div />

export const getServerSideProps: GetServerSideProps = async ( context )=> {
  const session = await getSession({ req: context.req })
  if (session) {
    if (!['member', 'previliged'].includes(session.role as string)) {
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
        destination: `/${today.format('YYYY-MM-DD')}`,
      },
      props: {},
    }
  }
  return {
    redirect: {
      permanent: false,
      destination: '/login',
    },
    props: {},
  }
}


export default Root
