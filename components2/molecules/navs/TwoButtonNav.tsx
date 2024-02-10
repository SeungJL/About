import BgColorButton from "@/components/atoms/buttons/BgColorButton";
import OutlineButton from "@/components/atoms/buttons/OutlinedButton";

import { ButtonSize, IColorType } from "@/types/assetTypes";
import { LinkButtonProp } from "@/types/propTypes";
import Link from "next/link";

interface ITwoButtonNav extends IColorType {
  size: ButtonSize;
  left: LinkButtonProp;
  right: LinkButtonProp;
}
export default function TwoButtonNav({
  size,
  left,
  right,
  colorType,
}: ITwoButtonNav) {
  return (
    <div className="flex">
      <Link href={left.url} className="flex-1 mr-3">
        <OutlineButton size={size} text={left.text} colorType={colorType} />
      </Link>
      <Link href={right.url} className="flex-1">
        <BgColorButton size={size} text={right.text} colorType={colorType} />
      </Link>
    </div>
  );
}
