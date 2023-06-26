import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import UserNavigation from "../../pagesComponents/user/UserNavigation";
import UserOverview from "../../pagesComponents/user/UserOverView";
import UserScoreBar from "../../pagesComponents/user/UserScoreBar";

function UserInfo() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <Layout
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <Header title="마이페이지" />
        <UserLayout isLoading={isLoading}>
          <UserOverview setIsLoading={setIsLoading} />
          <UserScoreBar />
          <UserNavigation />
        </UserLayout>
      </Layout>
    </>
  );
}

const Layout = styled(motion.div)``;

const UserLayout = styled.div<{ isLoading: boolean }>`
  visibility: ${(props) => (props.isLoading ? "hidden" : "visible")};
  margin-top: 8px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

export default UserInfo;
