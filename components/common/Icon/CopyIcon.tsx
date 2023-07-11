import { Button, useToast } from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClipboardJS from "clipboard";
import { useEffect, useRef } from "react";
import styled from "styled-components";

interface ICopyBtn {
  size?: string;
  text: string;
}

export const CopyBtn = ({ size, text }: ICopyBtn) => {
  const toast = useToast();
  const btnRef = useRef(null);
  if (!size) size = "sm";

  useEffect(() => {
    if (!btnRef.current) {
      return;
    }

    const clipboard = new ClipboardJS(btnRef.current, {
      text: () => text,
    });

    clipboard.on("success", () => {
      toast({
        title: "복사 완료",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
        variant: "left-accent",
      });
    });

    clipboard.on("error", () => {
      toast({
        title: "복사 실패",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
        variant: "left-accent",
      });
    });

    // 클린업 함수
    return () => {
      clipboard.destroy();
    };
  }, [text, toast]);

  if (size === "lg")
    return (
      <LayoutLg ref={btnRef}>
        <Button width="100%">본문 내용 복사하기</Button>{" "}
      </LayoutLg>
    );

  return (
    <Layout ref={btnRef}>
      <ClickableIcon icon={faCopy} color="var(--font-h1)" />
    </Layout>
  );
};

const ClickableIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
const LayoutLg = styled.div``;

const Layout = styled.span``;
