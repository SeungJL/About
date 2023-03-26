import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import safeJsonStringify from "safe-json-stringify";
import styled from "styled-components";
import Header from "../../components/Pages/About/AboutHeader";
import Seo from "../../components/common/Seo";

import AboutMain from "../../components/Pages/About/AboutMain";
import EventBanner from "../../components/Pages/About/EventBanner";
import AttendChart from "../../components/utils/AttendChart";
import dbConnect from "../../libs/dbConnect";
import { isMember } from "../../libs/utils/authUtils";
import { User } from "../../models/user";
import AboutFooter from "../../components/Pages/About/AboutFooter";
import UserSetting from "../../components/UserSetting";
import Calendar from "../../components/Pages/About/AboutCallender";

function About() {
  return (
    <>
      <Seo title="About" />
      <UserSetting />
      <Layout>
        <Header />
        <Calendar />
        <AboutMain />
        <EventBanner />
        <HrDiv />
        <AttendChart type="main" />
      </Layout>
      <AboutFooter />
    </>
  );
}

const Layout = styled.div``;

const HrDiv = styled.div`
  margin-top: 18px;
  height: 8px;
`;

export default About;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  await dbConnect();

  const userData = await User.findOne({ uid: session.uid });
  const user = JSON.parse(safeJsonStringify(userData));
  if (!isMember(user?.role)) {
    if (session.role !== user?.role) {
      context.res.setHeader("Set-Cookie", "next-auth.session-token=deleted");

      return {
        redirect: {
          permanent: false,
          destination: "/login?force_signout=true",
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/forbidden",
        },
      };
    }
  }
  return { props: {} };
};
