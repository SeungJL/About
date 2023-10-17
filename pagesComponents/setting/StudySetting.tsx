import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { LOCATION_OPEN } from "../../constants/location";
import { arrangeSpace } from "../../helpers/studyHelpers";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useStudyResultDecideMutation } from "../../hooks/study/mutations";
import { useStudyVoteQuery } from "../../hooks/study/queries";
import { isRefetchStudyState } from "../../recoil/refetchingAtoms";
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
  const setParticipations = useSetRecoilState(participationsState);
  const setMySpaceFixed = useSetRecoilState(myStudyFixedState);
  const [isRefetch, setIsRefetch] = useRecoilState(isRefetchStudyState);

  //스터디 결과 알고리즘 적용
  const { mutateAsync: decideSpace } = useStudyResultDecideMutation(
    dayjs().add(1, "day")
  );
  const setDecideStudy = () => {
    if (studyDateStatus === "today") decideSpace();
  };

  //내 스터디 확인
  const setMyStudySpace = (participations: IParticipation[]) => {
    let isCheckMyVote = false;
    participations.forEach((participation) => {
      participation.attendences.forEach((who) => {
        if (!who.user) return;
        if (who.user.uid === session?.uid) {
          isCheckMyVote = true;
          if (["open", "free"].includes(participation.status))
            setMySpaceFixed(participation);
        }
      });
    });
    setIsVoting(isCheckMyVote);
  };

  //스터디 데이터 가져오기
  const { refetch, data: studyVoteData } = useStudyVoteQuery(
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
      if (
        studyDateStatus === "today" &&
        participations[0].status === "pending"
      ) {
        console.log(studyDateStatus, participations[0].status);
        setDecideStudy();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyVoteData]);

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

export default StudySetting;
