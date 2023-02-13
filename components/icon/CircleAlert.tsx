import styled from "styled-components";

const Circle = styled.span`
  position: absolute;
  right: -7%;
  bottom: -20%;
  width: 7px;
  height: 7px;
  border-radius: 5px;
  background-color: red;
`;

function CircleAlert() {
  return (
    <>
      <Circle />
    </>
  );
}
export default CircleAlert;
