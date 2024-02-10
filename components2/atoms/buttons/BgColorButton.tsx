import { ColorType, Size } from "@/types/assetTypes";
import { getColorText } from "@/utils/styleUtils";
import { Button } from "flowbite-react";

interface IBgColorButton {
  text: string;
  colorType: ColorType;
  func?: () => void;
  size?: Size;
  children?: React.ReactNode;
}
export default function BgColorButton({
  size = "md",
  text,
  func,
  colorType,
  children,
}: IBgColorButton) {
  const cssText = getColorText(colorType, ["bg"]);

  return (
    <Button
      onClick={func}
      size={size}
      className={`w-full ${
        size === "lg" && "font-semibold"
      } ${cssText} enabled:hover:bg-gray-200`}
    >
      <div>{children}</div>
      {text}
    </Button>
  );
}
