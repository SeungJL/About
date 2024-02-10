interface IScreenOverlay {
  children: React.ReactNode;
  isDarken?: boolean;
}

export default function ScreenOverlay({ children, isDarken }: IScreenOverlay) {
  return (
    <div
      className={`fixed top-0 right-0 left-0 z-50 h-full overflow-y-auto overflow-x-hidden md:inset-0 md:h-full items-center justify-center flex bg-gray-900 ${
        !isDarken ? "bg-opacity-50" : "bg-opacity-65"
      } dark:bg-opacity-80 `}
    >
      {children}
    </div>
  );
}
