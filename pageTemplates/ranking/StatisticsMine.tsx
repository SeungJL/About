import { Box } from "@chakra-ui/react";
import RecordAnalysisGraph from "../record/analysis/RecordAnalysisGraph";
import RecordAnalysisSummary from "../record/analysis/RecordAnalysisSummary";

interface IStatisticsMine {}
export default function StatisticsMine({}: IStatisticsMine) {
  return (
    <>
      <Box>
        <RecordAnalysisSummary />
        <RecordAnalysisGraph />
      </Box>
    </>
  );
}
