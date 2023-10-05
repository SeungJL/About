import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

function EventBanner() {
  const router = useRouter();
  return (
    <Layout onClick={() => router.push(`/eventCalendar`)}>
      <Image src="/banner.jpg" width={375} height={90} alt="eventImg" />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export default EventBanner;
