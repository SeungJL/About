import dayjs from "dayjs";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LOCATION_OPEN, LOCATION_RECRUITING } from "../../constants/location";
import { arrangeMainSpace } from "../../helpers/studyHelpers";
import { useTypeErrorToast } from "../../hooks/custom/CustomToast";
import { useStudyResultDecideMutation } from "../../hooks/study/mutations";
import {
  useStudyPlacesQuery,
  useStudyStartTimeQuery,
  useStudyVoteQuery,
} from "../../hooks/study/queries";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
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
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const { data: studyVoteData, refetch } = useStudyVoteQuery(
    voteDate,
    location,
    {
      enabled:
        !!voteDate &&
        LOCATION_OPEN.includes(location) &&
        !LOCATION_RECRUITING.includes(location),
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
    const participations = studyVoteData;

    if (
      participations?.length &&
      participations[0].status === "pending" &&
      studyDateStatus === "today" &&
      dayjs().hour() === 23
    ) {
      decideSpace();
    }
    const arrangedStudies = arrangeMainSpace(
      [...participations],
      studyDateStatus !== "not passed"
    );
    const filtered =
      studyDateStatus !== "not passed" || !voteDate.isSame(dayjs(), "day")
        ? arrangedStudies
        : arrangedStudies.filter((par) => par.place.brand !== "자유 신청");
    setParticipations(filtered);
    setIsMainLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyDateStatus, studyVoteData, voteDate]);

  useStudyStartTimeQuery(voteDate, {
    enabled: !!voteDate,
    onSuccess(data) {
      setStudyStartTimeArr(data);
    },
  });
  useStudyPlacesQuery(location);

  return null;
}
export default StudySetting;
