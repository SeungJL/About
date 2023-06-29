import styled from "styled-components";

function CalendarDay() {
  return (
    <Layout>
      <span>일</span>
      <span>월</span>
      <span>화</span>
      <span>수</span>
      <span>목</span>
      <span>금</span>
      <span>토</span>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 8px 8px;

  display: flex;
  justify-content: space-between;
  color: #a0a4af;
  font-size: 12px;
  padding: 0 2px;
  margin-bottom: 7px;
`;

export default CalendarDay;
