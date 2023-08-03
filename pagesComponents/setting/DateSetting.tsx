import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { STUDY_VOTE_START_HOUR, VOTER_DATE_END } from "../../constants/study";
import { getInterestingDate, getStudyDate } from "../../helpers/studyHelpers";
import { useStudyVoteQuery } from "../../hooks/study/queries";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { studyDateState, voteDateState } from "../../recoil/studyAtoms";
import { userLocationState } from "../../recoil/userAtoms";

function DateSetting() {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const location = useRecoilValue(userLocationState);
  const setStudyDate = useSetRecoilState(studyDateState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const [isDefaultPrev, setIsDefaultPrev] = useState(false);

  useStudyVoteQuery(dayjs(), location, {
    enabled: isDefaultPrev && voteDate === null,
    onSuccess(data) {
      const isMyVote = data.participations.some(
        (participation) =>
          participation.status === "open" &&
          participation.attendences.some(
            (who) => who.firstChoice && who.user.uid === session.uid
          )
      );
      if (isMyVote) setVoteDate(dayjs().startOf("day"));
      else setVoteDate(getInterestingDate());
    },
  });

  //최초 접속
  useEffect(() => {
    if (voteDate) return;
    const currentHour = dayjs().hour();
    if (STUDY_VOTE_START_HOUR <= currentHour && currentHour < VOTER_DATE_END) {
      if (isGuest) setVoteDate(dayjs());
      else setIsDefaultPrev(true);
    } else setVoteDate(getInterestingDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest]);

  //날짜
  useEffect(() => {
    setIsMainLoading(true);
    if (!voteDate) return;
    const studyDate = getStudyDate(voteDate);

    setStudyDate(studyDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  return null;
}

export default DateSetting;
