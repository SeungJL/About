import { useState } from "react";
import styled from "styled-components";
import { MainLoading } from "../../components/ui/MainLoading";
import FriendHeader from "../../pagesComponents/Friend/FriendHeader";
import FriendProfile from "../../pagesComponents/Friend/FriendProfile";
import FriendRecommend from "../../pagesComponents/Friend/FriendRecommend";
function Friend() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      <FriendHeader />
      <Layout isLoading={isLoading}>
        <FriendProfile setIsLoading={setIsLoading} />
        <FriendRecommend />
      </Layout>
      {isLoading && <MainLoading />}
    </>
  );
}

const Layout = styled.div<{ isLoading: boolean }>`
  visibility: ${(props) => (props.isLoading ? "hidden" : "visible")};
`;

export default Friend;
