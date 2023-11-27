import {
  faA as A,
  faB as B,
  faO as O,
  faT as T,
  faU as U,
} from "@fortawesome/pro-duotone-svg-icons";
import {
  faCircleA,
  faCircleB,
  faCircleO,
  faCircleT,
  faCircleU,
} from "@fortawesome/pro-regular-svg-icons";
import { faA, faB, faO, faT, faU } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { TABLE_STRONG_COLORS } from "../../../constants/styles";
import { Alphabet } from "../../../types/user/collections";

interface IAlphabetIcon {
  alphabet: Alphabet;
  isDuotone?: boolean;
  isBeat?: boolean;
  isCircle?: boolean;
}

export const AlphabetIcon = ({
  alphabet,
  isDuotone,
  isBeat,
  isCircle,
}: IAlphabetIcon) => {
  const icons = {
    A: { duotone: A, solid: faA, circle: faCircleA },
    B: { duotone: B, solid: faB, circle: faCircleB },
    O: { duotone: O, solid: faO, circle: faCircleO },
    U: { duotone: U, solid: faU, circle: faCircleU },
    T: { duotone: T, solid: faT, circle: faCircleT },
  };
  const selectedIcon = isCircle
    ? icons[alphabet].circle
    : isDuotone
    ? icons[alphabet].duotone
    : icons[alphabet].solid;

  const colorIndex = ["A", "B", "O", "U", "T"].indexOf(alphabet);
  const color = TABLE_STRONG_COLORS[colorIndex];

  return (
    <IconWrapper>
      <FontAwesomeIcon
        icon={selectedIcon}
        size="2x"
        color={color}
        beat={isBeat}
        style={{ opacity: isDuotone ? 0.5 : 1 }}
      />
    </IconWrapper>
  );
};

const IconWrapper = styled.div``;
