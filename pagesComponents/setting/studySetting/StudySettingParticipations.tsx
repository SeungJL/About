import { SetStateAction, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { arrangeSpace } from "../../../helpers/studyHelpers";
import { useTypeErrorToast } from "../../../hooks/CustomToast";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import { isRefetchStudyState } from "../../../recoil/refetchingAtoms";
import { studyState, voteDateState } from "../../../recoil/studyAtoms";
import { locationState } from "../../../recoil/userAtoms";
import { IStudy } from "../../../types/study/study";

interface IStudySettingParticipations {
  setParticipations: React.Dispatch<SetStateAction<IStudy[]>>;
}

function StudySettingParticipations({
  setParticipations,
}: IStudySettingParticipations) {
  const typeErrorToast = useTypeErrorToast();

  const setStudyState = useSetRecoilState(studyState);
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(locationState);
  const [isRefetch, setIsRefetch] = useRecoilState(isRefetchStudyState);



 

  return null;
}

export default StudySettingParticipations;
