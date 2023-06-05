import styled from "styled-components";
import { Progress } from "@chakra-ui/react";

function ProgressStatus({ value }: { value: number }) {
  return (
    <Layout>
      <Progress value={value} size="sm" />
    </Layout>
  );
}

const Layout = styled.div``;

export default ProgressStatus;
