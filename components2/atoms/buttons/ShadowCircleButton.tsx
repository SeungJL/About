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
  return (
    <OuterCircle shadow={buttonProps.shadow} onClick={onClick}>
      <InnerButton color={buttonProps.color}>{buttonProps.text}</InnerButton>
    </OuterCircle>
  );
}

const OuterCircle = styled.div`
  position: relative;
  z-index: 10;
  width: 96px; /* w-24 */
  height: 96px; /* h-24 */
  border-radius: 9999px; /* rounded-full */
  background-color: ${({ shadow }) => shadow || "transparent"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled component for the inner button
const InnerButton = styled.button`
  width: 80px; /* w-20 */
  height: 80px; /* h-20 */
  border-radius: 9999px; /* rounded-full */
  background-color: ${({ color }) => color || "transparent"};
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
