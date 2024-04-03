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
        bgColor="var(--gray-7)"
        colorScheme="mintTheme"
      />
    </Layout>
  );
}

const Layout = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
`;

export default ProgressStatus;
