import { GetServerSideProps, NextPage } from "next"
import { getSession } from "next-auth/react"
import dbConnect from "../../../../libs/dbConnect"
import { isMember } from "../../../../libs/utils/authUtils"
import { strToDate } from "../../../../libs/utils/dateUtils"
import { User } from "../../../../models/user"
import { Vote } from "../../../../models/vote"

const Result: NextPage = () => (
  <div />
)

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
        destination: `/vote/${rawDate}/result/summary`,
      },
      props: {},
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
