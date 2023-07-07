import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

function Index() {
  return null;
}

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
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
