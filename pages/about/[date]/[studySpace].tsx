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
import { SPACE_LOCATION } from "../../../constants/study";
import { Location } from "../../../types/system";
import { useState } from "react";
import VoteSuccessModal from "../../../pagesComponents/About/studySpace/VoteSuccessModal";
import ModalPortal from "../../../components/ModalPortal";
import StudySpaceVoteOverview from "../../../pagesComponents/About/studySpace/SpaceSpaceVoteOverview";
import StudySpaceOverview from "../../../pagesComponents/About/studySpace/StudySpaceOverView";

function StudySpace() {
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const spaceID = router.query.studySpace;
  const voteDate = dayjs(router.query.date as string);

  const location = SPACE_LOCATION?.find(
    (space) => space.key === spaceID
  )?.value;

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

  const myVote =
    attendences?.find((props) => (props.user as IUser).uid === session?.uid) ||
    {};

  return (
    <>
      <StudySpaceHeader title={place?.brand} />
      <Layout>
        {!isLoading && (
          <>
            <StudySpaceCover src={place.image} />
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
