import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head';
import { getInterestingDate } from '../libs/dateUtils';

const Root: NextPage = () => (
<div>
  <Head>
    <meta property="og:image" content='https://user-images.githubusercontent.com/48513798/173183928-11974793-e983-48ec-b3da-42066deeabbc.png' /> 
  </Head>
</div>
)

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
