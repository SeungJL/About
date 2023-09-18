import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { StudySpaceLogo } from "../../../../components/utils/DesignAdjustment";
import { dayjsToStr } from "../../../../helpers/dateHelpers";
import {
  myStudyFixedState,
  voteDateState,
} from "../../../../recoil/studyAtoms";
import { transferStudySpaceDataState } from "../../../../recoil/transferDataAtoms";
import { IParticipation } from "../../../../types/study/study";
import AboutMainItemParticipants from "./aboutMainItem/AboutMainItemParticipants";
import AboutMainItemStatus from "./aboutMainItem/AboutMainItemStatus";

interface IAboutMainItem {
  participation: IParticipation;
  isMyResult?: boolean;
}

function AboutMainItem({ participation, isMyResult }: IAboutMainItem) {
  const router = useRouter();

  const voteDate = useRecoilValue(voteDateState);
  const myStudyFixed = useRecoilValue(myStudyFixedState);
  const setTransferStudySpaceData = useSetRecoilState(
    transferStudySpaceDataState
  );

  const { attendences, place, status } = participation;
  const statusFixed = place === myStudyFixed?.place ? "myOpen" : status;

  const onClickItem = () => {
    setTransferStudySpaceData(participation);
    router.push(`/about/${dayjsToStr(voteDate)}/${participation.place._id}`);
  };

  return (
    <Layout
      status={statusFixed === "myOpen"}
      isMyResult={isMyResult}
      onClick={onClickItem}
    >
      <ImageContainer>
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

const Layout = styled.div<{ status: boolean; isMyResult: boolean }>`
  height: 110px;
  background-color: white;
  box-shadow: var(--box-shadow-sub);
  border-radius: var(--border-radius-main);
  display: flex;
  align-items: center;
  margin-bottom: ${(props) =>
    props.isMyResult ? "29px" : "var(--margin-main)"};
  padding: var(--padding-sub);
  padding-left: ${(props) => props.status && "0px"};
  flex-direction: ${(props) => (props.status ? "row-reverse" : null)};
  border: ${(props) => props.status && "var(--border-mint)"};
`;

const ImageContainer = styled.div`
  width: 77px;
  height: 77px;
  border: var(--border-sub);
  border-radius: var(--border-radius-main);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
