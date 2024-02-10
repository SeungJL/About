interface IHighlightSelectButton {
  text: string;
  isSelected: boolean;
}
export default function HighlightSelectButton({
  text,
  isSelected,
}: IHighlightSelectButton) {
  const cssText = isSelected
    ? "font-bold border-b-4 border-b-mint bg-white"
    : " border-b-3";

  return (
    <button className={`${cssText} w-full text-center text-base p-3`}>
      {text}
    </button>
  );
}
