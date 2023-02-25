import { useSession } from "next-auth/react";
import styled from "styled-components";

import { useActiveQuery } from "../../hooks/user/queries";
import UserBadge from "../block/UserBadge";

export default function UserOverView() {
  const { data: user } = useActiveQuery();

  return (
    <>
      <Layout>
        <UserImg>
          <img src={user?.profileImage} width="80px" alt="userimg" />
        </UserImg>
        <UserNameBlock>
          <UserName>{user?.name}</UserName>
          <UserBadge role={user?.role} />
        </UserNameBlock>

        <LogoutBlock>
          <button>로그아웃</button>
        </LogoutBlock>
      </Layout>
      <Hr />
    </>
  );
}

const Layout = styled.div`
  height: 14vh;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const UserImg = styled.div`
  border-radius: 30%;
  overflow: hidden;
`;
const UserNameBlock = styled.div`
  width: 60px;
  margin-left: 3%;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 1.4em;
  margin-bottom: 5px;
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
const Hr = styled.div`
  width: 100vw;
  border-bottom: 1px solid rgb(0, 0, 0, 0.3);
`;
