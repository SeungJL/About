import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isMember } from "../libs/utils/authUtils";
import { getInterestingDate } from "../libs/utils/dateUtils";
import { voteDateState } from "../recoil/studyAtoms";

function Index() {
  return;
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    if (!isMember(session.role as string)) {
      return {
        redirect: {
          permanent: false,
          destination: "/forbidden",
        },
      };
    }
    const timeout = 2000;
    await new Promise((resolve) => setTimeout(resolve, timeout));
    return {
      redirect: {
        permanent: false,
        destination: `/about`,
      },
      props: {},
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/login?from=/",
    },
    props: {},
  };
};
