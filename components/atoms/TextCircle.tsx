import styled from "styled-components";

interface ITextCircle {
  text: string;
}
export default function TextCircle({ text }: ITextCircle) {
  return <Circle>{text}</Circle>;
}

const Circle = styled.div`
  width: 28px; /* Corrected to match w-7 in Tailwind */
  height: 28px; /* Assuming h-7 should also be 28px for a perfect circle */
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #3ab795; /* Replace '#3AB795' with the actual color code for 'mint' */
  border-radius: 9999px; /* Creates a fully rounded circle */
  flex-direction: column;
  bottom: 0.5rem; /* Bottom-2 equivalent */
  color: #3ab795; /* Text color 'mint', replace with the actual color code */
  font-weight: 600; /* Font-semibold equivalent */
  z-index: 3;
`;
