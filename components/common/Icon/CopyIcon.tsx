import { Button, useToast } from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CopyBtn = ({ text }: { text: string }) => {
  const toast = useToast();
  const copy = (text) =>
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "복사 완료",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
        variant: "left-accent",
      });
    });
  return (
    <FontAwesomeIcon
      icon={faCopy}
      onClick={() => copy(text)}
      color="var(--font-h1)"
    />
  );
};

export const CopyBtnBig = ({ text }: { text: string }) => {
  const toast = useToast();
  const copy = (text) =>
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "복사 완료",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",

          variant: "left-accent",
        });
      },
      (error) => {
        console.error("Failed to copy text:", error);
      }
    );

  return (
    <Button onClick={() => copy(text)} mt="auto">
      본문 내용 복사하기
    </Button>
  );
};
