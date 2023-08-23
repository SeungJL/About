import styled from "styled-components";
import EveryTimeIcon from "../../../components/common/Icon/everyTimeIcon";

function PromotionModalOverview() {
  return (
    <Layout>
      <Title>
        <EveryTime as="span">
          에브리타임
          <EveryTimeIcon isSmall={true} />
        </EveryTime>
        <br />
        <span>홍보 이벤트</span>
      </Title>
      <Detail>
        에브리타임에 홍보글을 작성해주시면 <b>50 Point</b>와 추첨을 통해{" "}
        <b>BBQ 황금 올리브 치킨</b>를 드려요!
      </Detail>
    </Layout>
  );
}

const Layout = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const EveryTime = styled.div`
  position: relative;
  z-index: 2;
  background-color: white;
  border-radius: var(--border-radius-main);
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 800;
  line-height: 1.3;
  > span:first-child {
    color: #c62917;
  }
`;

const Detail = styled.div`
  flex: 1;
  margin-top: 40px;
  font-weight: 600;
  font-size: 14px;
  color: var(--font-h2);
  > b {
    color: #c62917;
    font-weight: 800;
  }
`;

export default PromotionModalOverview;
