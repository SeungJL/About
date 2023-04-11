import { Badge } from "@chakra-ui/react";
import styled from "styled-components";

export default function Test() {
  return (
    <Layout>
      <Badge bg="#FFE5E5" color="#F06292" fontSize={12}>
        딸기스무디
      </Badge>
      <br />

      <br />
      <Badge bg="#FEE7E7" color="#FF69B4" size="lg">
        딸기스무디
      </Badge>
    </Layout>
  );
}

const Layout = styled.div`
  text-align: center;
  margin-top: 120px;
  > span {
    margin-bottom: 30px;
  }
`;
