import styled from "styled-components";

function AboutCalendarDays() {
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
  margin: 0 var(--margin-main);

  padding: 0 var(--padding-min);
  margin-top: var(--margin-max);

  display: flex;
  justify-content: space-between;
  color: var(--font-h3);
  font-size: 13px;
`;

export default AboutCalendarDays;
