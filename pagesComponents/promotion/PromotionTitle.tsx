import styled from "styled-components";

function PromotionTitle() {
  return (
    <Layout>
      <Title>
        <span>에브리타임</span>
        <br />
        <span>홍보 이벤트</span>
      </Title>
      <Detail>
        <div>
          학교 에브리타임 홍보게시판에 동아리 홍보글을 작성해주시면{" "}
          <b>+50 Point</b>와 추첨을 통해 매 달 <b>BBQ 황금 올리브 치킨 세트</b>
          를 드립니다!
        </div>
        <div>[학교 당 3일에 1번씩만 참여가 가능]</div>
      </Detail>
    </Layout>
  );
}

const Layout = styled.div``;

const Title = styled.div`
  font-size: 32px;
  line-height: 1.3;
  font-weight: 600;
  > span:first-child {
    color: red;
  }
`;

const Detail = styled.div``;

export default PromotionTitle;
