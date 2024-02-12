import { Button } from "@chakra-ui/react";
import { ITextAndColorType } from "../../../types2/propTypes";

interface IOutlineBadge extends ITextAndColorType {}

export default function OutlineBadge({ colorType, text }: IOutlineBadge) {
  //text-green-400 border-green-400
  return (
    <Button>{text}</Button>
    // <span
    //   className={`h-fit text-xs font-semibold px-1 py-0.5 rounded-sm border-1.5 ${colorText} `}
    // >
    //   {text}
    // </span>
  );
}
