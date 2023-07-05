import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { LogoAdjustmentImage } from "../../../../components/ui/DesignAdjustment";
import { dayjsToStr } from "../../../../libs/typeConverter";
import {
  mySpaceFixedState,
  voteDateState,
} from "../../../../recoil/studyAtoms";
import { YANG_할리스 } from "../../../../storage/study";
import { IParticipation } from "../../../../types/studyDetails";
import AboutMainItemParticipants from "./aboutMainItem/AboutMainItemParticipants";
import AboutMainItemStatus from "./aboutMainItem/AboutMainItemStatus";

interface IAboutMainItem {
  studySpaceInfo: IParticipation;
  voted: boolean;
}

function AboutMainItem({ studySpaceInfo, voted }: IAboutMainItem) {
  const router = useRouter();

  const voteDate = useRecoilValue(voteDateState);
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);

  const { attendences, place, status } = studySpaceInfo || {};
  const statusFixed = place === mySpaceFixed?.place ? "myOpen" : status;

  const onClickItem = () => {
    router.push(`/about/${dayjsToStr(voteDate)}/${studySpaceInfo.place._id}`);
  };

  return (
    <Layout status={statusFixed === "myOpen"} onClick={onClickItem}>
      <ImageContainer isDark={place?._id === YANG_할리스}>
        <LogoAdjustmentImage place={place} />
      </ImageContainer>
      <SpaceInfo>
        <AboutMainItemStatus
          branch={place?.branch}
          status={status}
          statusFixed={statusFixed}
        />
        <Info>{place?.brand}</Info>
        <AboutMainItemParticipants
          attendances={attendences}
          statusFixed={statusFixed}
          voted={voted}
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
