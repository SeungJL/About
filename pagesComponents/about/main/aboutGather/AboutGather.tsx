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
import { prevPageUrlState } from "../../../../recoil/previousAtoms";
import GatherBlock from "./aboutGatherBlock/AboutGatherBlock";

const TEXT_VISIBLE_LENGTH = 22;

function AboutGather() {
  const router = useRouter();

  const setPrevPageUrl = useSetRecoilState(prevPageUrlState);
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
      <Container>
        <Main>
          <Container>
            {gatherContentArr
              ?.slice(-3)
              ?.reverse()
              ?.map((gather, idx) => (
                <GatherBlock gather={gather} key={idx} />
              ))}
          </Container>
          <MoreInfoBtn onClick={onClickMoreInfo}>더보기</MoreInfoBtn>
        </Main>
      </Container>
    </Layout>
  );
}
const MoreInfoBtn = styled.button`
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
`;
const Main = styled.main`
  margin: 0 var(--margin-main);
`;
const Layout = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 485px;
`;

const Container = styled.div``;

export default AboutGather;
