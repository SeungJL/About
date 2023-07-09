import styled from "styled-components";
import Header from "../../components/layouts/Header";
import RecordDetailGraph from "../../pagesComponents/record/detail/RecordDetailGraph";
import RecordDetailOverview from "../../pagesComponents/record/detail/RecordDetailOverview";
import RecordDetailSummary from "../../pagesComponents/record/detail/RecordDetailSummary";
function Detail() {
  return (
    <>
      <Layout>
        <RecordDetailOverview>
          <Header title="스터디 기록 분석" />
        </RecordDetailOverview>
        <RecordDetailSummary />
        <RecordDetailGraph />
      </Layout>
    </>
  );
}

const Layout = styled.div``;

export default Detail;
