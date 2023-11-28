import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dayjsToStr } from "../../../../helpers/dateHelpers";
import { myStudyState, voteDateState } from "../../../../recoil/studyAtoms";
import { transferStudySpaceDataState } from "../../../../recoil/transferDataAtoms";
import { IParticipation } from "../../../../types/study/studyDetail";
import AboutMainItemParticipants from "./aboutMainItem/AboutMainItemParticipants";
import AboutMainItemStatus from "./aboutMainItem/AboutMainItemStatus";

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
  const setTransferStudySpaceData = useSetRecoilState(
    transferStudySpaceDataState
  );

  const { attendences, place, status } = participation || {};
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
      {participation && (
        <>
          <ImageContainer>
            <Image src={place.image} layout="fill" alt="cafeImage" />
          </ImageContainer>
          <SpaceInfo>
            <AboutMainItemStatus place={place} status={status} />
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

const Layout = styled.div<{ status: boolean; isMyResult: boolean }>`
  height: 110px;
  background-color: white;
  box-shadow: var(--box-shadow-b);
  border-radius: var(--border-radius2);
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-sub);
  padding: var(--padding-sub);
  /* border: ${(props) => props.status && "var(--border-mint)"}; */
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  aspect-ratio: 1/1;
  border: var(--border-sub);
  border-radius: var(--border-radius2);
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
  font-size: 13px;
`;

export default AboutMainItem;
