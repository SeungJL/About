import styled from "styled-components";
import FriendHeader from "../../pagesComponents/friend/FriendHeader";

import FriendProfile from "../../pagesComponents/friend/FriendProfile";
import FriendRecommend from "../../pagesComponents/friend/FriendRecommend";
function Friend() {
  return (
    <>
      <FriendHeader />
      <Layout>
        <FriendProfile />
        <FriendRecommend />
      </Layout>
    </>
  );
}

const Layout = styled.div``;

export default Friend;
