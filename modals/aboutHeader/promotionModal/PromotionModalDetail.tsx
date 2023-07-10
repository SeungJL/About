import dayjs from "dayjs";
import styled from "styled-components";
import Skeleton from "../../../components/common/Skeleton";
import { useUserRequestCategoryQuery } from "../../../hooks/userRequest/queries";

function PromotionModalDetail() {
  const { data: promotionData, isLoading } =
    useUserRequestCategoryQuery("홍보");

  const applyCnt = promotionData?.length;
  const currentMonth = dayjs().month();
  return (
    <Layout>
      <div>
        <span>상품</span>
        <span>BBQ 황금 올리브 치킨 세트</span>
      </div>
      <div>
        <span>추첨 인원</span>
        <b>2명</b>
      </div>
      <div>
        <span>현재 참여 수</span>
        <VoteNum>
          <Skeleton isLoad={!isLoading}>
            {applyCnt || ""}명<Temp>(중복 포함)</Temp>
          </Skeleton>
        </VoteNum>
      </div>
      <div>
        <span>추첨 날짜</span>
        <span>{currentMonth + 2}월 10일</span>
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.7;
  height: 88px;
  color: var(--font-h2);
  > div {
    color: var(--font-h2);
    display: flex;
    > span:first-child {
      font-size: 13px;
      display: inline-block;
      width: 88px;
    }
    > span:last-child {
      font-size: 13px;
    }
  }
`;
const Temp = styled.span`
  font-size: 11px;
  color: var(--font-h3);
`;
const VoteNum = styled.span``;

export default PromotionModalDetail;
