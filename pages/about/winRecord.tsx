import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import RecordLog from "../../components/ui/RecordLog";
function WinRecord() {
  return (
    <PageLayout>
      <Header title="당첨 기록" />
      <RecordLog />
    </PageLayout>
  );
}

const Layout = styled.div``;

export default WinRecord;
