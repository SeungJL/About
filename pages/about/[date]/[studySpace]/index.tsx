import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { VOTE_END_HOUR } from "../../../../constants/study";
import { useVoteQuery } from "../../../../hooks/vote/queries";
import { getInterestingDate } from "../../../../libs/utils/dateUtils";
import StudySpaceVoteOverview from "../../../../pagesComponents/About/studySpace/SpaceSpaceVoteOverview";
import StudySpaceCover from "../../../../pagesComponents/About/studySpace/StudySpaceCover";
import StudySpaceHeader from "../../../../pagesComponents/About/studySpace/StudySpaceHeader";
import StudySpaceNavigation from "../../../../pagesComponents/About/studySpace/StudySpaceNavigation";
import StudySpaceOverview from "../../../../pagesComponents/About/studySpace/StudySpaceOverView";
import StudyTimeTable from "../../../../pagesComponents/About/studySpace/StudySpaceTable";
import { isRefetchingStudyDetailState } from "../../../../recoil/refetchingAtoms";
import {
  isVotingState,
  studyDateState,
  voteDateState,
} from "../../../../recoil/studyAtoms";

import { SPACE_LOCATION } from "../../../../storage/study";
import { IAttendance } from "../../../../types/studyDetails";
import { IUser } from "../../../../types/user";

function StudySpace() {
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const voteDate = dayjs(router.query.date as string);
  const setVoteDate = useSetRecoilState(voteDateState);
  const spaceID = router.query.studySpace;
  const location = SPACE_LOCATION[spaceID as string];
  const setIsVoting = useSetRecoilState(isVotingState);
  const [updateStudySub, setUpdateStudySub] = useRecoilState(
    isRefetchingStudyDetailState
  );

  const [studyDate, setStudyDate] = useRecoilState(studyDateState);
  const {
    data: vote,
    isLoading,
    refetch,
  } = useVoteQuery(voteDate, location, {
    enabled: true,
    onError: (err) => {
      toast({
        title: "불러오기 실패",
        description: "투표 정보를 불러오지 못 했어요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  const { place, attendences, status } =
    vote?.participations?.find((props) => props.place._id === spaceID) || {};
 

  useEffect(() => {
    if (updateStudySub) {
      refetch();
      setUpdateStudySub(false);
    }
    if (attendences?.find((who) => who?.user.uid === session?.uid))
      setIsVoting(true);
    else setIsVoting(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendences, updateStudySub]);

  useEffect(() => {
    setVoteDate(voteDate);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  const myVote =
    attendences?.find((props) => (props.user as IUser).uid === session?.uid) ||
    {};

  return (
    <>
      <StudySpaceHeader title={place?.brand} place={place} />
      <Layout>
        {!isLoading && (
          <>
            <StudySpaceCover src={place?.image} />
            <StudySpaceOverview space={place} />
            <HrDiv />
            <StudySpaceVoteOverview
              date={voteDate}
              voteCnt={attendences?.length}
              place={place}
            />
            <StudyTimeTable attendances={attendences} />
            <StudySpaceNavigation
              myVote={myVote as IAttendance}
              place={place}
              status={status}
              voterCnt={attendences?.length}
            />
          </>
        )}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  padding: 0 16px;
`;

const HrDiv = styled.div`
  height: 8px;
  background-color: var(--font-h7);
`;

export default StudySpace;
