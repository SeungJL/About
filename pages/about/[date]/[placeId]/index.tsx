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
import { studyDateStatusState } from "../../../../recoil/studyAtoms";
import { transferStudySpaceDataState } from "../../../../recoil/transferDataAtoms";
import { STUDY_SPACE_INFO } from "../../../../storage/study";
import { IParticipation } from "../../../../types/study/studyDetail";

const IMAGE_ARRAY_LENGTH = 6;

function StudySpace() {
  const transferStudySpaceData = useRecoilValue(transferStudySpaceDataState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);

  const [participation, setParticipation] = useState<IParticipation>(
    transferStudySpaceData
  );
  const [randomNum] = useState(() =>
    Math.floor(Math.random() * IMAGE_ARRAY_LENGTH)
  );

  const isPrivate = participation?.place.brand === "자유 신청";

  const { place, attendences, status } = participation || {};

  const coverImageUrl = `/studyRandom/study${randomNum + 1}.jpg`;

  const filtered =
    studyDateStatus === "not passed"
      ? attendences
      : attendences?.filter((who) => who.firstChoice);

  const info = STUDY_SPACE_INFO.find((info) => info.id === place?._id);

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
            {!isPrivate && <StudySpaceOverview place={place} info={info} />}
            <HrDiv />
            <StudySpaceVoteOverview
              voteCnt={filtered.length}
              place={place}
              status={status}
              isPrivate={isPrivate}
            />
            {!isPrivate && <StudyTimeTable attendances={filtered} />}
            <StudySpaceUserComments
              attendances={filtered}
              isPrivate={isPrivate}
            />
            <StudySpaceNavigation
              place={place}
              attendences={filtered}
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
