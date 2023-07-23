import { Button } from "@chakra-ui/react";

interface IBottomNav {
  onClick: () => void;
  text?: string;
}

function BottomNav({ onClick, text }: IBottomNav) {
  return (
    <Button
      position="fixed"
      left="50%"
      bottom="0"
      transform="translate(-50%,0)"
      width={`calc(100% - 2*var(--margin-main))`}
      height="44px"
      mb="var(--margin-main)"
      borderRadius="100px"
      backgroundColor="var(--color-mint)"
      color="white"
      fontSize="15px"
      onClick={onClick}
    >
      {text || "다음"}
    </Button>
  );
}

export default BottomNav;
