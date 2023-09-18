import styled from "styled-components";

function RegisterOverview({ children }) {
  return <Layout>{children}</Layout>;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 2.5;
  margin-top: var(--margin-main);
  > span:last-child {
    font-size: 13px;
    color: var(--font-h3);
  }
  > span:first-child {
    font-size: 15px;
    font-weight: 600;
    color: var(--font-h1);
  }
`;

export default RegisterOverview;
