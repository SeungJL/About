import { Spinner } from "@chakra-ui/react";
import { ColorRing } from "react-loader-spinner";
import styled from "styled-components";

export const MainLoading = () => (
  <MainLoadingLayout>
    <Spinner
      thickness="4px"
      speed="0.87s"
      emptyColor="gray.200"
      color="var(--color-mint)"
      size="lg"
    />
  </MainLoadingLayout>
);

const MainLoadingLayout = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
