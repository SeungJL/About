import styled from "styled-components";
import { useState } from "react";

const SHORT_TEXT_MAX = 61;

function ReviewContent({ text }: { text: string }) {
  const textShort = text?.slice(0, SHORT_TEXT_MAX);
  const [isShort, setIsShort] = useState(true);

  return (
    <Layout>
      {isShort ? (
        <P onClick={() => setIsShort(false)}>
          {textShort}
          <span>{text?.length > SHORT_TEXT_MAX && "... 더 보기"}</span>
        </P>
      ) : (
        <P>{text}</P>
      )}
    </Layout>
  );
}

const Layout = styled.div``;

const P = styled.p`
  margin: 14px;
  font-size: 13px;

  > span {
    font-size: 12px;
    color: var(--font-h2);
  }
`;

const Pre = styled.pre`
  margin: 14px;
  font-size: 13px;

  > span {
    font-size: 12px;
    color: var(--font-h2);
  }
`;

export default ReviewContent;
