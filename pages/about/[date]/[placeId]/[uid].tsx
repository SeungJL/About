import { useEffect, useState } from "react";
import styled from "styled-components";
import { MainLoading } from "../../../../components/common/MainLoading";
import StudySpaceVoteOverview from "../../../../pagesComponents/about/studySpace/SpaceSpaceVoteOverview";
import StudySpaceCover from "../../../../pagesComponents/about/studySpace/StudySpaceCover";
import StudySpaceHeader from "../../../../pagesComponents/about/studySpace/StudySpaceHeader";
import StudySpaceNavigation from "../../../../pagesComponents/about/studySpace/StudySpaceNavigation";
import StudySpaceOverview from "../../../../pagesComponents/about/studySpace/StudySpaceOverView";
import StudySpaceSetting from "../../../../pagesComponents/about/studySpace/StudySpaceSetting";
import StudyTimeTable from "../../../../pagesComponents/about/studySpace/StudySpaceTable";
import {
  IAttendance,
  IPlace,
  StudyStatus,
} from "../../../../types/study/study";
export interface IStudySpaceData {
  place: IPlace;
  attendences: IAttendance[];
  status: StudyStatus;
}
const IMAGE_LIST = [1, 2, 3, 4, 5];

function StudySpace2() {
  const [studySpaceData, setStudySpaceData] = useState<IStudySpaceData>();
  const place = studySpaceData?.place;
  const attendances = studySpaceData?.attendences;
  const [randomNum, setRandomNum] = useState<number>();

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
              logoImageUrl={place.image}
              coverImageUrl={coverImageUrl}
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
        <MainLoading />
      )}
    </>
  );
}

const Layout = styled.div`
  padding: 0 16px;
`;

const HrDiv = styled.div`
  height: 8px;
  background-color: var(--font-h7);
`;

export default StudySpace2;
