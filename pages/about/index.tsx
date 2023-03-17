import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import styled from "styled-components";
import Seo from "../../components/common/Seo";
import AboutCallender from "../../components/Pages/About/AboutCallender";
import AboutHeader from "../../components/Pages/About/AboutHeader";
import AboutMain from "../../components/Pages/About/AboutMain";
import EventBanner from "../../components/Pages/About/EventBanner";
import GroupStudySummary from "../../components/Pages/About/GroupStudy";
import GroupStudy from "../../components/Pages/About/GroupStudy";
import UserInfoCheck from "../../components/Pages/About2/UserInfoCheck";
import AttendChart from "../../components/Pages/User/AttendChart";
import dbConnect from "../../libs/dbConnect";
import { isMember } from "../../libs/utils/authUtils";
import { User } from "../../models/user";

function About() {
  const [dayCnt, setDayCnt] = useState(7);
  const { data: session } = useSession();
  const [isShowRegisterForm, setIsShowRegisterForm] = useState(false);

  useEffect(() => {
    if (session?.isActive === false) setIsShowRegisterForm(true);
  }, [session?.isActive]);

  return (
    <>
      <Seo title="About" />
      <UserInfoCheck />
      <Layout>
        <AboutHeader dayCnt={dayCnt} setDayCnt={setDayCnt} />
        <AboutCallender dayCnt={dayCnt} setDayCnt={setDayCnt} />
        <AboutMain />
        <HrDiv />
        <GroupStudySummary />
        <EventBanner />
        <HrDiv />
        <AttendChart />
      </Layout>
    </>
  );
}

const Layout = styled.div``;

const HrDiv = styled.div`
  height: 8px;
  background-color: #f0f2f5;
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
