import { useRouter } from "next/router";
import styled from "styled-components";
import ImageSlider from "../../../components/dataViews/imageSlider/ImageSlider";
import {
  EVENT_BANNER_CALENDAR,
  EVENT_BANNER_PASSION,
} from "../../../constants/image/imageUrl";

function EventBanner() {
  const router = useRouter();

  const imageArr = [EVENT_BANNER_CALENDAR, EVENT_BANNER_PASSION];

  const onClick = () => {
    console.log("SUC");
  };

  return (
    <Layout onClick={() => router.push(`/eventCalendar`)}>
      <ImageSlider type="eventBanner" imageContainer={imageArr} />
    </Layout>
  );
}

// 16 더블

const Layout = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  background-color: RGB(235, 236, 240);
`;

export default EventBanner;
