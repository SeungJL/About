import styled from "styled-components";
import RecordDetailGraph from "../../pagesComponents/record/detail/RecordDetailGraph";
import RecordDetailHeader from "../../pagesComponents/record/detail/RecordDetailHeader";
import RecordDetailOverview from "../../pagesComponents/record/detail/RecordDetailOverview";
import RecordDetailSummary from "../../pagesComponents/record/detail/RecordDetailSummary";
function Detail() {
  return (
    <>
      <RecordDetailHeader />
      <Layout>
        <RecordDetailOverview />
        <RecordDetailSummary />
        <RecordDetailGraph />
      </Layout>
    </>
  );
}

const Layout = styled.div``;

export default Detail;
