import styled from "styled-components";

export const IconCircle = ({ children }) => (
  <CircleLayout>{children}</CircleLayout>
);
const CircleLayout = styled.div`
  width: 25px;
  text-align: center;
  height: 25px;
  border-radius: 50%;
  padding-top: 2px;
  color: white;
  background-color: var(--color-mint);
`;
