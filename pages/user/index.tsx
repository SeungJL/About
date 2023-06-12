import { motion } from "framer-motion";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import UserNavigation from "../../pagesComponents/User/UserNavigation";
import UserOverview from "../../pagesComponents/User/UserOverView";
import UserScoreBar from "../../pagesComponents/User/UserScoreBar";

function UserInfo() {
  return (
    <>
      <Layout
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <Header title="마이페이지" />
        <UserLayout>
          <UserOverview />
          <UserScoreBar />
          <UserNavigation />
        </UserLayout>
      </Layout>
    </>
  );
}

const Layout = styled(motion.div)``;

const UserLayout = styled.div`
  margin-top: 8px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

export default UserInfo;
