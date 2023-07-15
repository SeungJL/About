import { useSession } from "next-auth/react";
import styled from "styled-components";

function PointIntro() {
  const { data: session } = useSession();

  return (
    <Layout>
      <span>{session?.user.name}</span>님 만나서 반가워요!
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: var(--margin-md);
  margin-bottom: var(--margin-max);
  margin-left: var(--margin-min);
  font-size: 16px;
  color: var(--font-h3);
  > span {
    color: var(--font-h1);
    font-size: 18px;
    font-weight: 600;
  }
`;

export default PointIntro;
