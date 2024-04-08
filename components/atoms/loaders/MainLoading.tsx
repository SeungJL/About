import styled from "styled-components";
import Spinner from "../Spinner";

interface IMainLoading {
  top?: number;
}

export const MainLoading = () => (
  <MainLoadingLayout>
    <Spinner />
  </MainLoadingLayout>
);

const MainLoadingLayout = styled.div<{ top?: number }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const MainLoadingAbsolute = () => (
  <MainLoadingAbsoluteLayout>
    <Spinner />
  </MainLoadingAbsoluteLayout>
);

const MainLoadingAbsoluteLayout = styled.div`
  background-color: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
