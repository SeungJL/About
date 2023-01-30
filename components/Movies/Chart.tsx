import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchChartData, fetchMovies } from "../../common/api";
import ApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../../common/atoms";

var dayjs = require("dayjs");
const DateArr: number[] = [];
for (let i = 10; i >= 0; i--) {
  DateArr.push(Number(dayjs().add(-i, "day").format("YYYYMMDD")));
}

const Chart = () => {
  const { movieId } = useParams();
  const [seeViews, seeSetViews]: any = useState([]);
  const [minH, setMinH] = useState(0);
  const [maxH, setMaxH] = useState(0);
  const [seeLoading, setSeeLoading] = useState(true);
  const isDark = useRecoilValue(isDarkAtom);

  let { isLoading, data } = useQuery<any>(["movie"], () =>
    fetchChartData(DateArr, movieId)
  );
  useEffect(() => {
    if (isLoading === false) {
      var temp: any = [];
      (async () => {
        for (let i = 0; i < data.length; i++) {
          await temp.push(Number(data[i].see));
        }
        await seeSetViews(temp);
        await setMinH(Math.min(...seeViews));
        await setMaxH(Math.max(...seeViews));
        await setSeeLoading(false);
      })();
    }
  }, [isLoading]);

  return (
    <div>
      {seeLoading ? (
        <div>Loading...</div>
      ) : (
        <ApexChart
          type="line"
          width="600"
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },

              zoom: {
                enabled: false,
              },
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              min: 100000,
              max: maxH,
            },
          }}
          series={[
            {
              name: "SeeViewer",
              data: seeViews,
            },
          ]}
        />
      )}
    </div>
  );
};

export default Chart;
