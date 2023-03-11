import styled from "styled-components";
import Header from "../../components/common/Header";
import UserNavigation from "../../components/Pages/User/UserNavigation";
import UserOverView from "../../components/Pages/User/UserOverView";
import {
  Text,
  Container,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { getToday, getInterestingDate } from "../../libs/utils/dateUtils";
import dbConnect from "../../libs/dbConnect";
import { Attendence } from "../../models/attendence";
import { User } from "../../models/user";
import AttendChart from "../../components/Pages/User/AttendChart";

function UserInfo() {
  return (
    <>
      <Header title="" />
      <UserLayout>
        <UserOverView />
        <UserNavigation />
        <AttendChart />
      </UserLayout>
    </>
  );
}

const UserLayout = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`;
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

  const user = await User.findOne({ uid: session.uid });
  const attendences = await Attendence.find({
    date: {
      $gte: getToday().add(-4, "week").toDate(),
      $lte: getInterestingDate().add(-1, "day").toDate(),
    },
    "participants.user": user._id,
  }).populate("participants.user");

  return {
    props: {
      user: JSON.stringify(user),
      attendences: JSON.stringify(attendences),
    },
  };
};
export default UserInfo;
