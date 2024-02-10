import { ITextAndColorType } from "@/types/propTypes";
import { getColorText } from "@/utils/styleUtils";

interface IOutlineBadge extends ITextAndColorType {}

export default function OutlineBadge({ colorType, text }: IOutlineBadge) {
  const colorText = getColorText(colorType, ["text", "border"]);
  //text-green-400 border-green-400
  return (
    <span
      className={`h-fit text-xs font-semibold px-1 py-0.5 rounded-sm border-1.5 ${colorText} `}
    >
      {text}
    </span>
  );
}
