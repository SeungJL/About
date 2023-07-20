import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import RecordDetailGraph from "../../pagesComponents/record/detail/RecordDetailGraph";
import RecordDetailHeader from "../../pagesComponents/record/detail/RecordDetailHeader";
import RecordDetailOverview from "../../pagesComponents/record/detail/RecordDetailOverview";
import RecordDetailSkeleton from "../../pagesComponents/record/detail/RecordDetailSkeleton";
import RecordDetailSummary from "../../pagesComponents/record/detail/RecordDetailSummary";

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
        <RecordDetailHeader />
        <RecordDetailOverview />
        <RecordDetailSummary />
        <RecordDetailGraph />
      </Layout>
      {isRecordDetailLoading && <RecordDetailSkeleton />}
    </>
  );
}

const Layout = styled.div<{ isLoading: boolean }>`
  display: ${(props) => props.isLoading && "none"};
`;

export default Detail;
