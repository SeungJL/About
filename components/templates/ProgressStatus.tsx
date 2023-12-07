import { Progress } from "@chakra-ui/react";
import styled from "styled-components";

interface IProgressStatus {
  value: number;
}

function ProgressStatus({ value }: IProgressStatus) {
  return (
    <Layout>
      <Progress
        value={value}
        size="sm"
        bgColor="var(--font-h7)"
        colorScheme="mintTheme"
      />
    </Layout>
  );
}

const Layout = styled.div``;

export default ProgressStatus;
