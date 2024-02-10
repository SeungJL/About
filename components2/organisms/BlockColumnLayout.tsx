import { LinkButtonProp } from "@/types/propTypes";
import Link from "next/link";

export interface IBlockColumnLayout {
  headerText: string;
  blockDataArr: LinkButtonProp[];
}
export default function BlockColumnLayout({
  headerText,
  blockDataArr,
}: IBlockColumnLayout) {
  return (
    <div className="w-full flex flex-col ">
      <header className="px-4 py-2 font-semibold text-gray-3">
        {headerText}
      </header>
      {blockDataArr.map((blockData, idx) => (
        <Link
          className="flex-1 bg-white p-4 border-b-1.5 border-gray-7"
          key={idx}
          href={blockData.url}
        >
          {blockData.text}
        </Link>
      ))}
    </div>
  );
}
