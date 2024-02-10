import { Button } from "flowbite-react";
import Link from "next/link";

interface IShadowBlockButton {
  text: string;
  url?: string;
}
export default function ShadowBlockButton({ text, url }: IShadowBlockButton) {
  return (
    <>
      {url ? (
        <Link href={url}>
          <ButtonComponent text={text} />
        </Link>
      ) : (
        <ButtonComponent text={text} />
      )}
    </>
  );
}

const ButtonComponent = ({ text }: { text: string }) => (
  <Button
    className="w-full bg-white text-mint shadow font-semibold enabled:hover:bg-gray-100 focus:ring-mint"
    size="lg"
  >
    {text}
  </Button>
);
