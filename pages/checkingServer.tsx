import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styled from "styled-components";

function CheckingServer() {
  const router = useRouter();

  return (
    <Layout>
      <Title>
        현재 서버 점검중입니다.
        <br /> 빠른 시간 내로 복구할 수 있도록 하겠습니다.
      </Title>
      <Nav>
        <Button
          w="50%"
          colorScheme="blackAlpha"
          onClick={() => router.push(`/about`)}
        >
          재접속
        </Button>
        <Button
          w="50%"
          colorScheme="mintTheme"
          onClick={() => router.push(`/login`)}
        >
          로그인 창으로
        </Button>
      </Nav>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 14px;
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  background-color: var(--font-h6);
`;

const Title = styled.div`
  font-size: 16px;
`;

const Nav = styled.nav`
  margin-top: 20px;
  display: flex;
`;

export default CheckingServer;
