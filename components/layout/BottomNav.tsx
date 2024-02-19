import { Button } from "@chakra-ui/react";
import Slide from "./PageSlide";

interface IBottomNav {
  onClick: () => void;
  text?: string;
}

function BottomNav({ onClick, text }: IBottomNav) {
  return (
    <Slide isFixed={true} posZero="top">
      <Button
        position="fixed"
        left="50%"
        bottom="0"
        maxW="var(--view-max-width)"
        transform="translate(-50%,0)"
        width={`calc(100% - 2*var(--gap-4))`}
        size="lg"
        mb="var(--gap-4)"
        borderRadius="var(--rounded)"
        backgroundColor="var(--color-mint)"
        color="white"
        fontSize="15px"
        onClick={onClick}
        _focus={{ backgroundColor: "var(--color-mint)", color: "white" }}
      >
        {text || "다음"}
      </Button>
    </Slide>
  );
}

export default BottomNav;
