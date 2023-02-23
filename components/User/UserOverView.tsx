import { useSession } from "next-auth/react";
import styled from "styled-components";

import { useActiveQuery } from "../../hooks/user/queries";

export default function UserOverView() {
  const { data: user } = useActiveQuery();
  console.log(user);

  return (
    <Layout>
      <UserImg>
        <img src={user.profileImage} />
      </UserImg>
      <UserNameBlock>2</UserNameBlock>

      <LogoutBlock>
        <button>로그아웃</button>
      </LogoutBlock>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.5);
  ::after {
    border-width: 100vw;
  }
`;

const UserImg = styled.div`
  width: 80px;
  border-radius: 30%;
  overflow: hidden;
`;
const UserNameBlock = styled.div`
  width: 70px;
  margin-right: auto;
`;
const LogoutBlock = styled.div`
  width: 60px;
  > button {
    width: 65px;
    height: 22px;
    border-radius: 6px;
    border: 1px solid rgb(0, 0, 0, 0.5);
  }
`;
