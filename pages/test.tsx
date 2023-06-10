import { Skeleton } from "@chakra-ui/react";
import styled from "styled-components";

function Test() {
  return (
    <Layout>
      <Skeleton isLoaded={true}>23</Skeleton>
    </Layout>
  );
}

const Layout = styled.div``;

export default Test;
