import styled from "styled-components";

interface IScreenOverlay {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ScreenOverlay = ({ onClick }: IScreenOverlay) => {
  return <StyledOverlay onClick={onClick} />;
};

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
  z-index: 100;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(
    0,
    0,
    0,
    0.48
  ); /* bg-gray-900와 bg-opacity-50를 결합한 값 */
  @media (min-width: 768px) {
    inset: 0;
    height: 100%;
  }
`;
export default ScreenOverlay;
