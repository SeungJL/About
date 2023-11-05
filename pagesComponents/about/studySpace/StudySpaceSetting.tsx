import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SetStateAction, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTypeErrorToast } from "../../../hooks/CustomToast";
import { useStudyVoteQuery } from "../../../hooks/study/queries";

import { isRefetchStudySpaceState } from "../../../recoil/refetchingAtoms";
import { voteDateState } from "../../../recoil/studyAtoms";
import { PLACE_TO_LOCATION } from "../../../storage/study";
import { IParticipation, IVote } from "../../../types/study/studyDetail";

interface IStudySpaceSetting {
  participation: IParticipation;
  setParticipation: React.Dispatch<SetStateAction<IParticipation>>;
}

function StudySpaceSetting({
  participation,
  setParticipation,
}: IStudySpaceSetting) {
  const router = useRouter();
  const typeErrorToast = useTypeErrorToast();
  const { data: session } = useSession();

  const [isRefetchStudySpace, setIsRefetchStudySpace] = useRecoilState(
    isRefetchStudySpaceState
  );
  const setVoteDate = useSetRecoilState(voteDateState);

  const voteDate = dayjs(router.query.date as string);
  const placeId = router.query.placeId;
  const location = PLACE_TO_LOCATION[placeId as string];

  const handleSuccess = (data: IVote) => {
    if (!participation) handleDate();
    handleStudy(data);
  };

  //스터디 세팅
  const handleStudy = (data: IVote) => {
    const findParticipation = data.participations.find(
      (props) => props.place._id === placeId
    );

    setParticipation(findParticipation);
    const isVoted = findParticipation.attendences.find(
      (who) => who?.user.uid === session?.uid
    );
  };

  //날짜 세팅
  const handleDate = () => {
    setVoteDate(voteDate);
  };

  //url을 통해 접속해서 participation이 없는 경우 또는 refetch
  const { refetch } = useStudyVoteQuery(voteDate, location, {
    enabled: !participation,
    onSuccess: handleSuccess,
    onError: (e) => typeErrorToast(e, "study"),
  });

  //refetch
  useEffect(() => {
    if (isRefetchStudySpace) {
      setTimeout(() => {
        refetch();
        setIsRefetchStudySpace(false);
      }, 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchStudySpace]);

  return null;
}

export default StudySpaceSetting;
