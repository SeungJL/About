import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import StudySpaceVoteOverview from "../../../../pagesComponents/about/studySpace/SpaceSpaceVoteOverview";
import StudySpaceCover from "../../../../pagesComponents/about/studySpace/StudySpaceCover";
import StudySpaceHeader from "../../../../pagesComponents/about/studySpace/StudySpaceHeader";
import StudySpaceNavigation from "../../../../pagesComponents/about/studySpace/StudySpaceNavigation";
import StudySpaceOverview from "../../../../pagesComponents/about/studySpace/StudySpaceOverView";
import StudySpaceSetting from "../../../../pagesComponents/about/studySpace/StudySpaceSetting";
import StudySpaceSkeleton from "../../../../pagesComponents/about/studySpace/StudySpaceSkeleton";
import StudyTimeTable from "../../../../pagesComponents/about/studySpace/StudySpaceTable";
import StudySpaceUserComments from "../../../../pagesComponents/about/studySpace/studySpaceUserComments/StudySpaceUserComments";
import { transferStudySpaceDataState } from "../../../../recoil/transferDataAtoms";
import { IParticipation } from "../../../../types/study/studyDetail";

const IMAGE_ARRAY_LENGTH = 6;

function StudySpace() {
  const transferStudySpaceData = useRecoilValue(transferStudySpaceDataState);

  const [participation, setParticipation] = useState<IParticipation>(
    transferStudySpaceData
  );
  const [randomNum] = useState(() =>
    Math.floor(Math.random() * IMAGE_ARRAY_LENGTH)
  );

  const isPrivate = participation?.place.brand === "자유";

  console.log(44, participation);
  const { place, attendences, status } = participation || {};

  const coverImageUrl = `/studyRandom/study${randomNum + 1}.jpg`;

  return (
    <>
      <StudySpaceSetting
        participation={participation}
        setParticipation={setParticipation}
      />
      {participation ? (
        <>
          <Layout>
            <StudySpaceHeader title={place.brand} place={place} />
            <StudySpaceCover
              coverImageUrl={coverImageUrl}
              logoImageUrl={place.image}
            />
            {!isPrivate && <StudySpaceOverview space={place} />}
            <HrDiv />
            <StudySpaceVoteOverview
              voteCnt={attendences.length}
              place={place}
              status={status}
            />
            {!isPrivate && <StudyTimeTable attendances={attendences} />}
            <StudySpaceUserComments attendances={attendences} />
            <StudySpaceNavigation
              place={place}
              attendences={attendences}
              status={status}
              isPrivate={isPrivate}
            />
          </Layout>
        </>
      ) : (
        <StudySpaceSkeleton coverImageUrl={coverImageUrl} />
      )}
    </>
  );
}

const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const HrDiv = styled.div`
  height: 1px;
  background-color: var(--font-h56);
`;

export default StudySpace;
