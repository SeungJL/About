import { useToast } from "@chakra-ui/react";
import {
  faClock,
  faLocation,
  faLocationDot,
  faUserGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { SP } from "next/dist/shared/lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../../components/common/Header";
import SpaceVoteOverView from "../../../components/Pages/About/studySpace/SpaceVoteOverview";
import StudyNavigation from "../../../components/Pages/About/studySpace/StudyNavigation";

import StudySpaceCover from "../../../components/Pages/About/studySpace/StudySpaceCover";
import StudySpaceHeader from "../../../components/Pages/About/studySpace/StudySpaceHeader";
import StudySpaceOverView from "../../../components/Pages/About/studySpace/StudySpaceOverView";
import StudyTimeTable from "../../../components/Pages/About/studySpace/StudyTimeTable";
import CheckComment from "../../../components/Pages/About/studySpace/StudyTimeTable/CheckComment";
import { useVoteQuery } from "../../../hooks/vote/queries";
import { IUser } from "../../../models/user";
import { isTimeChangeState, isVotingState } from "../../../recoil/atoms";

function StudySpace() {
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const isVoting = useRecoilValue(isVotingState); //투표 취소를 누르자마자 업데이트 하기 위함
  const [isTimeChange, setIsTimeChange] = useRecoilState(isTimeChangeState);

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
  const participations = vote?.participations;

  useEffect(() => {
    setIsTimeChange(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeChange]);

  const spaceStudyInfo = participations.find(
    (props) => props.place._id === spaceID
  );

  const myVote = spaceStudyInfo?.attendences.find(
    (props) => (props.user as IUser).uid === session.uid
  );

  const place = spaceStudyInfo?.place;

  return (
    <>
      <StudySpaceHeader title={!isLoading ? place?.brand : ""} />
      <Layout>
        {!isLoading && (
          <>
            <StudySpaceCover src={place.image} />
            <StudySpaceOverView space={place} />
            <HrDiv />
            <SpaceVoteOverView
              date={voteDate}
              voteCnt={participations && participations.length}
            />
            <StudyTimeTable attendances={spaceStudyInfo?.attendences} />
            <StudyNavigation myVote={myVote} place={place} />
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
