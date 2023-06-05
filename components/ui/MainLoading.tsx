import { RotatingLines } from "react-loader-spinner";
import styled from "styled-components";

export const MainLoading = () => (
  <MainLoadingLayout>
    <RotatingLines
      strokeColor="var(--color-mint)"
      strokeWidth="5"
      animationDuration="0.75"
      width="50"
      visible={true}
    />
  </MainLoadingLayout>
);

const MainLoadingLayout = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
