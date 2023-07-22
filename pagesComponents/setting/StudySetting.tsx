import dayjs from "dayjs";
import { SetStateAction, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { STUDY_VOTE_END_HOUR } from "../../constants/study";
import { useStudyResultDecideMutation } from "../../hooks/study/mutations";
import { useStudyStartTimeQuery } from "../../hooks/study/queries";
import { studyStartTimeState, voteDateState } from "../../recoil/studyAtoms";
import { IStudy } from "../../types/study/study";
import StudySettingParticipations from "./studySetting/StudySettingParticipations";
import StudySettingUser from "./studySetting/StudySettingUser";

interface IStudySetting {
  participations: IStudy[];
  setParticipations: React.Dispatch<SetStateAction<IStudy[]>>;
}

function StudySetting({ participations, setParticipations }: IStudySetting) {
  const voteDate = useRecoilValue(voteDateState);
  const setStudyStartTime = useSetRecoilState(studyStartTimeState);

  useStudyStartTimeQuery(voteDate, {
    onSuccess(data) {
      setStudyStartTime(data);
    },
  });

  const { mutateAsync: decideSpace } = useStudyResultDecideMutation(
    dayjs().add(1, "day")
  );

  useEffect(() => {
    if (participations.length === 0 || participations[0].status !== "pending")
      return;
    if (dayjs().hour() >= STUDY_VOTE_END_HOUR) decideSpace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participations]);

  return (
    <>
      <StudySettingParticipations setParticipations={setParticipations} />
      <StudySettingUser participations={participations} />
    </>
  );
}

export default StudySetting;
