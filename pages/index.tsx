import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isMember } from "../libs/utils/authUtils";
import { getInterestingDate } from "../libs/utils/dateUtils";
import { AAState } from "../recoil/studyAtoms";

function Main() {
  const B = useSetRecoilState(AAState);
  useEffect(() => {
    B(true);
  }, []);
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const isActive = true;

  if (session) {
    if (!isMember(session.role as string)) {
      return {
        redirect: {
          permanent: false,
          destination: "/forbidden",
        },
      };
    }

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

export default Main;
