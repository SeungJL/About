import styled from "styled-components";
import Header from "../../components/common/Header";
import UserOverView from "../../components/User/UserOverView";

function User() {
  return (
    <>
      <Header title="" />
      <UserLayout>
        <UserOverView />
        <UserNavigation />
      </UserLayout>
    </>
  );
}

const UserLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const UserNavigation = styled.nav`
  height: 300px;
`;

export default User;
