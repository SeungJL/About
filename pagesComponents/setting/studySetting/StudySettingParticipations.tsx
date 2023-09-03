import { SetStateAction, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { arrangeSpace } from "../../../helpers/studyHelpers";
import { useTypeErrorToast } from "../../../hooks/CustomToast";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import { isRefetchStudyState } from "../../../recoil/refetchingAtoms";
import { voteDateState } from "../../../recoil/studyAtoms";
import { userLocationState } from "../../../recoil/userAtoms";
import { IStudy } from "../../../types/study/study";

interface IStudySettingParticipations {
  setParticipations: React.Dispatch<SetStateAction<IStudy[]>>;
}

function StudySettingParticipations({
  setParticipations,
}: IStudySettingParticipations) {
  const typeErrorToast = useTypeErrorToast();

  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(userLocationState);
  const [isRefetch, setIsRefetch] = useRecoilState(isRefetchStudyState);

  const { refetch } = useStudyVoteQuery(voteDate, location, {
    onSuccess(data) {
      setParticipations(arrangeSpace(data.participations));
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

  return null;
}

export default StudySettingParticipations;
