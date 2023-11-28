import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; //
import { Swiper, SwiperSlide } from "swiper/react";
import SectionHeader from "../../../../components/layout/atoms/SectionHeader";
import { GATHER_ALERT } from "../../../../constants/keys/localStorage";
import { useGatherAllQuery } from "../../../../hooks/gather/queries";
import { isGatherAlertState } from "../../../../recoil/alertAtoms";
import { prevPageUrlState } from "../../../../recoil/previousAtoms";
import { transferGatherDataState } from "../../../../recoil/transferDataAtoms";
import { IGather } from "../../../../types/page/gather";
import GatherBlock from "../../../gather/GatherBlock";

const TEXT_VISIBLE_LENGTH = 22;

function AboutGather() {
  const router = useRouter();

  const setGatherData = useSetRecoilState(transferGatherDataState);
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

  const onClickItem = (data: IGather) => {
    setGatherData(data);
    setPrevPageUrl("/about");
    router.push(`/gather/${data.id}`);
  };

  return (
    <Layout>
      <SectionHeader title="ABOUT 모임" url="/gather" />
      <Container>
        <Swiper
          navigation
          pagination={true}
          modules={[Pagination]}
          style={{
            width: "100%",
            height: "100%",
            paddingBottom: "var(--padding-sub)",
          }}
          slidesPerView={1}
        >
          {gatherContentArr
            ?.slice(-5)
            .reverse()
            .map((item, index) => (
              <SwiperSlide key={index} style={{ marginRight: "12px" }}>
                <GatherBlock gather={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;

  > .swiper-pagination,
  .swiper-pagination-bullets,
  .swiper-pagination-horizontal {
    bottom: 0px !important;

    > .swiper-pagination-bullet-active {
      background-color: var(--color-mint);
      z-index: 10;
    }
  }
`;

const Container = styled.div`
  padding: 0 var(--padding-main);
`;

export default AboutGather;
