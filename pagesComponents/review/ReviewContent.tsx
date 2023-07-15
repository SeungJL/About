import { useState } from "react";
import styled from "styled-components";

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
  padding: 0 var(--padding-main);
  margin-bottom: var(--margin-max);
  font-size: 13px;

  > span {
    font-size: 12px;
    color: var(--font-h2);
  }
`;

export default ReviewContent;
