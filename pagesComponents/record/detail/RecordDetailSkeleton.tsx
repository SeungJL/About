import styled from "styled-components";
import RecordDetailGraphSkeleton from "./skeleton/RecordDetailGraphSkeleton";
import RecordDetailHeaderSkeleton from "./skeleton/RecordDetailHeaderSkeleton";
import RecordDetailOverviewSkeleton from "./skeleton/RecordDetailOverviewSkeleton";
import RecordDetailSummarySkeleton from "./skeleton/RecordDetailSummarySkeleton";

function RecordDetailSkeleton() {
  return (
    <Layout>
      <RecordDetailHeaderSkeleton />
      <RecordDetailOverviewSkeleton />
      <RecordDetailSummarySkeleton />
      <RecordDetailGraphSkeleton />
    </Layout>
  );
}

const Layout = styled.div``;

export default RecordDetailSkeleton;
