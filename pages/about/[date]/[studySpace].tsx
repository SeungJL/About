import styled from "styled-components";
import dayjs from "dayjs";
import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import StudySpaceNavigation from "../../../pagesComponents/About/studySpace/StudySpaceNavigation";
import StudySpaceCover from "../../../pagesComponents/About/studySpace/StudySpaceCover";
import StudySpaceHeader from "../../../pagesComponents/About/studySpace/StudySpaceHeader";

import StudyTimeTable from "../../../pagesComponents/About/studySpace/StudySpaceTable";

import { useVoteQuery } from "../../../hooks/vote/queries";

import { IAttendence } from "../../../types/studyDetails";
import { IUser } from "../../../types/user";
import { VOTE_END_HOUR } from "../../../constants/study";
import { Location } from "../../../types/system";
import { useEffect, useState } from "react";
import VoteSuccessModal from "../../../pagesComponents/About/studySpace/VoteSuccessModal";
import ModalPortal from "../../../components/ModalPortal";
import StudySpaceVoteOverview from "../../../pagesComponents/About/studySpace/SpaceSpaceVoteOverview";
import StudySpaceOverview from "../../../pagesComponents/About/studySpace/StudySpaceOverView";
import { useRecoilState } from "recoil";
import { studyDateState } from "../../../recoil/studyAtoms";
import { getInterestingDate } from "../../../libs/utils/dateUtils";
import { SPACE_LOCATION } from "../../../storage/study";

function StudySpace() {
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const spaceID = router.query.studySpace;
  const voteDate = dayjs(router.query.date as string);
  const location = SPACE_LOCATION[spaceID as string];
  const [studyDate, setStudyDate] = useRecoilState(studyDateState);
  const { data: vote, isLoading } = useVoteQuery(voteDate, location, {
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
              voteCnt={attendences.length}
            />
            <StudyTimeTable attendances={attendences} />
            <StudySpaceNavigation
              myVote={myVote as IAttendence}
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
