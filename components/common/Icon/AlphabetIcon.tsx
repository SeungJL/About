import {
  faA as A,
  faB as B,
  faO as O,
  faT as T,
  faU as U,
} from "@fortawesome/pro-duotone-svg-icons";
import { faA, faB, faO, faT, faU } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { TABLE_STRONG_COLORS } from "../../../constants/styles";
import { Alphabet } from "../../../types/user/collections";

interface IAlphabetIcon {
  alphabet: Alphabet;
  isDuotone?: boolean;
  isBeat?: boolean;
}

export const AlphabetIcon = ({
  alphabet,
  isDuotone,
  isBeat,
}: IAlphabetIcon) => (
  <IconWrapper>
    {alphabet === "A" ? (
      <FontAwesomeIcon
        icon={isDuotone ? A : faA}
        size="2x"
        color={TABLE_STRONG_COLORS[0]}
        beatFade={isBeat}
        style={{ opacity: isDuotone && 0.5 }}
      />
    ) : alphabet === "B" ? (
      <FontAwesomeIcon
        icon={isDuotone ? B : faB}
        size="2x"
        color={TABLE_STRONG_COLORS[1]}
        beat={isBeat}
        style={{ opacity: isDuotone && 0.5 }}
      />
    ) : alphabet === "O" ? (
      <FontAwesomeIcon
        icon={isDuotone ? O : faO}
        size="2x"
        color={TABLE_STRONG_COLORS[2]}
        beat={isBeat}
        style={{ opacity: isDuotone && 0.5 }}
      />
    ) : alphabet === "U" ? (
      <FontAwesomeIcon
        icon={isDuotone ? U : faU}
        size="2x"
        color={TABLE_STRONG_COLORS[3]}
        beat={isBeat}
        style={{ opacity: isDuotone && 0.5 }}
      />
    ) : (
      <FontAwesomeIcon
        icon={isDuotone ? T : faT}
        size="2x"
        color={TABLE_STRONG_COLORS[4]}
        beat={isBeat}
        style={{ opacity: isDuotone && 0.5 }}
      />
    )}
  </IconWrapper>
);

const IconWrapper = styled.div``;
