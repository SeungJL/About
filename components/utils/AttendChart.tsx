import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import {
  useAttendRateQueries,
  useVoteRateQueries,
} from "../../hooks/user/queries";
import { getMonth } from "../../libs/utils/dateUtils";

import { IUser } from "../../types/user";

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
const MONTH_RANGE = [
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

  const attendCountTotal = useAttendRateQueries(MONTH_RANGE);
  const voteCountTotal = useVoteRateQueries(MONTH_RANGE);

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

  const myVoteCountTotal = getDataArray(name, voteCountTotal);
  const myAttendCountTotal = getDataArray(name, attendCountTotal);

  const text = type === "modal" ? undefined : "내 스터디 참여";

  return (
    <div>
      {type === "main" && !isLoading ? (
        <ApexCharts
          type="line"
          series={[
            { name: "스터디 투표", data: isLoading ? [] : myVoteCountTotal },
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
          }}
        />
      ) : type === "modal" && !isLoading ? (
        <ApexCharts
          type="line"
          series={[
            { name: "스터디 투표", data: isLoading ? [] : myVoteCountTotal },
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
