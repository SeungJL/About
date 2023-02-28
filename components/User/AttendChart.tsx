import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useVoteRateQueries, useVoteRateQuery } from "../../hooks/user/queries";

export default function AttendChart() {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const { data: session } = useSession();
  const name = session?.user.name;
  console.log(552, useVoteRateQuery(2));
  const voteRateArr = useVoteRateQueries([1, 2]);
  console.log((voteRateArr as any).isLoading);
  const myVoteRateArr = voteRateArr.map((item) => item.data[name]);
  const myAttendArr = [myVoteRateArr[0]];
  for (let i = 1; i < 2; i++) {
    myAttendArr.push(myVoteRateArr[i] - myVoteRateArr[i - 1]);
  }
  //const myAttendArr = voteRateArr.map((item) => item.data[name]);

  return (
    <div>
      <ApexCharts
        type="line"
        series={[
          { name: "오늘의 기온", data: [19, 26, 20, 9] },
          { name: "내일의 기온", data: [30, 26, 34, 10] },
        ]}
        options={{
          chart: {
            height: 500,
            width: 500,
          },
        }}
      />
    </div>
  );
}
