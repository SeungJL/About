import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const CircleAlertLayout = styled.div<{
  right: string;
  bottom: string;
  color?: string;
}>`
  position: absolute;
  right: ${(props) => Number(props.right)}%;
  bottom: ${(props) => Number(props.bottom)}%;
  z-index: 100;
`;

function CircleAlert({ right, bottom, color = "#ffc72c" }) {
  console.log(typeof right, bottom);
  return (
    <CircleAlertLayout right={right} bottom={bottom}>
      <FontAwesomeIcon icon={faCircleCheck} size="sm" color={color} />
    </CircleAlertLayout>
  );
}
export default CircleAlert;
