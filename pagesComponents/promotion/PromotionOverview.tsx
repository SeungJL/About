import styled from "styled-components";

function PromotionOverview() {
  return (
    <Layout>
      본인 학교 에브리타임에 동아리 홍보글을 작성해주시면 <b>+15 Point</b>와
      추첨을 통해 매 달 <b>BBQ 황금 올리브 치킨 세트</b>를 드립니다! 중복 지원도
      가능하니까 생각나실 때 여러번 지원해주시면 더 감사합니다 ^^...
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: var(--margin-main);
`;

export default PromotionOverview;
