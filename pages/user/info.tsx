import { Box } from "@chakra-ui/react"
import { GetServerSideProps, NextPage } from "next"
import { getSession } from "next-auth/react"

const UserInfo: NextPage = () => {
  return (
    <Box>
      내정보
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  return {
    props: { },
  }
}

export default UserInfo
