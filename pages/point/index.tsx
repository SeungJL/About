import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import PointPoint from "../../pagesComponents/Point/PointPoint";
import PointScore from "../../pagesComponents/Point/PointScore";

function Point() {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Header title="" />

      <Layout>
        <Intro>
          <span>{session?.user.name}</span>님 만나서 반가워요!
        </Intro>
        <PointScore setIsLoading={setIsLoading} />
        <PointPoint />
      </Layout>
    </>
  );
}

const Layout = styled.div``;

const Intro = styled.div`
  padding: 8px 16px;
  font-size: 16px;
  color: var(--font-h3);
  > span {
    color: var(--font-h1);
    font-size: 18px;
    font-weight: 600;
  }
`;

export default Point;
