import { Progress } from "@chakra-ui/react";
import styled from "styled-components";

function ProgressStatus({ value }: { value: number }) {
  return (
    <Layout>
      <Progress value={value} size="sm" />
    </Layout>
  );
}

const Layout = styled.div``;

export default ProgressStatus;
