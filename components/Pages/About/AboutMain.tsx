import { useToast } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useVoteQuery } from "../../../hooks/vote/queries";
import {
  isStudyOpenState,
  isUserAttendState,
  isVotingState,
  studyDateState,
  voteDateState,
} from "../../../recoil/studyAtoms";
import AboutMainHeader from "./main/AboutMainHeader";
import AboutMainItem from "./main/AboutMainItem";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { VOTE_END_HOUR } from "../../../constants/system";
import axios from "axios";
import { getInterestingDate } from "../../../libs/utils/dateUtils";
import { IUser, User } from "../../../models/user";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import dbConnect from "../../../libs/dbConnect";
import safeJsonStringify from "safe-json-stringify";
import { isMember } from "../../../libs/utils/authUtils";

function AboutMain() {
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const { data: session } = useSession();
  const toast = useToast();
  const setIsVoting = useSetRecoilState(isVotingState);
  const setStudyDate = useSetRecoilState(studyDateState);
  const setStudyOpen = useSetRecoilState(isStudyOpenState);
  const setIsUserAttend = useSetRecoilState(isUserAttendState);

  const temp = ["A", "B", "C", "D"];

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
  useEffect(() => {
    if (dayjs().hour() >= VOTE_END_HOUR) {
      const targetDate = dayjs().add(1, "day").format("YYYY-MM-DD");
      axios.patch(`/api/admin/vote/${targetDate}/status/confirm`);
    }
  }, []);
  useEffect(() => {
    setIsVoting(false);
    setStudyOpen(false);

    const voteDateKr = voteDate.format("MMDDHH");
    const interesingDateKr = getInterestingDate().format("MMDDHH");
    if (voteDateKr === interesingDateKr) setStudyDate("default");
    else if (voteDateKr < interesingDateKr) setStudyDate("passed");
    else if (voteDateKr > interesingDateKr) setStudyDate("not passed");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate]);

  useEffect(() => {
    vote?.participations.flatMap((participant) => {
      const studyStatus = participant.status === "open" ? true : false;
      if (
        participant.attendences.find(
          (att) => (att.user as IUser)?.uid === session?.uid
        )
      ) {
        setIsVoting(true);
        studyStatus && setIsUserAttend(true);
      }
      studyStatus && setStudyOpen(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteDate, vote, isLoading]);

  return (
    <Layout>
      <AboutMainHeader />
      <Main>
        {temp.map((info, idx) => (
          <Block key={idx}>
            <AboutMainItem />
          </Block>
        ))}
      </Main>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 24px 16px;
`;

const Main = styled.main``;

const Block = styled.div``;

export default AboutMain;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//       props: {},
//     };
//   }

//   await dbConnect();

//   const userData = await User.findOne({ uid: session.uid });
//   const user = JSON.parse(safeJsonStringify(userData));
//   if (!isMember(user?.role)) {
//     if (session.role !== user?.role) {
//       context.res.setHeader("Set-Cookie", "next-auth.session-token=deleted");

//       return {
//         redirect: {
//           permanent: false,
//           destination: "/login?force_signout=true",
//         },
//       };
//     } else {
//       return {
//         redirect: {
//           permanent: false,
//           destination: "/forbidden",
//         },
//       };
//     }
//   }
//   return { props: {} };
// };
