import { Badge as ChakraBadge } from "@chakra-ui/react";

interface IBadge {
  text: string;
  bg: string;
  fontColor?: string;
  fontSize?: string;
}

export const Badge = ({
  text,
  bg,
  fontColor = "white",
  fontSize = "13px",
}: IBadge) => {
  return (
    <ChakraBadge p="2px 6px" fontSize={fontSize} bgColor={bg} color={fontColor}>
      {text}
    </ChakraBadge>
  );
};
