import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import styled from "styled-components";

function GuestBottomNav() {
  return (
    <Layout>
      <span>현재 게스트 로그인을 이용중입니다.</span>
      <Button
        backgroundColor="var(--color-red)"
        color="white"
        size="sm"
        onClick={() => signOut()}
      >
        로그아웃
      </Button>
    </Layout>
  );
}

const Layout = styled.div`
  position: fixed;
  bottom: 0;

  height: 70px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  > span:first-child {
    color: var(--color-red);
    font-weight: 600;
    margin-right: 8px;
  }
`;

export default GuestBottomNav;
