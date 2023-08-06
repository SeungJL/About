import styled from "styled-components";

function PromotionModalOverview() {
  return (
    <Layout>
      에브리타임 홍보 게시판에 동아리 홍보글을 올려주시면 ABOUT 포인트와 추첨을
      통해 꽤 높은 확률로 상품을 보내드립니다! 도와주시는 모든 분들 감사합니다!
    </Layout>
  );
}

const Layout = styled.div`
  font-weight: 600;
`;

export default PromotionModalOverview;
