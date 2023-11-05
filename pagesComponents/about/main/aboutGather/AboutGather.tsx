import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
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
import AboutGatherDetail from "./AboutGatherDetail";
import AboutGatherHeader from "./AboutGatherHeader";
import AboutGatherMember from "./AboutGatherMember";

const TEXT_VISIBLE_LENGTH = 22;

function AboutGather() {
  const router = useRouter();

  const setGatherData = useSetRecoilState(transferGatherDataState);
  const setPrevPageUrl = useSetRecoilState(prevPageUrlState);
  const setIsGatherAlert = useSetRecoilState(isGatherAlertState);

  //신규 모임 존재여부 체크
  const { data: gatherContentArr } = useGatherAllQuery({
    onSuccess(data) {
      console.log(2, data);
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
      <Swiper
        navigation
        style={{
          width: "100%",
          height: "auto",
        }}
        slidesPerView={1.2}
      >
        {gatherContentArr
          ?.slice(-5)
          .reverse()
          .map((item, index) => {
            const title = item.title;
            const participants = item.isAdminOpen ? [] : [item.user];
            item.participants.forEach((who) => {
              participants.push(who.user);
            });

            return (
              <SwiperSlide key={index}>
                <GatherItem onClick={() => onClickItem(item)}>
                  <AboutGatherHeader
                    title={item.type.title}
                    place={item.place}
                    status={item.status}
                  />
                  <AboutGatherTitle>
                    {title.length < TEXT_VISIBLE_LENGTH
                      ? title
                      : title.slice(0, TEXT_VISIBLE_LENGTH) + "..."}
                  </AboutGatherTitle>
                  <AboutGatherDetail
                    location={item.location}
                    date={item.date as string}
                  />
                  <AboutGatherMember
                    participants={participants}
                    memberCnt={item.memberCnt}
                    status={item.status}
                  />
                </GatherItem>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  padding-left: var(--padding-main);
  margin-top: 24px;
  margin-bottom: var(--margin-main);
  display: flex;
  flex-direction: column;
`;

const GatherItem = styled.div`
  width: calc(100% - 2 * var(--margin-main));
  display: flex;
  flex-direction: column;
  border-bottom: var(--border-main-light);
  box-shadow: var(--box-shadow-sub);
  padding: var(--padding-sub) 0;
  height: 130px;
  background-color: white;
  margin-right: 12px;
  padding: var(--padding-sub);
  border-radius: var(--border-radius-main);
`;

const AboutGatherTitle = styled.span`
  margin: var(--margin-min) 0;
  font-size: 13px;
  font-weight: 600;
`;

export default AboutGather;
