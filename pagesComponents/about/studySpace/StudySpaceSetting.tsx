import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SetStateAction, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTypeErrorToast } from "../../../hooks/CustomToast";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import { getStudyDate } from "../../../libs/studyUtils";
import { IStudySpaceData } from "../../../pages/about/[date]/[placeId]";
import { isRefetchStudySpacelState } from "../../../recoil/refetchingAtoms";
import {
  isVotingState,
  myStudyFixedState,
  studyDateState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import { SPACE_LOCATION } from "../../../storage/study";
import { IVote } from "../../../types/study/study";

interface IStudySpaceSetting {
  setStudySpaceData: React.Dispatch<SetStateAction<IStudySpaceData>>;
}

function StudySpaceSetting({ setStudySpaceData }: IStudySpaceSetting) {
  const router = useRouter();
  const typeErrorToast = useTypeErrorToast();
  const { data: session } = useSession();

  const voteDate = dayjs(router.query.date as string);
  const spaceID = router.query.placeId;
  const location = SPACE_LOCATION[spaceID as string];

  const setIsVoting = useSetRecoilState(isVotingState);
  const [isRefetchStudySpace, setIsRefetchStudySpace] = useRecoilState(
    isRefetchStudySpacelState
  );
  const setVoteDate = useSetRecoilState(voteDateState);
  const setStudyDate = useSetRecoilState(studyDateState);
  const setMySpaceFixed = useSetRecoilState(myStudyFixedState);

  const handleSuccess = (data: IVote) => {
    const participation = data.participations.find(
      (props) => props.place._id === spaceID
    );
    const { place, attendences, status } = participation;
    setStudySpaceData({ place, attendences, status });
    const isVoted = attendences.find((who) => who?.user.uid === session?.uid);
    if (["open", "free"].includes(status)) setMySpaceFixed(participation);
    setIsVoting(!!isVoted);
  };

  const { refetch } = useStudyVoteQuery(voteDate, location, {
    onSuccess: handleSuccess,
    onError: (e) => typeErrorToast(e, "study"),
  });

  useEffect(() => {
    if (isRefetchStudySpace) {
      refetch();
      setIsRefetchStudySpace(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchStudySpace]);

  useEffect(() => {
    const studyDate = getStudyDate(voteDate);
    setStudyDate(studyDate);
    setVoteDate(voteDate); //global voteDate
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  return null;
}

export default StudySpaceSetting;
