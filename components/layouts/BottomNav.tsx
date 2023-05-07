import { Button } from "@chakra-ui/react";
import styled from "styled-components";

function BottomNav({ onClick }: { onClick: () => void }) {
  return (
    <Layout>
      <Button
        width="100%"
        height="100%"
        borderRadius="100px"
        backgroundColor="var(--color-mint)"
        color="white"
        fontSize="15px"
        onClick={onClick}
      >
        다음
      </Button>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 72px;
  position: fixed;
  bottom: 0;
  padding: 14px;
  left: 0;
`;

export default BottomNav;
