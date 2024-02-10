import Link from "next/link";

export type IconButtonNavBtn =
  | {
      icon: React.ReactNode;
      func: () => void;
      link?: never;
    }
  | {
      icon: React.ReactNode;
      func?: never;
      link: string;
    };

interface IIconButtonNav {
  iconList: IconButtonNavBtn[];
}

export default function IconButtonNav({ iconList }: IIconButtonNav) {
  return (
    <nav className="h-full flex items-center">
      {iconList?.map((icon, idx) => (
        <div
          className="w-7 h-7 flex justify-center items-center ml-2 text-gray-2"
          key={idx}
        >
          {icon?.link ? (
            <Link href={icon.link}>{icon.icon}</Link>
          ) : (
            <button onClick={icon.func}>{icon.icon}</button>
          )}
        </div>
      ))}
    </nav>
  );
}
