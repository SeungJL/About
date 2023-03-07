import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useVoteRateQueries, useVoteRateQuery } from "../../hooks/user/queries";
import { useState } from "react";

export default function AttendChart() {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const { data: session } = useSession();

  const name = session?.user.name;

  const voteRateArr = useVoteRateQueries([1, 2]);

  let isLoading = true;
  const myVoteRateArr = voteRateArr?.map((item) => {
    if (item.isSuccess) {
      isLoading = item.isLoading;
      return item.data[name];
    }
  });

  const myAttendArr = isLoading ? [] : [myVoteRateArr[0]];
  for (let i = 1; i < 2; i++) {
    !isLoading && myAttendArr.push(myVoteRateArr[i] - myVoteRateArr[i - 1]);
  }

  const average = [2, 3];

  return (
    <div>
      <ApexCharts
        type="line"
        series={[
          { name: "내 참여율", data: myAttendArr },
          { name: "평균 참여율", data: average },
        ]}
        options={{
          chart: {
            height: 500,
            width: 500,
          },
          stroke: {
            curve: "straight",
          },
          title: {
            text: "스터디 참여율",
            align: "left",
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5,
            },
          },
          xaxis: {
            categories: ["1월", "2월", "3월"],
          },
        }}
      />
    </div>
  );
}
