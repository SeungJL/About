import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import styled from "styled-components";
import { MONTH_LIST } from "../../../constants/util/util";
import { getMonth } from "../../../helpers/dateHelpers";
import { useErrorToast } from "../../../hooks/CustomToast";
import {} from "../../../hooks/user/queries";
import { useUserAttendRateAllQueries } from "../../../hooks/user/studyStatistics/queries";
import { IVoteRate } from "../../../types/study/study";
import { IUser } from "../../../types/user/user";
import { ChartStudyOptions } from "./ChartOptions";

interface IChart {
  type: "study";
  user?: IUser;
}

function Chart({ type, user }: IChart) {
  const { data: session } = useSession();
  const errorToast = useErrorToast();
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

  const [attendRateArr, setAttendRateArr] = useState([]);
  const [attendAverageArr, setAttendAverageArr] = useState([]);
  const [attendMax, setAttendMax] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const Uid = user?.uid || session?.uid;

  const monthXaxis: string[] = [];
  for (let i = getMonth() - 2; i <= getMonth() + 1; i++)
    monthXaxis.push(MONTH_LIST[i]);

  const monthArr = [
    {
      start: dayjs().subtract(2, "month").startOf("month"),
      end: dayjs().subtract(2, "month").endOf("month"),
    },
    {
      start: dayjs().subtract(1, "month").startOf("month"),
      end: dayjs().subtract(1, "month").endOf("month"),
    },
    {
      start: dayjs().startOf("month"),
      end: dayjs().endOf("month"),
    },
  ];

  const setAttendRate = (data: IVoteRate[]) => {
    let userCnt: number;
    let averageValue = 0;
    let averageCnt = 0;
    let maxCnt = 5;
    data.forEach((who) => {
      if (who.uid === Uid) userCnt = who.cnt;
      if (who.cnt > 0) {
        averageValue += who.cnt;
        averageCnt++;
      }
    });
    if (userCnt > maxCnt) {
      if (userCnt > 18) maxCnt = 21;
      else if (userCnt > 15) maxCnt = 18;
      else if (userCnt > 12) maxCnt = 15;
      else if (userCnt > 8) maxCnt = 12;
      else if (userCnt > 5) maxCnt = 8;
    }
    return {
      maxCnt,
      userCnt,
      average: parseFloat((averageValue / averageCnt).toFixed(1)),
    };
  };

  useUserAttendRateAllQueries(monthArr, {
    onSuccess(data) {
      let rateTemp = [];
      let averageTemp = [];
      let max = 5;
      data.forEach((element) => {
        const { userCnt, average, maxCnt } = setAttendRate(element);
        rateTemp.push(userCnt);
        averageTemp.push(average);
        if (max < maxCnt) max = maxCnt;
      });
      setAttendRateArr(rateTemp);
      setAttendAverageArr(averageTemp);
      setAttendMax(max);
      setIsLoading(false);
    },
    onError: errorToast,
  });

  return (
    <>
      {type === "study" && !isLoading && (
        <ChartWrapper>
          <ApexCharts
            series={[
              { name: "평균 참여 횟수", data: attendAverageArr },
              { name: "내 참여 횟수", data: attendRateArr },
            ]}
            options={ChartStudyOptions(monthXaxis, attendMax)}
          />
        </ChartWrapper>
      )}
    </>
  );
}

const ChartWrapper = styled.div`
  min-height: 213px;
  margin-right: var(--margin-sub);
`;

export default Chart;
