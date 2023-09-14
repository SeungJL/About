import dayjs from "dayjs";
import styled from "styled-components";
import { GatherLocation } from "../../../../types/page/gather";

interface IAboutGatherDetail {
  location: GatherLocation;
  date: string;
}

function AboutGatherDetail({ location, date }: IAboutGatherDetail) {
  return (
    <Layout>
      {location.main}, {dayjs(date).format("M월 D일 h시")}
    </Layout>
  );
}

const Layout = styled.div`
  color: var(--font-h3);
  font-size: 11px;
`;

export default AboutGatherDetail;
