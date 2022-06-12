import { GetServerSideProps, NextPage } from "next"
import { getSession, signOut } from "next-auth/react"

const ForbiddenSignout: NextPage = () => {
  signOut()

  return (
    <div />
  )
}

export const getServerSideProps: GetServerSideProps = async (context)=> {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login?force_signout=true'
      }
    }
  }

  return {
    props: {}
  }
}

export default ForbiddenSignout
