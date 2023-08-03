import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination"; //
import { Swiper, SwiperSlide } from "swiper/react";
import { useGatherContentQuery } from "../../../../hooks/gather/queries";
import { transferGatherDataState } from "../../../../recoil/transferDataAtoms";
import { IGatherContent } from "../../../../types/page/gather";
import AboutGatherDetail from "./AboutGatherDetail";
import AboutGatherHeader from "./AboutGatherHeader";
import AboutGatherMember from "./AboutGatherMember";

function AboutGather() {
  const router = useRouter();

  const setGatherData = useSetRecoilState(transferGatherDataState);

  const { data: gatherContentArr, isLoading } = useGatherContentQuery();

  if (isLoading) return null;

  const textVisibleLength = 22;

  const onClickItem = (data: IGatherContent) => {
    setGatherData(data);
    router.push(`/gather/${data.id}`);
  };

  return (
    <Layout>
      <Header>
        <Title>ABOUT 모임</Title>
        <ShowAllBtn onClick={() => router.push(`/gather`)}>
          <span>모두보기</span>
          <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </ShowAllBtn>
      </Header>
      <Swiper
        navigation
        style={{
          width: "100%",
          height: "auto",
        }}
        slidesPerView={1.2}
      >
        {gatherContentArr
          ?.slice()
          .reverse()
          .slice(0, 3)
          .map((item, index) => {
            const title = item.title;
            const participants = [
              ...item.participants.map((who) => who.user),
              item.user,
            ];
            return (
              <SwiperSlide key={index}>
                <GatherItem onClick={() => onClickItem(item)}>
                  <AboutGatherHeader
                    title={item.type.title}
                    place={item.place}
                  />
                  <AboutGatherTitle>
                    {title.length < textVisibleLength
                      ? title
                      : title.slice(0, textVisibleLength) + "..."}
                  </AboutGatherTitle>
                  <AboutGatherDetail
                    location={item.location}
                    date={item.date as string}
                  />
                  <AboutGatherMember
                    participants={participants}
                    memberCnt={item.memberCnt}
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
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: var(--padding-main);
  margin-bottom: var(--margin-main);
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const ShowAllBtn = styled.button`
  color: var(--font-h3);
  font-size: 12px;
  > span:first-child {
    margin-right: var(--margin-min);
  }
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
