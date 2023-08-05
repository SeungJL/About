import styled from "styled-components";
import AboutSectionHeader from "../../components/common/AboutSectionHeader";
import Chart from "../../components/features/lib/chart/Chart";
import { useUserInfoQuery } from "../../hooks/user/queries";

function AboutRanking() {
  const { data: userInfo } = useUserInfoQuery();
  return (
    <Layout>
      <AboutSectionHeader
        title="ABOUT 랭킹"
        url="/ranking"
        subTitle="랭킹 보러가기"
      />
      <Chart type="study" user={userInfo} />
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  margin-top: 32px;
`;

export default AboutRanking;
