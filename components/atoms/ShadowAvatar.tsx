interface IShadowAvatar {
  text: string;
}
export default function ShadowAvatar({ text }: IShadowAvatar) {
  return (
    <div className="relative flex items-center justify-center text-xs font-medium text-white bg-gray-500 rounded-full ring-2 ring-gray-200 hover:bg-gray-500 dark:ring-gray-500 w-7 h-7">
      {text}
    </div>
  );
}
