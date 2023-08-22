import styled from "styled-components";
import EveryTimeIcon from "../../components/common/Icon/everyTimeIcon";

function PromotionTitle() {
  return (
    <Layout>
      <Title>
        <EveryTime as="span">
          에브리타임
          <EveryTimeIcon isSmall={false} />
        </EveryTime>
        <br />
        <span>홍보 이벤트</span>
      </Title>
      <Detail>
        <div>
          에브리타임에 홍보글을 작성해주시면 <b>+50 Point</b>와 추첨을 통해 매
          달 <b>BBQ 황금 올리브 치킨 세트</b>를 드립니다!
        </div>
        <div>[학교 당 3일에 1번만 참여 가능]</div>
      </Detail>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 20px;
  margin-top: var(--margin-max);
  text-align: center;
`;

const EveryTime = styled.div`
  position: relative;
  z-index: 2;
  background-color: var(--font-h8);
  border-radius: var(--border-radius-main);
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 800;
  line-height: 1.3;
  > span:first-child {
    color: #c62917;
  }
`;

const Detail = styled.div`
  margin-top: var(--margin-max);
  font-weight: 600;
  font-size: 13px;
  color: var(--font-h2);
  > div:first-child {
    margin-bottom: var(--margin-md);
    > b {
      color: #c62917;
      font-weight: 800;
    }
  }
  > div:last-child {
    color: var(--font-h1);
  }
`;

export default PromotionTitle;
