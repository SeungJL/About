import { SetStateAction, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import { useTypeErrorToast } from "../../../hooks/ui/CustomToast";
import { arrangeSpace } from "../../../libs/utils/studyUtils";
import { isRefetchStudyState } from "../../../recoil/refetchingAtoms";
import { voteDateState } from "../../../recoil/studyAtoms";
import { userLocationState } from "../../../recoil/userAtoms";
import { IParticipation } from "../../../types/studyDetails";

interface IStudySettingParticipations {
  participations: IParticipation[];
  setParticipations: React.Dispatch<SetStateAction<IParticipation[]>>;
}

function StudySettingParticipations({
  participations,
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
