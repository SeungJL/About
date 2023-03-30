import { useToast } from "@chakra-ui/react";
import {
  faArrowUpFromBracket,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

function StudySpaceHeader({ title }) {
  const router = useRouter();
  const toast = useToast();

  function copyToClipboard(text) {
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
  }
  const shareUrl = `${router.asPath}`;

  useEffect(() => {
    const shareBtn = document.querySelector(".shareBtn");
    const handleClick = () => {
      copyToClipboard(shareUrl);
    };
    shareBtn?.removeEventListener("click", handleClick);
    shareBtn?.addEventListener("click", handleClick);
    return () => {
      shareBtn?.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareUrl]);

  return (
    <Layout>
      <div onClick={() => router.push(`/about`)}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <Title>{title}</Title>
      </div>
      <div className="shareBtn">
        <FontAwesomeIcon icon={faArrowUpFromBracket} />
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  height: 46px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--font-h2);
  padding-right: 20px;
`;

const Title = styled.span`
  color: var(--font-h1);
  font-size: 17px;
  font-weight: 600;
  margin-left: 16px;
`;

export default StudySpaceHeader;
