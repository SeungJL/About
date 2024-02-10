import { Size } from "@/types/assetTypes";
import Link from "next/link";

export interface IIconLinkTile {
  text: string;
  icon: React.ReactNode;
  size?: Size;
  url?: string;
  func?: () => void;
}

export default function IconLinkTile({
  url,
  text,
  icon,
  func,
  size = "md",
}: IIconLinkTile) {
  const renderContent = () => (
    <>
      <div className="mb-3">{icon}</div>
      <span
        className={`whitespace-nowrap ${
          size === "md" ? "text-xs font-normal" : "text-sm"
        }`}
      >
        {text}
      </span>
    </>
  );

  return (
    <>
      {url ? (
        <Link href={url} className="relative flex flex-col items-center w-12">
          {renderContent()}
        </Link>
      ) : (
        <button
          onClick={func}
          className="relative flex flex-col items-center w-12"
        >
          {renderContent()}
        </button>
      )}
    </>
  );
}
