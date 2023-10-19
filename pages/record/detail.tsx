import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import RecordAnalysisGraph from "../../pagesComponents/record/analysis/RecordAnalysisGraph";
import RecordAnalysisHeader from "../../pagesComponents/record/analysis/RecordAnalysisHeader";
import RecordAnalysisOverview from "../../pagesComponents/record/analysis/RecordAnalysisOverview";
import RecordAnalysisSkeleton from "../../pagesComponents/record/analysis/RecordAnalysisSkeleton";
import RecordAnalysisSummary from "../../pagesComponents/record/analysis/RecordAnalysisSummary";

import { isRecordDetailLoadingState } from "../../recoil/loadingAtoms";
function Detail() {
  const [isRecordDetailLoading, setIsRecordDetailLoading] = useRecoilState(
    isRecordDetailLoadingState
  );
  useEffect(() => {
    setIsRecordDetailLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Layout isLoading={isRecordDetailLoading}>
        <RecordAnalysisHeader />
        <RecordAnalysisOverview />
        <RecordAnalysisSummary />
        <RecordAnalysisGraph />
      </Layout>
      {isRecordDetailLoading && <RecordAnalysisSkeleton />}
    </>
  );
}

const Layout = styled.div<{ isLoading: boolean }>`
  display: ${(props) => props.isLoading && "none"};
`;

export default Detail;
