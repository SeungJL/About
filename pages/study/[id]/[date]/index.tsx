import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { PLACE_TO_LOCATION } from "../../../../constants2/serviceConstants/studyConstants/studyLocationConstants";
import { useStudyVoteQuery } from "../../../../hooks/study/queries";
import { getMyStudy } from "../../../../libs/study/getMyStudy";
import StudyCover from "../../../../pageTemplates/study/StudyCover";
import StudyHeader from "../../../../pageTemplates/study/StudyHeader";
import StudyOverview from "../../../../pageTemplates/study/StudyOverView";
import { myStudyState } from "../../../../recoils/studyRecoils";

export default function Page() {
  const { data } = useSession();
  const { id, date } = useParams<{ id: string; date: string }>() || {};

  const setMyStudy = useSetRecoilState(myStudyState);

  console.log(24);

  const location = PLACE_TO_LOCATION[id];

  const { data: studyAll } = useStudyVoteQuery(date, location, {
    enabled: !!location && !!date,
  });

  useEffect(() => {
    if (!studyAll || !data?.user) return;
    setMyStudy(getMyStudy(studyAll, data.user.uid));
  }, [studyAll]);

  const study = studyAll?.find((study) => study.place._id === id);
  const place = study?.place;

  return (
    <>
      {place && (
        <>
          <StudyHeader place={place} />
          <StudyCover imageUrl={place.coverImage} brand={place.brand} />
          <StudyOverview
            title={place.fullname}
            locationDetail={place.locationDetail}
            time={place.time}
            participantsNum={study?.attendences.length}
            coordinate={{
              lat: place.latitude,
              lng: place.longitude,
            }}
          />
          {/* <Divider />
          <StudyDateBar />
          <StudyTimeBoard
            participants={study.attendences}
            studyStatus={study.status}
          />
          <StudyParticipants
            participants={study.attendences}
            absences={study.absences}
          />
          <StudyVoteNav /> */}
        </>
      )}
    </>
  );
}
