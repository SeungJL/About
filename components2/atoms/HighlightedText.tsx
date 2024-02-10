export interface IHighlightedText {
  text: string;
  hightlightedText?: string;
}
export default function HighlightedText({
  text,
  hightlightedText,
}: IHighlightedText) {
  const parts = text.split(new RegExp(`(${hightlightedText})`, "gi"));

  return (
    <span>
      {parts.map((part, index) =>
        part === hightlightedText ? <strong key={index}>{part}</strong> : part
      )}
    </span>
  );
}
