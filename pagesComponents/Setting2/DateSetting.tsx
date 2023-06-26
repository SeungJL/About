import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { VOTER_DATE_END, VOTE_START_HOUR } from "../../constants/study";
import { useFailToast } from "../../hooks/ui/CustomToast";
import { useVoteQuery } from "../../hooks/vote/queries";
import { getInterestingDate } from "../../libs/utils/dateUtils";
import { arrangeSpace } from "../../libs/utils/studyUtils";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { isRefetchingStudyState } from "../../recoil/refetchingAtoms";

import { voteDateState } from "../../recoil/studyAtoms";

import { userLocationState } from "../../recoil/userAtoms";
import { IParticipation } from "../../types/studyDetails";
import { IUser } from "../../types/user";

function DateSetting({
  setParticipations,
}: {
  setParticipations: React.Dispatch<SetStateAction<IParticipation[]>>;
}) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const failToast = useFailToast();

  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const location = useRecoilValue(userLocationState);
  const [updateStudy, setUpdateStudy] = useRecoilState(isRefetchingStudyState);

  const [isDefaultPrev, setIsDefaultPrev] = useState(false);

  const current = dayjs().hour();

  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  useEffect(() => {
    setIsMainLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  const { refetch } = useVoteQuery(voteDate, location, {
    enabled: voteDate !== null,
    onSuccess(data) {
      const temp: IParticipation[] = arrangeSpace(data.participations);
      setParticipations(temp);
    },
    onError() {
      failToast("loadStudy");
    },
  });

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
      if (current >= VOTE_START_HOUR && current < VOTER_DATE_END)
        setIsDefaultPrev(true);
      else setVoteDate(getInterestingDate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest]);

  useVoteQuery(getInterestingDate().subtract(1, "day"), location, {
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
  return null;
}

export default DateSetting;
