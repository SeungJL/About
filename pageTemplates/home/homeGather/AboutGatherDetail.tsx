import dayjs from "dayjs";
import styled from "styled-components";
import { IGatherLocation } from "../../../../types/page/gather";

interface IAboutGatherDetail {
  location: IGatherLocation;
  date: string;
}

function AboutGatherDetail({ location, date }: IAboutGatherDetail) {
  return (
    <Layout>
      {location.main},{" "}
      {date === "미정" ? date : dayjs(date).format("M월 D일 h시")}
    </Layout>
  );
}

const Layout = styled.div`
  color: var(--font-h3);
  font-size: 11px;
`;

export default AboutGatherDetail;
