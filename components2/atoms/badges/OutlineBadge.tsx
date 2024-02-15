import { Badge } from "@chakra-ui/react";
import { ITextAndColorSchemes } from "../../../types2/propTypes";

interface IOutlineBadge extends ITextAndColorSchemes {}

export default function OutlineBadge({ text, colorScheme }: IOutlineBadge) {
  console.log(2, colorScheme);
  return (
    <Badge p="3px 6px" variant="outline" colorScheme={colorScheme}>
      {text}
    </Badge>
  );
}
