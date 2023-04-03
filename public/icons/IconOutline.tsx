import styled from "styled-components";

export const IconCircle = ({ children }) => (
  <CircleLayout>{children}</CircleLayout>
);
const CircleLayout = styled.div`
  width: 28px;
  text-align: center;
  height: 28px;
  border-radius: 50%;
  padding-top: 3px;
  color: white;
  background-color: var(--font-h4);
`;
