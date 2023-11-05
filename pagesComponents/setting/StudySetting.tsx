import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LOCATION_OPEN } from "../../constants/location";
import { arrangeSpace } from "../../helpers/studyHelpers";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useStudyResultDecideMutation } from "../../hooks/study/mutations";
import {
  useStudyStartTimeQuery,
  useStudyVoteQuery,
} from "../../hooks/study/queries";
import {
  participationsState,
  studyDateStatusState,
  studyStartTimeArrState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { locationState } from "../../recoil/userAtoms";

function StudySetting() {
  const typeErrorToast = useTypeErrorToast();

  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(locationState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const setStudyStartTimeArr = useSetRecoilState(studyStartTimeArrState);
  const setParticipations = useSetRecoilState(participationsState);

  const { data: studyVoteData, refetch } = useStudyVoteQuery(
    voteDate,
    location,
    {
      enabled: !!voteDate && LOCATION_OPEN.includes(location),
      onError: (e) => typeErrorToast(e, "study"),
    }
  );

  const { mutateAsync: decideSpace } = useStudyResultDecideMutation(
    dayjs().add(1, "day"),
    {
      onSuccess() {
        setTimeout(() => {
          refetch();
        }, 200);
      },
    }
  );

  useEffect(() => {
    if (!studyVoteData) return;
    const participations = studyVoteData.participations;
    if (participations[0].status === "pending" && studyDateStatus === "today") {
      decideSpace();
    }
    setParticipations(arrangeSpace(participations));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyVoteData]);

  useStudyStartTimeQuery(voteDate, {
    enabled: !!voteDate,
    onSuccess(data) {
      setStudyStartTimeArr(data);
    },
  });

  return null;
}
export default StudySetting;
