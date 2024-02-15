import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; //

import AboutGatherBlockSkeleton from "./homeGatherBlock/homeGatherBlockSkeleton";

const TEXT_VISIBLE_LENGTH = 22;

function HomeGather2() {
  const router = useRouter();

  const setIsGatherAlert = useSetRecoilState(isGatherAlertState);

  //신규 모임 존재여부 체크
  const { data: gatherContentArr } = useGatherQuery({
    onSuccess(data) {
      const lastGather = data[data.length - 1];
      if (localStorage.getItem(GATHER_ALERT) !== String(lastGather.id)) {
        setIsGatherAlert(true);
      } else setIsGatherAlert(false);
    },
  });

  const onClickMoreInfo = () => {
    router.push("/gather");
  };

  return (
    <Layout>
      <SectionHeader title="ABOUT 모임" url="/gather" />
      <Main>
        <Container>
          {gatherContentArr
            ? gatherContentArr
                .slice(0, 3)
                .map((gather, idx) => (
                  <AboutGatherBlock
                    gather={gather}
                    key={idx}
                    isImagePriority={true}
                  />
                ))
            : [0, 1, 2].map((_, idx) => <AboutGatherBlockSkeleton key={idx} />)}
        </Container>
        <MoreInfoBtn onClick={onClickMoreInfo}>더보기</MoreInfoBtn>
      </Main>
    </Layout>
  );
}
const MoreInfoBtn = styled.button`
  width: 100%;
  box-shadow: var(--shadow);
  height: 44px;
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  border-radius: var(--rounded);
  color: var(--color-mint);
  font-weight: 600;
  margin-top: auto;
  margin-bottom: var(--gap-4);
`;
const Main = styled.main`
  margin: 0 var(--gap-4);
`;
const Layout = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--gray-8);
  padding-bottom: var(--gap-4);
`;

const Container = styled.div``;

export default HomeGather;
