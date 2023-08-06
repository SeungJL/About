import { useState } from "react";
import styled from "styled-components";

const SHORT_TEXT_MAX = 61;

function ReviewContent({ text }: { text: string }) {
  const [isShort, setIsShort] = useState(true);

  return (
    <P isShort={isShort} onClick={() => setIsShort((old) => !old)}>
      {text}
    </P>
  );
}

const P = styled.p<{ isShort: boolean }>`
  ${(props) =>
    props.isShort &&
    `-webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;   `}

  padding: 0 var(--padding-main);
  margin-bottom: var(--margin-max);
  font-size: 13px;
  display: -webkit-box;

  > span {
    font-size: 12px;
    color: var(--font-h2);
  }
`;

export default ReviewContent;
