import { useSession } from "next-auth/react";
import { SetStateAction, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  attendCheckState,
  mySpaceFixedState,
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participations]);

  return null;
}

export default StudySetting;
