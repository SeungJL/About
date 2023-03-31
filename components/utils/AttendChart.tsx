import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import {
  IRate,
  useAttendRateQueries,
  useVoteRateQueries,
} from "../../hooks/user/queries";
import dayjs, { Dayjs } from "dayjs";
import { getMonth } from "../../libs/utils/dateUtils";
import { IDateStartToEnd } from "../../types/utils";
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
  const monthList: IDateStartToEnd[] = [];

  for (let i = Number(getMonth()) - 3; i <= Number(getMonth()); i++) {
    const changeMonthDate = (month: number, num: number) =>
      dayjs().month(month).date(num);
    monthList.push({
      start: changeMonthDate(i, 1),
      end: changeMonthDate(i, dayjs().month(i).daysInMonth()),
    });
  }

  const monthXaxis = [];
  for (let i = Number(getMonth()) - 3; i <= Number(getMonth()) + 1; i++) {
    monthXaxis.push(MONTH_LIST[i]);
  }

  const attendCountTotal = useAttendRateQueries(monthList);
  const voteCountTotal = useVoteRateQueries(monthList);

  const isLoading = voteCountTotal.some((result) => result.isLoading);
  const myVoteCountTotal = voteCountTotal?.map((item) => {
    if (item.isSuccess) {
      const myDataArr = item.data.filter((data) => data.name === name);
      return myDataArr[0]?.cnt;
    }
  });
  const myAttendCountTotal = attendCountTotal?.map((item) => {
    if (item.isSuccess) {
      const myData = item.data.filter((data) => data.name === name);
      return myData[0]?.cnt;
    }
  });

  myVoteCountTotal.push(null);
  myAttendCountTotal.push(null);

  const text = type === "modal" ? undefined : "내 스터디 참여";
  !isLoading && console.log(myVoteCountTotal);
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
