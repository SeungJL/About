import styled from "styled-components";

interface IScreenOverlay {
  onClick?: () => void;
  zIndex?: number;
}

const ScreenOverlay = ({ onClick, zIndex }: IScreenOverlay) => {
  return <StyledOverlay onClick={onClick} zIndex={zIndex} />;
};

const StyledOverlay = styled.div<{ zIndex: number }>`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
  z-index: ${(props) => props.zIndex || 100};
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
