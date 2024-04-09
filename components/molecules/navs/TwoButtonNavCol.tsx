import { useRouter } from "next/navigation";
import { Size } from "../../../types/assetTypes";

export interface ITwoButtonNavColProps {
  size?: Size;
  up: {
    text: string;
    func: () => void;
  };
  down: {
    text?: string;
    func?: () => void;
  };
}

interface ITwoButtonNavCol {
  props: ITwoButtonNavColProps;
}

export default function TwoButtonNavCol({
  props: {
    size = "md",
    up: { text, func },
    down,
  },
}: ITwoButtonNavCol) {
  const router = useRouter();

  const { text: downText = "닫기", func: downFunc = () => router.back() } =
    down;

  return (
    <div className="flex flex-col">
      {/* <div className="mb-3">
        <BgColorButton colorType="mint" size={size} text={text} func={func} />
      </div>
      <BgColorButton
        colorType="gray"
        size={size}
        text={downText}
        func={downFunc}
      /> */}
    </div>
  );
}
