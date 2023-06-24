import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SetStateAction, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { VOTE_END_HOUR, VOTE_START_HOUR } from "../../../constants/study";
import { useFailToast } from "../../../hooks/ui/CustomToast";
import { useVoteQuery } from "../../../hooks/vote/queries";
import { getInterestingDate } from "../../../libs/utils/dateUtils";
import { IStudySpaceData } from "../../../pages/about/[date]/[studySpace]";
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
  const failToast = useFailToast({ type: "loadStudy" });
  const { data: session } = useSession();
  const voteDate = dayjs(router.query.date as string);
  const spaceID = router.query.studySpace;
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

  const { refetch } = useVoteQuery(voteDate, location, {
    onSuccess: handleSuccess,
    onError: failToast,
  });

  useEffect(() => {
    if (isRefetchingStudySpace) {
      refetch();
      setIsRefetchingStudySpace(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchingStudySpace]);

  useEffect(() => {
    setVoteDate(voteDate);

    const voteDateNum = +voteDate.format("MDD");
    const defaultDate = +getInterestingDate().format("MDD");
    const isPassed =
      dayjs().hour() >= VOTE_START_HOUR && dayjs().hour() <= VOTE_END_HOUR
        ? voteDateNum < +getInterestingDate().subtract(1, "day").format("MDD")
        : voteDateNum < defaultDate;
    const isToday =
      dayjs().hour() >= VOTE_END_HOUR
        ? voteDateNum <= defaultDate
        : dayjs().hour() >= VOTE_START_HOUR
        ? +voteDate.add(1, "day").format("MDD") <= defaultDate
        : voteDateNum === defaultDate;

    if (isPassed) setStudyDate("passed");
    else if (isToday) setStudyDate("today");
    else setStudyDate("not passed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  return null;
}

export default StudySpaceSetting;
