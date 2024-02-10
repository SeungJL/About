import BgColorButton from "@/components/atoms/buttons/BgColorButton";
import OutlineButton from "@/components/atoms/buttons/OutlinedButton";
import { ButtonSize } from "@/types/assetTypes";
import "../../../styles/customClass.css";

interface IButtonData {
  text: string;
  func: () => void;
}

interface IButtonGroups {
  buttonDataArr: IButtonData[];
  currentValue: string;
  size?: ButtonSize;
}
export default function ButtonGroups({
  buttonDataArr,
  currentValue,
  size = "md",
}: IButtonGroups) {
  return (
    <div className="hide-scrollbar flex gap-3 flex-nowrap overflow-x-auto">
      {buttonDataArr.map((buttonData, idx) => (
        <div className="flex flex-shrink-0" key={idx} onClick={buttonData.func}>
          {buttonData.text === currentValue ? (
            <BgColorButton
              text={buttonData.text}
              colorType="mint"
              size={size}
            />
          ) : (
            <OutlineButton
              text={buttonData.text}
              size={size}
              colorType="gray"
            />
          )}
        </div>
      ))}
    </div>
  );
}
