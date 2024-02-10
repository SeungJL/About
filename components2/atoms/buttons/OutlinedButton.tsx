import { ColorType, Size } from "@/types/assetTypes";
import { getColorText } from "@/utils/styleUtils";
import { Button } from "flowbite-react";

interface IOutlinedButton {
  text: string;
  size?: Size;
  colorType?: ColorType;
}
export default function OutlineButton({
  size,
  text,
  colorType = "mint",
}: IOutlinedButton) {
  const cssText = getColorText(colorType, ["text", "border"]);

  return (
    <Button size={size} className={`${cssText} bg-white`}>
      {text}
    </Button>
  );
}
