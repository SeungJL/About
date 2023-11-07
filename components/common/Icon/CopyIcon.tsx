import { Button, useClipboard } from "@chakra-ui/react";
import { faCopy } from "@fortawesome/pro-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import styled from "styled-components";
import { useCompleteToast } from "../../../hooks/custom/CustomToast";

interface ICopyBtn {
  size?: string;
  text: string;
}

export const CopyBtn = ({ size, text }: ICopyBtn) => {
  const completeToast = useCompleteToast();

  const { onCopy, hasCopied } = useClipboard(text);

  if (!size) size = "sm";

  useEffect(() => {
    if (hasCopied) completeToast("free", "복사 완료");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasCopied]);

  if (size === "lg")
    return (
      <LayoutLg onClick={onCopy}>
        <Button width="100%">본문 내용 복사하기</Button>
      </LayoutLg>
    );

  if (size === "md")
    return (
      <Button
        leftIcon={<FontAwesomeIcon icon={faCopy} />}
        size="xs"
        colorScheme="twitter"
        onClick={onCopy}
      >
        <span>복사하기</span>
      </Button>
    );

  return (
    <button onClick={onCopy}>
      <FontAwesomeIcon icon={faCopy} color="var(--font-h1)" />
    </button>
  );
};

const LayoutLg = styled.div``;
