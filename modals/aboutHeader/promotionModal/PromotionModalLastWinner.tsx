import dayjs from "dayjs";
import styled from "styled-components";

function PromotionModalLastWinner() {
  const currentMonth = dayjs().month();
  return (
    <Layout>
      <span>{currentMonth + 1}월 당첨자</span>
      <div>
        <span>송재희(양천구)</span>
        <span>이승수(수원)</span>
        <span>김소영(양천구)</span>
      </div>
      <div />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--color-mint);
  height: 88px;
  border-radius: var(--border-radius-sub);

  > div {
    font-weight: 600;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
  }
  > * {
    flex: 1;
  }
  > span {
    color: var(--font-h2);
    font-size: 12px;
    margin-top: 4px;
    margin-left: 10px;
  }
`;

export default PromotionModalLastWinner;
