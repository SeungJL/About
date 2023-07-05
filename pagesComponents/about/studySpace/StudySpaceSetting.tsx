import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SetStateAction, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import { useFailToast } from "../../../hooks/ui/CustomToast";
import { getStudyDate } from "../../../libs/studyDateSetting";
import { IStudySpaceData } from "../../../pages/about/[date]/[placeId]";
import { isRefetchingStudySpacelState } from "../../../recoil/refetchingAtoms";
import {
  isVotingState,
  studyDateState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import { SPACE_LOCATION } from "../../../storage/study";

interface IStudySpaceSetting {
  setStudySpaceData: React.Dispatch<SetStateAction<IStudySpaceData>>;
}

function StudySpaceSetting({ setStudySpaceData }: IStudySpaceSetting) {
  const router = useRouter();
  const failToast = useFailToast();
  const { data: session } = useSession();
  const voteDate = dayjs(router.query.date as string);
  const spaceID = router.query.placeId;
  const location = SPACE_LOCATION[spaceID as string];

  const setIsVoting = useSetRecoilState(isVotingState);
  const [isRefetchingStudySpace, setIsRefetchingStudySpace] = useRecoilState(
    isRefetchingStudySpacelState
  );
  const setVoteDate = useSetRecoilState(voteDateState);
  const setStudyDate = useSetRecoilState(studyDateState);

  const handleSuccess = (data) => {
    const studySpace = data.participations.find(
      (props) => props.place._id === spaceID
    );
    setStudySpaceData(studySpace);
    const isVoted = studySpace.attendences.find(
      (who) => who?.user.uid === session?.uid
    );
    setIsVoting(!!isVoted);
  };

  const { refetch } = useStudyVoteQuery(voteDate, location, {
    onSuccess: handleSuccess,
    onError() {
      failToast("loadStudy");
    },
  });

  useEffect(() => {
    if (isRefetchingStudySpace) {
      refetch();
      setIsRefetchingStudySpace(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchingStudySpace]);

  useEffect(() => {
    const studyDate = getStudyDate(voteDate);
    setStudyDate(studyDate);
    setVoteDate(voteDate); //global voteDate
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  return null;
}

export default StudySpaceSetting;
