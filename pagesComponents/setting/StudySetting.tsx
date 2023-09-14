import { SetStateAction, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { arrangeSpace } from "../../helpers/studyHelpers";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useStudyVoteQuery } from "../../hooks/study/queries";
import { isRefetchStudyState } from "../../recoil/refetchingAtoms";
import { studyState, voteDateState } from "../../recoil/studyAtoms";
import { locationState } from "../../recoil/userAtoms";
import { IStudy } from "../../types/study/study";
import StudySettingDecision from "./studySetting/StudySettingDecision";
import StudySettingUser from "./studySetting/StudySettingUser";
interface IStudySetting {
  participations: IStudy[];
  setParticipations: React.Dispatch<SetStateAction<IStudy[]>>;
}

function StudySetting({ participations, setParticipations }: IStudySetting) {
  const voteDate = useRecoilValue(voteDateState);

  const typeErrorToast = useTypeErrorToast();

  const setStudyState = useSetRecoilState(studyState);

  const location = useRecoilValue(locationState);
  const [isRefetch, setIsRefetch] = useRecoilState(isRefetchStudyState);

  const { refetch } = useStudyVoteQuery(voteDate, location, {
    onSuccess(data) {
      const temp = arrangeSpace(data.participations);
      setParticipations(temp);
      setStudyState(temp);
    },
    onError: (e) => typeErrorToast(e, "study"),
  });
  useEffect(() => {
    if (isRefetch) {
      setTimeout(() => {
        refetch();
        setIsRefetch(false);
      }, 600);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetch]);

  return (
    <>
      <StudySettingDecision
        voteDate={voteDate}
        participations={participations}
      />
      <StudySettingUser participations={participations} />
    </>
  );
}

export default StudySetting;
