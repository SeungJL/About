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
  border: var(--border-mint);
  height: 88px;
  border-radius: var(--border-radius-main);
  padding: var(--padding-md);
  > * {
    flex: 1;
  }
  > div {
    margin-top: var(--margin-sub);
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }

  > span {
    color: var(--font-h2);
    font-size: 11px;
  }
`;

export default PromotionModalLastWinner;
