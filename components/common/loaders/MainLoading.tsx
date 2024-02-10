import styled from "styled-components";

interface IMainLoading {
  top?: number;
}

export const MainLoading = ({ top }: IMainLoading) => (
  <MainLoadingLayout top={top}>
    {/* <RotatingLines
      strokeColor="var(--color-mint)"
      strokeWidth="5"
      animationDuration="0.75"
      width="50"
      visible={true}
    /> */}
  </MainLoadingLayout>
);

const MainLoadingLayout = styled.div<{ top?: number }>`
  position: fixed;
  top: ${(props) => props.top || 40}%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const MainLoadingAbsolute = () => (
  <MainLoadingAbsoluteLayout>
    {/* <RotatingLines
      strokeColor="var(--color-mint)"
      strokeWidth="5"
      animationDuration="0.75"
      width="50"
      visible={true}
    /> */}
  </MainLoadingAbsoluteLayout>
);

const MainLoadingAbsoluteLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
