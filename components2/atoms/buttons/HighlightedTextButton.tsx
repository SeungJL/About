import { Button } from "@chakra-ui/react";
import styled from "styled-components";

interface IHighlightedTextButton {
  text: string;
}
export default function HighlightedTextButton({
  text,
}: IHighlightedTextButton) {
  return (
    <Button variant="ghost" size="xs">
      <Text> {text}</Text>
    </Button>
  );
}

const Text = styled.span`
  background-color: var(--color-mint-light);
  font-size: 13px;
  color: var(--color-mint);
  font-weight: 400;
`;
