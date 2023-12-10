import { Button } from "@chakra-ui/react";

interface IButton {
  text: string;
  onClick: () => void;
}

export const OutlineMintBtn = ({ text, onClick }: IButton) => (
  <Button
    bg="white"
    border="1.2px solid var(--color-mint)"
    color="var(--color-mint)"
    fontSize="16px"
    onClick={onClick}
  >
    {text}
  </Button>
);
export const SolidMintBtn = ({ text, onClick }: IButton) => (
  <Button
    bg="var(--color-mint)"
    color="white"
    fontSize="16px"
    onClick={onClick}
  >
    {text}
  </Button>
);
