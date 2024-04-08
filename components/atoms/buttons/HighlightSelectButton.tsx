import { Button } from "@chakra-ui/react";

interface IUnderlineSelectedButton {
  text: string;
  isSelected: boolean;
  func?: () => void;
}
export default function UnderlineSelectedButton({
  text,
  isSelected,
  func,
}: IUnderlineSelectedButton) {
  const cssText = isSelected
    ? "font-bold border-b-4 border-b-mint bg-white"
    : " border-b-3";

  return (
    <>
      {isSelected ? (
        <Button
          borderBottom="var(--border-mint)"
          variant="ghost"
          onClick={func}
          w="100%"
          borderRadius="0"
          _hover={{
            bgColor: "white",
          }}
        >
          {text}
        </Button>
      ) : (
        <Button
          fontWeight={400}
          color="var(--gray-2)"
          _hover={{
            bgColor: "white",
          }}
          variant="ghost"
          onClick={func}
          w="100%"
          borderRadius="0"
        >
          {text}
        </Button>
      )}
    </>
  );
}
