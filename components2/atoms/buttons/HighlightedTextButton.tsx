type ColorType = "mint";

interface IHighlightedTextButton {
  text: string;
  colorType: ColorType;
}
export default function HighlightedTextButton({
  text,
  colorType,
}: IHighlightedTextButton) {
  const getColorTheme = (colorType: ColorType) => {
    switch (colorType) {
      case "mint":
        return "text-mint bg-mintShadow";
    }
  };

  return <div className={`${getColorTheme(colorType)} text-sm`}>{text}</div>;
}
