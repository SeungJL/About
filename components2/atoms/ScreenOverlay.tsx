import styled from "styled-components";

interface IScreenOverlay {
  onClick?: () => void;
  zIndex?: number;
  darken?: boolean;
}

const ScreenOverlay = ({ onClick, zIndex, darken = false }: IScreenOverlay) => {
  return <StyledOverlay darken={darken} onClick={onClick} zIndex={zIndex} />;
};

const StyledOverlay = styled.div<{ zIndex: number; darken: boolean }>`
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
  background-color: ${(props) =>
    props.darken ? "rgba(0,0,0,0.7)" : "rgba(0, 0, 0, 0.5)"};
  @media (min-width: 768px) {
    inset: 0;
    height: 100%;
  }
`;
export default ScreenOverlay;
