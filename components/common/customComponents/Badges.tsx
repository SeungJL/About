import { Badge as ChakraBadge } from "@chakra-ui/react";
import { ThemeTypings } from "@chakra-ui/system";

interface IBadge {
  text: string;
  size?: "sm" | "lg";
  type?: "outline" | "solid";
  colorScheme: ThemeTypings["colorSchemes"];
}

export const Badge = ({
  text,
  colorScheme,
  size = "sm",
  type = "solid",
}: IBadge) => {
  return (
    <ChakraBadge
      p="2px 4px"
      fontSize={size === "sm" ? "11px" : "13px"}
      colorScheme={colorScheme}
      variant={type}
    >
      {text}
    </ChakraBadge>
  );
};
