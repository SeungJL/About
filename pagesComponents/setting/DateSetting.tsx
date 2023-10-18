import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  STUDY_VOTE_START_HOUR,
  VOTER_DATE_END,
} from "../../constants/settingValue/study";
import { getCurrentDate, getCurrentHour } from "../../helpers/dateHelpers";

import { getInterestingDate, getStudyDate } from "../../helpers/studyHelpers";
import { useStudyVoteQuery } from "../../hooks/study/queries";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import {
  myStudyFixedState,
  participationsState,
  studyDateStatusState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { locationState } from "../../recoil/userAtoms";
import { IParticipation } from "../../types/study/studyDetail";

function DateSetting() {
  const { data: session } = useSession();
  const isGuest = session && session.user.name === "guest";

  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const location = useRecoilValue(locationState);
  const setStudyDateStatus = useSetRecoilState(studyDateStatusState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);
  const setMyStudyFixed = useSetRecoilState(myStudyFixedState);
  const setParticipations = useSetRecoilState(participationsState);

  const [isDefaultPrev, setIsDefaultPrev] = useState(false);

  const currentDate = getCurrentDate();

  // 최초 voteDate 설정
  useEffect(() => {
    if (voteDate || isGuest === undefined) return;
    const currentHour = getCurrentHour();
    if (STUDY_VOTE_START_HOUR <= currentHour && currentHour < VOTER_DATE_END) {
      if (isGuest) setVoteDate(currentDate);
      else setIsDefaultPrev(true);
    } else setVoteDate(getInterestingDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest]);

  //voteDate가 변경될 때 세팅
  useEffect(() => {
    setIsMainLoading(true);
    if (!voteDate) return;
    setMyStudyFixed(null);
    setParticipations(null);
    setStudyDateStatus(getStudyDate(voteDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  //오늘 스터디 참여자인지 판단
  useStudyVoteQuery(currentDate, location, {
    enabled: isDefaultPrev && !!location,
    onSuccess(data) {
      if (voteDate) return;
      const isMyVote = findMyVote(data.participations);
      if (isMyVote) setVoteDate(currentDate);
      else setVoteDate(getInterestingDate());
      setIsDefaultPrev(false);
    },
  });

  const findMyVote = (pars: IParticipation[]) => {
    const hasUserVoted = (who) =>
      who.user.uid === session.uid && who.firstChoice;
    return pars.some((par) => par.status === "open" && hasUserVoted(par));
  };

  return null;
}

export default DateSetting;
