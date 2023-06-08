import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

function EventBanner() {
  const router = useRouter();
  return (
    <Layout onClick={() => router.push(`/event/1`)}>
      <Image src="/event/event.png" width={360} height={90} alt="eventImg" />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

export default EventBanner;
