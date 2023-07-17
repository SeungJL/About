import { useEffect, useState } from "react";
import styled from "styled-components";
import StudySpaceVoteOverview from "../../../../pagesComponents/about/studySpace/SpaceSpaceVoteOverview";
import StudySpaceCover from "../../../../pagesComponents/about/studySpace/StudySpaceCover";
import StudySpaceHeader from "../../../../pagesComponents/about/studySpace/StudySpaceHeader";
import StudySpaceNavigation from "../../../../pagesComponents/about/studySpace/StudySpaceNavigation";
import StudySpaceOverview from "../../../../pagesComponents/about/studySpace/StudySpaceOverView";
import StudySpaceSetting from "../../../../pagesComponents/about/studySpace/StudySpaceSetting";
import StudySpaceSkeleton from "../../../../pagesComponents/about/studySpace/StudySpaceSkeleton";
import StudyTimeTable from "../../../../pagesComponents/about/studySpace/StudySpaceTable";
import { StudyStatus } from "../../../../types/statistics";
import { IAttendance, IPlace } from "../../../../types/studyDetails";
export interface IStudySpaceData {
  place: IPlace;
  attendences: IAttendance[];
  status: StudyStatus;
}
const IMAGE_LIST = [1, 2, 3, 4, 5];
function StudySpace() {
  const [studySpaceData, setStudySpaceData] = useState<IStudySpaceData>();
  const [randomNum, setRandomNum] = useState<number>();

  const place = studySpaceData?.place;
  const attendances = studySpaceData?.attendences;

  useEffect(() => {
    setRandomNum(Math.floor(Math.random() * IMAGE_LIST.length));
  }, []);

  const coverImageUrl = `/studyRandom/study${randomNum + 1}.jpg`;

  return (
    <>
      <StudySpaceSetting setStudySpaceData={setStudySpaceData} />
      {studySpaceData ? (
        <>
          <StudySpaceHeader title={place.brand} place={place} />
          <Layout>
            <StudySpaceCover
              coverImageUrl={coverImageUrl}
              logoImageUrl={place.image}
            />
            <StudySpaceOverview space={place} />
            <HrDiv />
            <StudySpaceVoteOverview
              voteCnt={attendances.length}
              place={place}
            />
            <StudyTimeTable attendances={attendances} />
            <StudySpaceNavigation
              studySpaceData={studySpaceData}
              voteCnt={attendances.length}
            />
          </Layout>
        </>
      ) : (
        <StudySpaceSkeleton coverImageUrl={coverImageUrl} />
      )}
    </>
  );
}

const Layout = styled.div``;

const HrDiv = styled.div`
  height: 1px;
  background-color: var(--border-color-light);
`;

export default StudySpace;
