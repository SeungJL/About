import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import { MainLoading } from "../../components/ui/MainLoading";
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
        <Wrapper isLoading={!isGuest && isLoading}>
          <Intro>
            <span>{session?.user.name}</span>님 만나서 반가워요!
          </Intro>
          <PointScore setIsLoading={setIsLoading} />
          <PointPoint />
        </Wrapper>
        {!isGuest && isLoading && <MainLoading />}
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

const Wrapper = styled.div<{ isLoading: boolean }>`
  visibility: ${(props) => (props.isLoading ? "hidden" : "visible")};
`;

export default Point;
