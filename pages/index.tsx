import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { isMember } from "../libs/utils/authUtils";
import { IUser } from "../types/user";

function Index() {
  return null;
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

    return {
      redirect: {
        permanent: false,
        destination: `/about`,
      },
      props: {},
    };
  }
  // 특정 페이지에서 로그인 페이지로 갔다면, 바로 그 페이지로 이동하게 함
  return {
    redirect: {
      permanent: false,
      destination: "/login?from=/",
    },
    props: {},
  };
};
