import { Spinner } from "@chakra-ui/react";

import styled from "styled-components";

export const MainLoading = () => (
  <MainLoadingLayout>
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="var(--color-mint)"
      size="xl"
    />
  </MainLoadingLayout>
);

const MainLoadingLayout = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
