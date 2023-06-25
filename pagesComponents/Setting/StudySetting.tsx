import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { VOTE_END_HOUR } from "../../constants/study";
import { getInterestingDate } from "../../libs/utils/dateUtils";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import {
  attendCheckState,
  mySpaceFixedState,
  studyDateState,
  voteDateState,
} from "../../recoil/studyAtoms";

import { IParticipation } from "../../types/studyDetails";

function StudySetting({
  participations,
  setMyVoteList,
}: {
  participations: IParticipation[];
  setMyVoteList: React.Dispatch<SetStateAction<string[]>>;
}) {
  const { data: session } = useSession();
  const voteDate = useRecoilValue(voteDateState);

  const setMySpaceFixed = useSetRecoilState(mySpaceFixedState);
  const setStudyDate = useSetRecoilState(studyDateState);
  const setIsCheck = useSetRecoilState(attendCheckState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  useEffect(() => {
    setMyVoteList([]);
    setMySpaceFixed(null);
    setIsCheck(false);

    const setInitialInfo = async (participations: IParticipation[]) => {
      await Promise.all(
        participations?.map((space) => {
          let isVote = false;
          space?.attendences?.forEach((who) => {
            if (who.user?.uid === session?.uid) {
              if (space.status === "open") {
                setMySpaceFixed(space);
                if (who?.arrived) setIsCheck(true);
              }
              isVote = true;
            }
          });
          if (isVote) setMyVoteList((old) => [...old, space.place._id]);
        })
      );
    };
    setInitialInfo(participations);

    const voteDateNum = +voteDate.format("MDD");
    const defaultDate = +getInterestingDate().format("MDD");
    if (
      dayjs().hour() >= 14 && dayjs().hour() < 23
        ? voteDateNum < +getInterestingDate().subtract(1, "day").format("MDD")
        : voteDateNum < defaultDate
    )
      setStudyDate("passed");
    else if (
      dayjs().hour() >= VOTE_END_HOUR
        ? voteDateNum <= defaultDate
        : dayjs().hour() >= 14
        ? +voteDate.add(1, "day").format("MDD") <= defaultDate
        : voteDateNum === defaultDate
    )
      setStudyDate("today");
    else setStudyDate("not passed");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participations]);

  return null;
}

export default StudySetting;
