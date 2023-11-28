import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

function EventBanner() {
  const router = useRouter();
  return (
    <Layout onClick={() => router.push(`/eventCalendar`)}>
      <Image
        src="https://studyabout.s3.ap-northeast-2.amazonaws.com/%EB%8F%99%EC%95%84%EB%A6%AC/banner.webp"
        width={375}
        height={90}
        alt="eventImg"
      />
    </Layout>
  );
}

// 16 더블

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export default EventBanner;
