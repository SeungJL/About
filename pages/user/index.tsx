import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import UserNavigation from "../../pagesComponents/user/UserNavigation";
import UserOverview from "../../pagesComponents/user/UserOverView";
import UserScoreBar from "../../pagesComponents/user/UserScoreBar";

function UserInfo() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <PageLayout>
      <Header title="마이페이지" />
      <UserLayout isLoading={isLoading}>
        <UserOverview setIsLoading={setIsLoading} />
        <UserScoreBar />
        <UserNavigation />
      </UserLayout>
    </PageLayout>
  );
}

const UserLayout = styled.div<{ isLoading: boolean }>`
  visibility: ${(props) => (props.isLoading ? "hidden" : "visible")};
  margin-top: var(--margin-min);
  margin: 0 var(--margin-main);
  display: flex;
  flex-direction: column;
`;

export default UserInfo;
