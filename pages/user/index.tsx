import styled from "styled-components";

const UserLayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  > * {
    border: 1px solid black;
  }
`;

const UserHeader = styled.header`
  height: 45px;
`;

const UserOverView = styled.div`
  height: 200px;
`;

const UserNavigation = styled.nav`
  height: 150px;
`;

const UserAttendChart = styled.div`
  height: 100px;
`;

function User() {
  return (
    <UserLayout>
      <UserHeader></UserHeader>
      <UserOverView></UserOverView>
      <UserNavigation></UserNavigation>
      <UserAttendChart></UserAttendChart>
    </UserLayout>
  );
}

export default User;
