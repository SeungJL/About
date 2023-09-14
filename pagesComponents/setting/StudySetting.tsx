import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { arrangeSpace } from "../../helpers/studyHelpers";
import { useTypeErrorToast } from "../../hooks/CustomToast";
import { useStudyResultDecideMutation } from "../../hooks/study/mutations";
import { useStudyVoteQuery } from "../../hooks/study/queries";
import { isRefetchStudyState } from "../../recoil/refetchingAtoms";
import {
  myStudyFixedState,
  participationsState,
  studyDateStatusState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { locationState } from "../../recoil/userAtoms";
import { IStudy } from "../../types/study/study";

function StudySetting() {
  const { data: session } = useSession();
  const typeErrorToast = useTypeErrorToast();

  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(locationState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);

  const setStudyInfos = useSetRecoilState(participationsState);
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
  const setMyStudySpace = (participations: IStudy[]) => {
    setMySpaceFixed(null);
    participations.forEach((participation) => {
      participation.attendences.forEach((who) => {
        if (!who.user) return;
        if (
          who.user.uid === session?.uid &&
          ["open", "free"].includes(participation.status)
        )
          setMySpaceFixed(participation);
      });
    });
  };

  //스터디 데이터 가져오기
  const { refetch } = useStudyVoteQuery(voteDate, location, {
    enabled: !!voteDate && !!location,
    onSuccess(data) {
      const participations = data.participations;
      setStudyInfos(arrangeSpace(participations));
      setMyStudySpace(participations);
      if (participations[0].status === "pending") setDecideStudy();
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

  // const setStudyStartTime = useSetRecoilState(studyStartTimeState);

  // useStudyStartTimeQuery(voteDate, {
  //   onSuccess(data) {
  //     console.log(data);
  //     setStudyStartTime(data);
  //   },
  // });

  return <>{/* <StudySettingUser participations={participations} /> */}</>;
}

export default StudySetting;
