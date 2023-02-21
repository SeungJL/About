import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { isMember } from "../libs/utils/authUtils";
import { getInterestingDate } from "../libs/utils/dateUtils";
import { isShowRegisterFormState } from "../recoil/atoms";

const Root: NextPage = () => <div />;

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

export default Root;
