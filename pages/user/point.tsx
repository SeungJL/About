import { Box } from "@chakra-ui/react";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import Slide from "../../components/layout/PageSlide";
import Header from "../../components2/Header";
import SummaryTable from "../../components2/organisms/tables/SummaryTable";
import {
  usePointSystemLogQuery,
  usePointSystemQuery,
} from "../../hooks/user/queries";

function PointLog() {
  const { data: point } = usePointSystemQuery("point");
  const { data: pointLog, isLoading } = usePointSystemLogQuery("point");

  const filterLog = pointLog?.filter((item) => item.meta.value);

  const headerInfos = ["날짜", "내용", "점수"];
  const tableInfosArr = filterLog?.map((log) => [
    dayjs(log.timestamp).format("M.DD"),
    log.message,
    log.meta.value + "",
  ]);

  return (
    <>
      <Slide isFixed={true}>
        <Header title="포인트 기록" />
      </Slide>
      <Slide>
        <Layout>
          <MyPoint>
            <span>내 포인트</span>
            <FontAwesomeIcon icon={faArrowRight} />
            <span>{point} 점</span>
          </MyPoint>
          <Box border="var(--border)" rounded="md">
            {pointLog && (
              <SummaryTable
                headerInfos={headerInfos}
                tableInfosArr={tableInfosArr}
                size="lg"
              />
            )}
          </Box>
        </Layout>
      </Slide>
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--gap-4);
  margin-top: var(--gap-5);
  font-weight: 600;
`;

const LogHeader = styled.header`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border);
  font-size: 13px;
  > span {
    text-align: center;
  }
  > span:first-child {
    color: var(--gray-1);
  }
  > span:last-child {
    padding-left: var(--gap-1);
  }
`;

const MyPoint = styled.div`
  padding: 0 var(--gap-2);
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 160px;
  height: 40px;
  border-radius: var(--rounded-lg);
  border: var(--border-mint);
  color: var(--gray-2);
  font-size: 14px;
  margin-bottom: 20px;
  > span:first-child {
    flex: 1;
  }
  > span:last-child {
    flex: 1;
    text-align: end;
    font-size: 15px;
    color: var(--gray-1);
    font-weight: 700;
  }
`;

const Container = styled.div`
  margin-top: var(--gap-5);
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  color: var(--gray-1);
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border);
  font-size: 12px;
`;

const Date = styled.span`
  color: var(--gray-3);
  margin-right: var(--gap-4);
  width: 54px;
  text-align: center;
`;

const Content = styled.span`
  flex: 1;
`;

const Point = styled.span<{ isMinus?: boolean }>`
  width: 64px;
  text-align: center;
  color: ${(props) => (props.isMinus ? "var(--color-red)" : "var(--gray-1)")};
`;
export default PointLog;
