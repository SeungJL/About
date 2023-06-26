import { useState } from "react";
import styled from "styled-components";
import { MainLoading } from "../../../../components/common/MainLoading";
import StudySpaceVoteOverview from "../../../../pagesComponents/About/studySpace/SpaceSpaceVoteOverview";
import StudySpaceCover from "../../../../pagesComponents/About/studySpace/StudySpaceCover";
import StudySpaceHeader from "../../../../pagesComponents/About/studySpace/StudySpaceHeader";
import StudySpaceNavigation from "../../../../pagesComponents/About/studySpace/StudySpaceNavigation";
import StudySpaceOverview from "../../../../pagesComponents/About/studySpace/StudySpaceOverView";
import StudySpaceSetting from "../../../../pagesComponents/About/studySpace/StudySpaceSetting";
import StudyTimeTable from "../../../../pagesComponents/About/studySpace/StudySpaceTable";
import { IPlaceStatusType } from "../../../../types/statistics";
import { IAttendance, IPlace } from "../../../../types/studyDetails";
export interface IStudySpaceData {
  place: IPlace;
  attendences: IAttendance[];
  status: IPlaceStatusType;
}

function StudySpace() {
  const [studySpaceData, setStudySpaceData] = useState<IStudySpaceData>();
  const place = studySpaceData?.place;
  const attendances = studySpaceData?.attendences;

  return (
    <>
      <StudySpaceSetting setStudySpaceData={setStudySpaceData} />
      {studySpaceData ? (
        <>
          <StudySpaceHeader title={place.brand} place={place} />
          <Layout>
            <StudySpaceCover src={place.image} />
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

export default StudySpace;
