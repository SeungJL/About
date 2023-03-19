import { useToast } from "@chakra-ui/react";
import {
  faClock,
  faLocation,
  faLocationDot,
  faUserGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SP } from "next/dist/shared/lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/common/Header";
import SpaceVoteOverView from "../../components/Pages/About/studySpace/SpaceVoteOverview";

import StudySpaceCover from "../../components/Pages/About/studySpace/StudySpaceCover";
import StudySpaceHeader from "../../components/Pages/About/studySpace/StudySpaceHeader";
import StudySpaceOverView from "../../components/Pages/About/studySpace/StudySpaceOverView";
import StudyTimeTable from "../../components/Pages/About/studySpace/StudyTimeTable";
import { useVoteQuery } from "../../hooks/vote/queries";

import { voteDateState } from "../../recoil/studyAtoms";

function StudySpace() {
  const router = useRouter();
  const spaceID = router.query.studySpace;
  const toast = useToast();
  const voteDate = useRecoilValue(voteDateState);
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

  const spaceStudyInfo = vote?.participations.find(
    (props) => props.place._id === spaceID
  );
  console.log(spaceStudyInfo);
  const name = spaceStudyInfo?.place.brand;

  return (
    <>
      <StudySpaceHeader title={!isLoading ? name : ""} />
      <Layout>
        {!isLoading && <StudySpaceCover src={spaceStudyInfo?.place.image} />}
        <StudySpaceOverView space={spaceStudyInfo?.place} />
        <HrDiv />
        <SpaceVoteOverView date={!isLoading && voteDate} />
        <StudyTimeTable />
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
