import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { useVoteQuery } from "../../../hooks/vote/queries";
import SpaceVoteOverView from "../../../pagesComponents/About/studySpace/SpaceVoteOverview";
import StudyNavigation from "../../../pagesComponents/About/studySpace/StudyNavigation";
import StudySpaceCover from "../../../pagesComponents/About/studySpace/StudySpaceCover";
import StudySpaceHeader from "../../../pagesComponents/About/studySpace/StudySpaceHeader";
import StudySpaceOverView from "../../../pagesComponents/About/studySpace/StudySpaceOverView";
import StudyTimeTable from "../../../pagesComponents/About/studySpace/studyTimeTable";
import { IPlaceStatus } from "../../../types/statistics";
import { IAttendence } from "../../../types/studyDetails";
import { IUser } from "../../../types/user";

function StudySpace() {
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const spaceID = router.query.studySpace;
  const voteDate = dayjs(router.query.date as string);

  const { data: vote, isLoading } = useVoteQuery(voteDate, {
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
  console.log(24, vote?.participations);
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
            <StudySpaceOverView space={place} />
            <HrDiv />
            <SpaceVoteOverView date={voteDate} voteCnt={attendences.length} />
            <StudyTimeTable attendances={attendences} />
            <StudyNavigation
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
