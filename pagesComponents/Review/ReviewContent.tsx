import styled from "styled-components";
import { useState } from "react";

const SHORT_TEXT_MAX = 61;

function ReviewContent() {
  const text =
    "대학생들의 카공에 대한 관심도는 굉장히 높다. 실제로 한국의 대학생 중 87%는 카페에서 공부를 한 경험이 있고, 그 중 절반 이상은 매주 1회 카공을 위해 카페를 간다고 한다. 국내 최대 대학생들의 커뮤니티인 에브리타임이나 캠퍼스픽을 확인해도 하루에만 수십 건의 카공 스터디 모집 글이 올라온다. 그렇지만 실제로 운영되는 스터디는 거의 없다. 왜? 첫번째로 누구인지도 모르는 인원을 처음 만나는 것에 대한 부담감. 두번째로 체계적인 규칙과 시스템으로 운영되는 스터디가 없다는 점이 가장 큰 이유이다.";

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

export default ReviewContent;
