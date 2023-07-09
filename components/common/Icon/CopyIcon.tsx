import { Button, useToast } from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface ICopyBtn {
  text: string;
}

const handleClickCopy = async (text: string, toast: Function) => {
  try {
    await navigator.clipboard.writeText(text);
    toast({
      title: "복사 완료",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
      variant: "left-accent",
    });
  } catch (error) {
    console.error("Failed to copy text:", error);
    toast({
      title: "복사 실패",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
      variant: "left-accent",
    });
  }
};

const ClickableIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

export const CopyBtn = ({ text }: ICopyBtn) => {
  const toast = useToast();
  return (
    <ClickableIcon
      icon={faCopy}
      onClick={() => handleClickCopy(text, toast)}
      color="var(--font-h1)"
    />
  );
};

export const CopyBtnBig = ({ text }: ICopyBtn) => {
  const toast = useToast();
  return (
    <Button onClick={() => handleClickCopy(text, toast)} mt="auto">
      본문 내용 복사하기
    </Button>
  );
};
