import styled from "styled-components";

export const IconCircle = ({ children }) => (
  <CircleLayout>{children}</CircleLayout>
);
const CircleLayout = styled.div`
  width: 30px;
  text-align: center;
  height: 30px;
  border-radius: 50%;
  padding-top: 3px;
  color: white;
  background-color: var(--color-mint);
`;
