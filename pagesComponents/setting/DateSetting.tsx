import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { STUDY_VOTE_START_HOUR, VOTER_DATE_END } from "../../constants/study";
import { useStudyVoteQuery } from "../../hooks/study/queries";
import { useFailToast } from "../../hooks/ui/CustomToast";
import { getStudyDate } from "../../libs/studyDateSetting";
import { getInterestingDate } from "../../libs/utils/dateUtils";
import { arrangeSpace } from "../../libs/utils/studyUtils";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { isRefetchStudyState } from "../../recoil/refetchingAtoms";

import { studyDateState, voteDateState } from "../../recoil/studyAtoms";

import { userLocationState } from "../../recoil/userAtoms";
import { IParticipation } from "../../types/studyDetails";
import { IUser } from "../../types/user";

interface IDateSetting {
  setParticipations: React.Dispatch<SetStateAction<IParticipation[]>>;
}

function DateSetting({ setParticipations }: IDateSetting) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const failToast = useFailToast();

  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const location = useRecoilValue(userLocationState);
  const [updateStudy, setUpdateStudy] = useRecoilState(isRefetchStudyState);
  const setStudyDate = useSetRecoilState(studyDateState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const [isDefaultPrev, setIsDefaultPrev] = useState(false);

  const current = dayjs().hour();
  const isVoteTime =
    current >= STUDY_VOTE_START_HOUR && current < VOTER_DATE_END;

  const { refetch } = useStudyVoteQuery(voteDate, location, {
    enabled: voteDate !== null,
    onSuccess(data) {
      const temp: IParticipation[] = arrangeSpace(data.participations);
      setParticipations(temp);
    },
    onError() {
      failToast("loadStudy");
    },
  });

  useStudyVoteQuery(getInterestingDate().subtract(1, "day"), location, {
    enabled: isDefaultPrev && voteDate === null,
    onSuccess(data) {
      if (
        isDefaultPrev &&
        voteDate === null &&
        data?.participations.length !== 0
      ) {
        if (
          data?.participations.some(
            (space) =>
              space?.status === "open" &&
              space?.attendences?.some(
                (who) =>
                  who.firstChoice && (who.user as IUser).uid === session?.uid
              )
          )
        )
          setVoteDate(dayjs());
        else setVoteDate(getInterestingDate());
      }
    },
  });

  //로딩
  useEffect(() => {
    setIsMainLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  //업데이트
  useEffect(() => {
    if (updateStudy) {
      setTimeout(() => {
        refetch();
        setUpdateStudy(false);
      }, 1000);
    }
  }, [refetch, setUpdateStudy, updateStudy]);

  //최초 접속
  useEffect(() => {
    if (isGuest) {
      if (dayjs().hour() >= 18) setVoteDate(getInterestingDate());
      else setVoteDate(dayjs());
      return;
    }
    if (voteDate === null) {
      if (isVoteTime) setIsDefaultPrev(true);
      else setVoteDate(getInterestingDate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest]);

  //날짜
  useEffect(() => {
    if (!voteDate) return;
    const studyDate = getStudyDate(voteDate);
    setStudyDate(studyDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  return null;
}

export default DateSetting;
