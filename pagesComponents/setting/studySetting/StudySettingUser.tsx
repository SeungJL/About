import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { mySpaceFixedState } from "../../../recoil/studyAtoms";
import { IParticipation } from "../../../types/study/study";

interface IStudySettingUser {
  participations: IParticipation[];
}

function StudySettingUser({ participations }: IStudySettingUser) {
  const { data: session } = useSession();

  const setMySpaceFixed = useSetRecoilState(mySpaceFixedState);

  const setInitialInfo = (participations: IParticipation[]) => {
    participations.forEach((participation) => {
      participation.attendences.forEach((who) => {
        if (
          who.user.uid === session.uid &&
          ["open", "free"].includes(participation.status)
        ) {
          setMySpaceFixed(participation);
        }
      });
    });
  };

  useEffect(() => {
    if (!participations) return;
    setMySpaceFixed(null);
    setInitialInfo(participations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participations]);

  return null;
}

export default StudySettingUser;
