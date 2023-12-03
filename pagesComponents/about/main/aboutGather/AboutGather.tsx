import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; //
import SectionHeader from "../../../../components/layout/atoms/SectionHeader";
import { GATHER_ALERT } from "../../../../constants/keys/localStorage";
import { useGatherAllQuery } from "../../../../hooks/gather/queries";
import { isGatherAlertState } from "../../../../recoil/alertAtoms";
import AboutGatherBlock from "./aboutGatherBlock/AboutGatherBlock";

import AboutGatherBlockSkeleton from "./aboutGatherBlock/AboutGatherBlockSkeleton";

const TEXT_VISIBLE_LENGTH = 22;

function AboutGather() {
  const router = useRouter();

  const setIsGatherAlert = useSetRecoilState(isGatherAlertState);

  //신규 모임 존재여부 체크
  const { data: gatherContentArr } = useGatherAllQuery({
    onSuccess(data) {
      const lastGather = data[data.length - 1];
      if (localStorage.getItem(GATHER_ALERT) !== String(lastGather.id))
        setIsGatherAlert(true);
      else setIsGatherAlert(false);
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
                .slice(-3)
                .reverse()
                .map((gather, idx) => (
                  <AboutGatherBlock gather={gather} key={idx} />
                ))
            : [0, 1, 2].map((_, idx) => <AboutGatherBlockSkeleton key={idx} />)}
        </Container>
        <MoreInfoBtn onClick={onClickMoreInfo}>더보기</MoreInfoBtn>
      </Main>
    </Layout>
  );
}
const MoreInfoBtn = styled.button`
  margin-top: auto;
  width: 100%;
  box-shadow: var(--box-shadow-b);
  height: 44px;
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  border-radius: var(--border-radius2);
  color: var(--color-mint);
  font-weight: 600;
  margin-top: auto;
`;
const Main = styled.main`
  min-height: 422px;
  margin: 0 var(--margin-main);
`;
const Layout = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 485px;
`;

const Container = styled.div`
  min-height: 354px;
`;

export default AboutGather;
