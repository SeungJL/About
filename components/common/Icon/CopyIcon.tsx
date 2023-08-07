import { Button } from "@chakra-ui/react";
import { faCopy } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClipboardJS from "clipboard";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useCompleteToast, useFailToast } from "../../../hooks/CustomToast";

interface ICopyBtn {
  size?: string;
  text: string;
}

export const CopyBtn = ({ size, text }: ICopyBtn) => {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const btnRef = useRef(null);

  if (!size) size = "sm";

  useEffect(() => {
    if (!btnRef.current) return;

    const clipboard = new ClipboardJS(btnRef.current, {
      text: () => text,
    });
    clipboard.on("success", () => {
      completeToast("free", "복사 완료");
    });
    clipboard.on("error", () => {
      failToast("free", "복사 실패");
    });
    return () => {
      clipboard.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

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
