import { Badge as ChakraBadge } from "@chakra-ui/react";

interface IBadge {
  text: string;
  bg: string;
  fontColor?: string;
}

export const Badge = ({ text, bg, fontColor = "white" }: IBadge) => {
  return (
    <ChakraBadge p="2px 6px" fontSize="13px" bgColor={bg} color={fontColor}>
      {text}
    </ChakraBadge>
  );
};
