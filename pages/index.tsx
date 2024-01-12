import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

function Index() {
  return (
    <Head>
      <meta property="og:image" content="/ogImage.png" />
    </Head>
  );
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
  return {
    redirect: {
      permanent: false,
      destination: "/login?from=/",
    },
    props: {},
  };
};
