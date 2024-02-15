import styled from "styled-components";

export interface IShadowCircleProps {
  text: string;
  color: string;
  shadow: string;
}

interface IShadowCircleButton {
  buttonProps: IShadowCircleProps;
  onClick: () => void;
}

export default function ShadowCircleButton({
  buttonProps,
  onClick,
}: IShadowCircleButton) {
  console.log(buttonProps);
  return (
    <OuterCircle shadow={buttonProps.shadow} onClick={onClick}>
      <InnerButton color={buttonProps.color}>{buttonProps.text}</InnerButton>
    </OuterCircle>
  );
}

const OuterCircle = styled.div`
  position: relative;
  z-index: 10;
  width: 96px;
  height: 96px;
  border-radius: 9999px;
  background-color: ${({ shadow }) => shadow || "transparent"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled component for the inner button
const InnerButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ color }) => color || "transparent"};
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
