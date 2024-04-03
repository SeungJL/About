import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleN, faXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export const XAlertIcon = () => (
  <XAlertIconLayout>
    <FontAwesomeIcon icon={faXmark} color="white" size="3x" />
  </XAlertIconLayout>
);

const XAlertIconLayout = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: var(--color-mint);
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface INewAlertIcon {
  size?: SizeProp;
}

export const NewAlertIcon = ({ size }: INewAlertIcon) => (
  <>
    <FontAwesomeIcon icon={faCircleN} color="var(--color-red)" size={size} />
  </>
);
