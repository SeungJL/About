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
          에브리타임에 홍보글을 작성해주시면 <b>+100 Point</b>와 추첨을 통해 매
          달 <b>BBQ 황금 올리브 치킨 세트</b>를 드립니다!
        </div>
        <div>[학교 당 3일에 1번만 참여 가능]</div>
      </Detail>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 20px;
  margin-top: var(--gap-5);
  text-align: center;
`;

const EveryTime = styled.div`
  position: relative;
  z-index: 2;
  background-color: var(--gray-8);
  border-radius: var(--rounded-lg);
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
  margin-top: var(--gap-5);
  font-weight: 600;
  font-size: 13px;
  color: var(--gray-2);
  > div:first-child {
    margin-bottom: var(--gap-2);
    > b {
      color: #c62917;
      font-weight: 800;
    }
  }
  > div:last-child {
    color: var(--gray-1);
  }
`;

export default PromotionTitle;
