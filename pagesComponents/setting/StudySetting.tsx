import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MY_TODAY_STUDY_FIXED } from "../../constants/keys/localStorage";
import { LOCATION_OPEN } from "../../constants/location";
import { dayjsToStr } from "../../helpers/dateHelpers";
import { arrangeSpace } from "../../helpers/studyHelpers";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useStudyResultDecideMutation } from "../../hooks/study/mutations";
import { useStudyVoteQuery } from "../../hooks/study/queries";
import {
  isVotingState,
  myStudyFixedState,
  participationsState,
  studyDateStatusState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { locationState } from "../../recoil/userAtoms";
import { IParticipation } from "../../types/study/studyDetail";

function StudySetting() {
  const { data: session } = useSession();
  const typeErrorToast = useTypeErrorToast();

  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(locationState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);

  const setIsVoting = useSetRecoilState(isVotingState);
  const [participations, setParticipations] =
    useRecoilState(participationsState);
  const setMySpaceFixed = useSetRecoilState(myStudyFixedState);

  const { mutateAsync: decideSpace } = useStudyResultDecideMutation(
    dayjs().add(1, "day"),
    {
      onSuccess() {
        refetch();
      },
    }
  );
  useEffect(() => {
    const hasStudyDecision =
      participations?.[0]?.status === "pending" && studyDateStatus === "today";

    if (hasStudyDecision) decideSpace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participations, studyDateStatus]);

  //스터디 데이터 가져오기
  const { data: studyVoteData, refetch } = useStudyVoteQuery(
    voteDate,
    location,
    {
      enabled: !!voteDate && LOCATION_OPEN.includes(location),
      onError: (e) => typeErrorToast(e, "study"),
    }
  );

  useEffect(() => {
    if (studyVoteData) {
      const participations = studyVoteData.participations;
      setParticipations(arrangeSpace(participations));
      setMyStudySpace(participations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyVoteData]);

  //내 스터디 확인
  const setMyStudySpace = (participations: IParticipation[]) => {
    let isCheckMyVote = false;
    participations.forEach((participation) => {
      participation.attendences.forEach((who) => {
        if (who?.user?.uid === session?.uid) {
          isCheckMyVote = true;
          if (["open", "free"].includes(participation.status)) {
            setMySpaceFixed(participation);
            if (studyDateStatus === "today") {
              localStorage.setItem(MY_TODAY_STUDY_FIXED, dayjsToStr(dayjs()));
            }
          }
        }
      });
    });
    setIsVoting(isCheckMyVote);
  };

  return null;
}

export default StudySetting;
