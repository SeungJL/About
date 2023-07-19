import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MONTH_LIST } from "../../../../constants/util";
import { getMonth } from "../../../../helpers/dateHelpers";
import { useErrorToast } from "../../../../hooks/CustomToast";
import {} from "../../../../hooks/user/queries";
import { useUserAttendRateAllQueries } from "../../../../hooks/user/studyStatistics/queries";
import { IUser } from "../../../../types/user/user";
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

  const Uid = type === "study" ? session?.uid : user?.uid;
  const text = type === "study" ? undefined : "내 스터디 참여";

  const monthXaxis = [];
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

  useUserAttendRateAllQueries(monthArr, {
    onSuccess(data) {
      const attendRateTemp = [...attendRateArr];
      const attendAverageTemp = [...attendAverageArr];
      let userCnt: number;
      let averageValue = 0;
      let averageCnt = 0;
      data.data.forEach((who) => {
        if (who.uid === Uid) userCnt = who.cnt;
        if (who.cnt > 0) {
          averageValue += who.cnt;
          averageCnt++;
        }
      });
      if (userCnt > attendMax) {
        let temp = attendMax;
        if (userCnt > 15) temp = 18;
        else if (userCnt > 12) temp = 15;
        else if (userCnt > 8) temp = 12;
        else if (userCnt > 5) temp = 8;
        setAttendMax(temp);
      }
      attendRateTemp[data.idx] = userCnt;
      attendAverageTemp[data.idx] = parseFloat(
        (averageValue / averageCnt).toFixed(1)
      );
      setAttendRateArr(attendRateTemp);
      setAttendAverageArr(attendAverageTemp);
    },
    onError: errorToast,
  });

  useEffect(() => {
    if (
      attendRateArr?.length === monthArr.length &&
      attendRateArr?.some((item) => item >= 0)
    ) {
      console.log(77, attendRateArr);
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendRateArr]);
  if (!isLoading) console.log(666, attendMax);
  return (
    <>
      {type === "study" && !isLoading && (
        <MainWrapper>
          <ApexCharts
            type="line"
            series={[
              { name: "평균 참여율", data: attendAverageArr },
              { name: "스터디 참여", data: attendRateArr },
            ]}
            options={ChartStudyOptions(text, attendMax)}
          />
        </MainWrapper>
      )}
    </>
  );
}

const MainWrapper = styled.div`
  min-height: 213px;
`;

export default Chart;
