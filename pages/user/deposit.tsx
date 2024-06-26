import { Box } from "@chakra-ui/react";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";

import { MainLoading } from "../../components/atoms/loaders/MainLoading";
import Header from "../../components/layouts/Header";
import Slide from "../../components/layouts/PageSlide";
import SummaryTable from "../../components/organisms/tables/SummaryTable";
import { usePointSystemLogQuery, usePointSystemQuery } from "../../hooks/user/queries";

export default function DepositLog() {
  const { data: point } = usePointSystemQuery("deposit");
  const { data: pointLog } = usePointSystemLogQuery("deposit");

  const filterLog = pointLog?.filter((item) => item.meta.value);

  const headerInfos = ["날짜", "내용", "금액"];
  const tableInfosArr = filterLog?.map((log) => [
    dayjs(log.timestamp).format("M.DD"),
    log.message,
    log.meta.value + "",
  ]);

  return (
    <>
      <Header title="보증금 기록" />
      {pointLog ? (
        <Slide>
          <Layout>
            <MyPoint>
              <span>내 보증금</span>
              <FontAwesomeIcon icon={faArrowRight} />
              <span>{point} 원</span>
            </MyPoint>
            <Box border="var(--border)" rounded="md">
              {pointLog && (
                <SummaryTable headerInfos={headerInfos} tableInfosArr={tableInfosArr} size="lg" />
              )}
            </Box>
          </Layout>
        </Slide>
      ) : (
        <MainLoading />
      )}
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--gap-4);
  margin-top: var(--gap-5);
  font-weight: 600;
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
