import styled from "styled-components";

function RegisterOverview({ children }) {
  return <Layout>{children}</Layout>;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 2.5;
  margin-top: var(--gap-4);
  > span:last-child {
    font-size: 13px;
    color: var(--gray-3);
  }
  > span:first-child {
    font-size: 15px;
    font-weight: 600;
    color: var(--gray-1);
  }
`;

export default RegisterOverview;
