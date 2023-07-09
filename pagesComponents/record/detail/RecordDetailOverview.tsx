import styled from "styled-components";

interface IRecordDetailOverview {
  children: React.ReactNode;
}

function RecordDetailOverview({ children }: IRecordDetailOverview) {
  return <Layout>{children}</Layout>;
}

const Layout = styled.div`
  height: 160px;
`;

export default RecordDetailOverview;
