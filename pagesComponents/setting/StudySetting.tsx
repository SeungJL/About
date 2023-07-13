import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { STUDY_VOTE_END_HOUR } from "../../constants/study";
import { useStudyResultDecideMutation } from "../../hooks/study/mutations";
import { useStudyStartTimeQuery } from "../../hooks/study/queries";
import {
  attendCheckState,
  mySpaceFixedState,
  studyStartTimeState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { IParticipation } from "../../types/studyDetails";

interface IStudySetting {
  participations: IParticipation[];
  setMyVoteList: React.Dispatch<SetStateAction<string[]>>;
}

function StudySetting({ participations, setMyVoteList }: IStudySetting) {
  const { data: session } = useSession();

  const voteDate = useRecoilValue(voteDateState);

  const setMySpaceFixed = useSetRecoilState(mySpaceFixedState);
  const setIsCheck = useSetRecoilState(attendCheckState);
  const setStudyStartTime = useSetRecoilState(studyStartTimeState);
  useStudyStartTimeQuery(voteDate, {
    enabled: !!voteDate,
    onSuccess(data) {
      setStudyStartTime(data);
    },
  });
  const { mutateAsync: decideSpace } = useStudyResultDecideMutation(
    dayjs().add(1, "day")
  );
  console.log(participations);
  useEffect(() => {
    if (participations.length === 0 || participations[0].status !== "pending")
      return;
    if (dayjs().hour() >= STUDY_VOTE_END_HOUR) decideSpace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              if (space.status === "open" || space.status === "free") {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participations]);

  return null;
}

export default StudySetting;
