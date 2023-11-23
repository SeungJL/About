import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import { useUserInfoQuery } from "../../hooks/user/queries";
import PointIntro from "../../pagesComponents/point/PointIntro";
import PointPoint from "../../pagesComponents/point/PointPoint";
import PointScore from "../../pagesComponents/point/PointScore";
import PointSkeleton from "../../pagesComponents/point/skeleton/PointSkeleton";
import { isGuestState } from "../../recoil/userAtoms";

function Point() {
  const isGuest = useRecoilValue(isGuestState);
  console.log(23);
  const { data: userInfo } = useUserInfoQuery({
    enabled: !isGuest,
  });

  return (
    <>
      <Header title="" />
      <Layout>
        <PointIntro />
        {userInfo || isGuest ? (
          <Container>
            <PointScore myScore={userInfo?.score || 0} />
            <PointPoint mypoint={userInfo?.point || 0} />
          </Container>
        ) : (
          <PointSkeleton />
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  margin-top: var(--margin-sub);
`;

const Container = styled.div``;

export default Point;
