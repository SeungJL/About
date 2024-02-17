import TabNav from "../../components2/molecules/navs/TabNav";

interface IStatisticsTabNav {}
export default function StatisticsTabNav({}: IStatisticsTabNav) {
  const tabNavOptions: ITabnav = {
    left: {
      text: "랭킹",
    },
    right: {
      text: "내 스터디",
    },
  };

  return <TabNav options={tabNavOptions} />;
}
