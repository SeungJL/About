import styled from "styled-components";

export const IconCircle = () => <CircleLayout></CircleLayout>;
const CircleLayout = styled.div`
  display: inline-block;
  width: 30px;
  position: absolute;
  text-align: center;
  padding-top: 4px;

  height: 30px;
  border-radius: 50%;
  background-color: #00c2b3;
`;
