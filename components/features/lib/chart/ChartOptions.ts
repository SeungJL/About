export const ChartStudyOptions = (text: string, attendMax: number) => ({
  chart: {
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: "straight" as "straight" | "smooth" | "stepline",
  },

  title: {
    text: text,
    align: "left" as "left" | "center" | "right",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"],
      opacity: 0.5,
    },
  },
  xaxis: {
    min: 2,
    max: 4,
  },

  yaxis: {
    min: 0,
    max: attendMax,
    forceNiceScale: true,
    labels: {
      formatter: function (val) {
        return Math.round(val).toString(); // y-axis 라벨은 반올림한 정수로 표시
      },
    },
  },
});
