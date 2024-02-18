import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dayjsToStr } from "../../../helpers/dateHelpers";
import { myStudyState, voteDateState } from "../../../recoil/studyAtoms";
import { transferstudyDataState } from "../../../recoil/transferDataAtoms";
import { IParticipation } from "../../../types/study/studyDetail";
import AboutMainItemParticipants from "./HomeStudySectionItem/HomeStudySectionItemParticipants";
import AboutMainItemStatus from "./HomeStudySectionItem/HomeStudySectionItemStatus";

interface IAboutMainItem {
  participation: IParticipation;
  isMyResult?: boolean;
  isImagePriority: boolean;
}

function AboutMainItem({
  participation,
  isMyResult,
  isImagePriority,
}: IAboutMainItem) {
  const router = useRouter();

  const voteDate = useRecoilValue(voteDateState);
  const myStudyFixed = useRecoilValue(myStudyState);
  const setTransferstudyData = useSetRecoilState(transferstudyDataState);

  const { attendences, place, status } = participation || {};
  const statusFixed = place === myStudyFixed?.place ? "myOpen" : status;

  const onClickItem = () => {
    setTransferstudyData(participation);
    router.push(`/home/${dayjsToStr(voteDate)}/${participation.place._id}`);
  };

  return (
    <Layout
      status={statusFixed === "myOpen"}
      isMyResult={isMyResult}
      onClick={onClickItem}
    >
      {participation && (
        <>
          <ImageContainer>
            <Image
              src={place.image}
              fill={true}
              sizes="85px"
              alt="cafeImage"
              priority={isImagePriority}
            />
          </ImageContainer>
          <SpaceInfo>
            <AboutMainItemStatus
              place={place}
              status={status}
              memberCnt={attendences.length}
            />
            <Info>{place.brand}</Info>
            <AboutMainItemParticipants
              attendances={attendences}
              statusFixed={statusFixed}
              status={status}
              isImagePriority={isImagePriority}
            />
          </SpaceInfo>
        </>
      )}
    </Layout>
  );
}

const Layout = styled.button<{ status: boolean; isMyResult: boolean }>`
  width: 100%;
  height: 110px;
  background-color: white;
  box-shadow: var(--shadow);
  border-radius: var(--rounded);
  display: flex;
  align-items: center;
  margin-bottom: var(--gap-4);
  padding: var(--gap-3);
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  aspect-ratio: 1/1;
  border: var(--border);
  border-radius: var(--rounded);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const SpaceInfo = styled.div`
  margin-left: var(--gap-3);
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;

  color: var(--gray-3);
  font-size: 13px;
`;

export default AboutMainItem;
