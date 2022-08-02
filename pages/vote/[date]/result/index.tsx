import { VStack, Spinner, useToast, Box, Heading, Image } from "@chakra-ui/react"
import { GetServerSideProps, NextPage } from "next"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useVoteQuery } from "../../../../hooks/vote/queries"
import dbConnect from "../../../../libs/dbConnect"
import { isMember } from "../../../../libs/utils/authUtils"
import { canShowResult, convertToKr, strToDate } from "../../../../libs/utils/dateUtils"
import { User } from "../../../../models/user"
import { Vote } from "../../../../models/vote"

const Result: NextPage = () => {
  const router = useRouter()
  const toast = useToast()
  const date = strToDate(router.query.date as string)

  const { data: vote, isLoading } = useVoteQuery(
    date,
    {
      onError: (err) => {
        toast({
          title: '오류',
          description: "데이터를 불러오는 중 문제가 생겼어요.",
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      },
    },
  )

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  return (
    <>
      <VStack>
        <Box position='relative' marginBottom='40px'>
          <Image
            src='https://user-images.githubusercontent.com/48513798/173590653-56823862-d7ea-4963-85c1-9a1c1867165c.png'
            alt='background-image'
          />
        </Box>
        <Heading
          as='h1'
          size='lg'
          width='100%'
          textAlign='center'
          letterSpacing={-1}
          marginBottom='20px'
        >
          {convertToKr(date)}
        </Heading>
      </VStack>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login?from=/res',
      },
      props: {},
    }
  }

  if (!isMember(session.role as string)) {
    return {
      redirect: {
        permanent: false,
        destination: '/forbidden',
      }
    }
  }

  const rawDate = context.params.date as string

  const dayjsDate = strToDate(rawDate)

  if (!dayjsDate.isValid()) {
    return {
      redirect: {
        permanent: false,
        destination: `/vote/${rawDate}`,
      },
      props:{},
    }
  }


  await dbConnect()

  // const canWeResultOpen = canShowResult()
  // if (!canWeResultOpen) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: '/res/too/early'
  //     },
  //     props: {}
  //   }
  // }
  const user = await User.findOne({ uid: session.uid })

  const vote = await Vote.findOne({ date: dayjsDate.toDate() })
  const participation = vote.participations.find((p) => (
    !!p.attendences
      .map((att) => att.user.toString())
      .find((u) => u === user._id.toString())
  ))

  if (!participation) {
    return {
      redirect: {
        permanent: false,
        destination: `/vote/${rawDate}`,
      },
      props: {}
    }
  }

  return {
    redirect: {
      permanent: false,
      destination: `/vote/${rawDate}/result/${participation.place as string}`,
    },
    props: {}
  }
}

export default Result
