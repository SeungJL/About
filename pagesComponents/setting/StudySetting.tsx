import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { getInterestingDate } from "../../libs/utils/dateUtils";
import {
  attendCheckState,
  isVotingState,
  mySpaceFixedState,
  studyDateState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { isMainLoadingState } from "../../recoil/systemAtoms";
import { IParticipation } from "../../types/studyDetails";

import { VOTE_END_HOUR } from "../../constants/study";
import { arrangeMainSpace } from "../../libs/utils/studyUtils";

function StudySetting({
  participations,
  setOtherStudySpaces,
  setMyVoteList,
}: {
  participations: IParticipation[];
  setOtherStudySpaces: React.Dispatch<SetStateAction<IParticipation[]>>;
  setMyVoteList: React.Dispatch<SetStateAction<string[]>>;
}) {
  const { data: session } = useSession();
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const [isVoting, setIsVoting] = useRecoilState(isVotingState);
  const [mySpaceFixed, setMySpaceFixed] = useRecoilState(mySpaceFixedState);
  const setStudyDate = useSetRecoilState(studyDateState);
  const setIsCheck = useSetRecoilState(attendCheckState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setMyVoteList([]);
    setMySpaceFixed(null);
    setIsVoting(false);
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
              setIsVoting(true);
              isVote = true;
            }
          });
          if (isVote) setMyVoteList((old) => [...old, space.place._id]);
        })
      );
      setIsMainLoading(false);
    };

    setInitialInfo(participations);
    const voteDateNum = +voteDate.format("MDD");
    const defaultDate = +getInterestingDate().format("MDD");
    if (
      dayjs().hour() >= 14 && dayjs().hour() < 23
        ? voteDateNum < +getInterestingDate().subtract(1, "day").format("MDD")
        : voteDateNum < defaultDate
    ) {
      setStudyDate("passed");
    } else if (
      dayjs().hour() >= VOTE_END_HOUR
        ? voteDateNum <= defaultDate
        : dayjs().hour() >= 14
        ? +voteDate.add(1, "day").format("MDD") <= defaultDate
        : voteDateNum === defaultDate
    )
      setStudyDate("today");
    else setStudyDate("not passed");
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participations, isVoting]);

  setOtherStudySpaces(
    arrangeMainSpace(participations?.filter((space) => space !== mySpaceFixed))
  );
  useEffect(() => {
    if (!isLoading) {
      setIsMainLoading(false);
      setIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);
  return <Layout></Layout>;
}

const Layout = styled.div``;

export default StudySetting;
