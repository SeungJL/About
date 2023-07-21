import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { StudySpaceLogo } from "../../../../components/utils/DesignAdjustment";
import { dayjsToStr } from "../../../../helpers/dateHelpers";
import {
  myStudyFixedState,
  voteDateState,
} from "../../../../recoil/studyAtoms";
import { SUWAN_투썸, YANG_할리스 } from "../../../../storage/study";
import { IStudy } from "../../../../types/study/study";
import AboutMainItemParticipants from "./aboutMainItem/AboutMainItemParticipants";
import AboutMainItemStatus from "./aboutMainItem/AboutMainItemStatus";

interface IAboutMainItem {
  participation: IStudy;
}

function AboutMainItem({ participation }: IAboutMainItem) {
  const router = useRouter();

  const voteDate = useRecoilValue(voteDateState);
  const mySpaceFixed = useRecoilValue(myStudyFixedState);

  const { attendences, place, status } = participation || {};
  const statusFixed = place === mySpaceFixed?.place ? "myOpen" : status;

  const onClickItem = () => {
    router.push(`/about/${dayjsToStr(voteDate)}/${participation.place._id}`);
  };

  return (
    <Layout status={statusFixed === "myOpen"} onClick={onClickItem}>
      <ImageContainer
        isDark={place._id === YANG_할리스 || place._id === SUWAN_투썸}
      >
        <StudySpaceLogo place={place} isBig={true} />
      </ImageContainer>
      <SpaceInfo>
        <AboutMainItemStatus place={place} status={status} />
        <Info>{place.brand}</Info>
        <AboutMainItemParticipants
          attendances={attendences}
          statusFixed={statusFixed}
          status={status}
        />
      </SpaceInfo>
    </Layout>
  );
}

const Layout = styled.div<{ status: boolean }>`
  height: 100px;
  background-color: white;
  border-radius: var(--border-radius-main);
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-sub);
  padding: var(--padding-sub);
  padding-left: ${(props) => props.status && "0px"};
  flex-direction: ${(props) => (props.status ? "row-reverse" : null)};
  border: ${(props) => props.status && "var(--border-mint)"};
`;

const ImageContainer = styled.div<{ isDark?: boolean }>`
  width: 77px;
  height: 77px;
  border: var(--border-sub);
  border-radius: var(--border-radius-main);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${(props) => props.isDark && "var(--font-h7)"};
`;

const SpaceInfo = styled.div`
  margin-left: var(--margin-sub);
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;

  color: var(--font-h3);
  font-size: 12px;
`;

export default AboutMainItem;
