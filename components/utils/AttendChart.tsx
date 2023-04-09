import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

import {
  useAttendRateQueries,
  useVoteRateQueries,
} from "../../hooks/user/queries";
import { getMonth } from "../../libs/utils/dateUtils";

import { IUser } from "../../types/user";
import { CHART_MONTH_RANGE } from "../../constants/range";

const MONTH_LIST = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export default function AttendChart({
  type,
  user,
}: {
  type?: string;
  user?: IUser;
}) {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const { data: session } = useSession();

  const name = type === "main" ? session?.user.name : user?.name;

  const monthXaxis = [];
  for (let i = Number(getMonth()) - 2; i <= Number(getMonth()) + 1; i++) {
    monthXaxis.push(MONTH_LIST[i]);
  }

  const attendCountTotal = useAttendRateQueries(CHART_MONTH_RANGE);
  const voteCountTotal = useVoteRateQueries(CHART_MONTH_RANGE);

  const getDataArray = (name, queryResult) =>
    queryResult
      ?.map((item) => {
        if (item.isSuccess) {
          const myDataArr = item.data.filter((data) => data.name === name);
          return myDataArr[0]?.cnt;
        }
        return null;
      })
      .concat(null);

  const isLoading = voteCountTotal.some((result) => result.isLoading);

  const voteAverageArr = voteCountTotal?.map((month) => {
    let userCnt = 0;
    return Math.round(
      month?.data?.reduce((acc, cur) => {
        if (cur.cnt !== 0) userCnt++;
        return acc + cur.cnt;
      }, 0) /
        (userCnt + 5)
    );
  });

  const myAttendCountTotal = getDataArray(name, attendCountTotal);

  const text = type === "modal" ? undefined : "내 스터디 참여";

  return (
    <div>
      {type === "main" && !isLoading ? (
        <ApexCharts
          type="line"
          series={[
            { name: "평균 참여율", data: isLoading ? [] : voteAverageArr },
            { name: "스터디 참여", data: isLoading ? [] : myAttendCountTotal },
          ]}
          options={{
            chart: {
              zoom: {
                enabled: false,
              },
            },

            stroke: {
              curve: "straight",
            },

            title: {
              text: text,
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },

            xaxis: {
              categories: monthXaxis,
            },
            yaxis: {
              min: 0,
              max: 5,
              forceNiceScale: true,
            },
          }}
        />
      ) : type === "modal" && !isLoading ? (
        <ApexCharts
          type="line"
          series={[
            { name: "평균 참여율", data: isLoading ? [] : voteAverageArr },
            { name: "스터디 참여", data: isLoading ? [] : myAttendCountTotal },
          ]}
          options={{
            chart: {
              zoom: {
                enabled: false,
              },
              toolbar: { show: false },
            },

            stroke: {
              curve: "straight",
            },

            title: {
              text: text,
              align: "left",
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
              },
            },

            xaxis: {
              categories: monthXaxis,
            },
            yaxis: {
              min: 0,
              max: 5,
              forceNiceScale: true,
            },

            legend: {
              floating: true,
              position: "bottom",
              offsetY: -30,
              horizontalAlign: "right",
              fontSize: "10px",
            },
          }}
        />
      ) : null}
    </div>
  );
}
