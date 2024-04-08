interface ISimpleHeader {
  title: string;
  children?: React.ReactNode;
}
export default function SimpleHeader({ title, children }: ISimpleHeader) {
  return (
    <header className="z-10 w-full bg-white h-14 text-xl fixed top-0 px-4 flex justify-between border-b border-gray-7 items-center">
      <div className="font-extrabold text-gray-1">{title}</div>
      <div>{children}</div>
    </header>
  );
}
