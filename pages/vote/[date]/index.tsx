import {
  Box,
  Button,
  Container,
  HStack,
  Skeleton,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useQueryClient } from "react-query";
import BarChart from "../../../components/chart/barChart";
import FireIcon from "../../../components/icon/fireIcon";
import { useAbsentMutation } from "../../../hooks/vote/mutations";
import { useVoteQuery } from "../../../hooks/vote/queries";
import { isMember } from "../../../libs/utils/authUtils";
import { getInterestingDate, strToDate } from "../../../libs/utils/dateUtils";
import dbConnect from "../../../libs/dbConnect";
import { VOTE_GET } from "../../../libs/queryKeys";
import { IUser, User } from "../../../models/user";
import VoteModal from "../../../components/voteModal";
import DateTitle from "../../../components/dateTitle";

const Main: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const date = strToDate(router.query.date as string);

  const {
    isOpen: isVoteModalOpen,
    onOpen: onVoteModalOpen,
    onClose: onVoteModalClose,
  } = useDisclosure();

  const {
    data: vote,
    isLoading,
    isFetching,
  } = useVoteQuery(date, {
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

  const { mutate: handleAbsent, isLoading: absentLoading } = useAbsentMutation(
    date,
    {
      onSuccess: async () => queryClient.invalidateQueries([VOTE_GET, date]),
      onError: (err) => {
        toast({
          title: "오류",
          description: "참여 취소 신청 중 문제가 발생했어요.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      },
    }
  );

  const isAttending =
    vote?.participations
      ?.flatMap((participant) =>
        participant.attendences.map((a) => (a.user as IUser).uid)
      )
      ?.some((userId) => userId === session?.uid?.toString()) || false;

  // tmp / for test

  // const attendDTO = {
  //   place: '62b7e654f1dcc41a72e12468',
  //   start: new Date(),
  //   end: new Date(),
  //   confirmed: false,
  //   anonymity: false,
  // } as AttendDTO

  // handleAttend(attendDTO)

  return (
    <>
      <Container>
        <DateTitle today={date} mode="vote" />
        <HStack padding="0" alignItems="stretch" justifyContent="space-around">
          <Skeleton isLoaded={!isLoading}>
            {vote && <BarChart participations={vote.participations} />}
          </Skeleton>
          <VStack flex="1">
            <Skeleton isLoaded={!isLoading} width="100%">
              {vote && (
                <Button
                  width="100%"
                  height="250px"
                  borderRadius="5px"
                  variant="solid"
                  disabled={vote.participations.every(
                    (p) => p.status !== "pending"
                  )}
                  onClick={
                    isAttending ? () => handleAbsent() : () => onVoteModalOpen()
                  }
                  isLoading={absentLoading}
                >
                  <VStack>
                    <Box>
                      <FireIcon color="green" />
                    </Box>
                    <Text fontSize="2xl">
                      {isAttending ? "참여취소" : "참여하기"}
                    </Text>
                  </VStack>
                </Button>
              )}
            </Skeleton>
            <NextLink
              href={`/vote/${date.format("YYYY-MM-DD")}/result/summary`}
            >
              <Button width="100%" size="lg" flex="1">
                투표현황
              </Button>
            </NextLink>
          </VStack>
        </HStack>
      </Container>
      {isVoteModalOpen && (
        <VoteModal
          isOpen={isVoteModalOpen}
          onClose={onVoteModalClose}
          participations={vote.participations}
          date={date}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  await dbConnect();

  const user = await User.findOne({ uid: session.uid });

  if (!isMember(user?.role)) {
    if (session.role !== user?.role) {
      context.res.setHeader("Set-Cookie", "next-auth.session-token=deleted");

      return {
        redirect: {
          permanent: false,
          destination: "/login?force_signout=true",
        },
      };
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/forbidden",
        },
      };
    }
  }

  const dateStr = context.params.date as string;

  const dayjsDate = strToDate(dateStr);
  const interestingDate = getInterestingDate();

  if (!dayjsDate.isValid()) {
    return {
      redirect: {
        permanent: false,
        destination: `/vote/${interestingDate.format("YYYY-MM-DD")}`,
      },
      props: {},
    };
  }

  if (dayjsDate > interestingDate.add(2, "day")) {
    return {
      redirect: {
        permanent: false,
        destination: `/vote/${interestingDate.format("YYYY-MM-DD")}`,
      },
      props: {},
    };
  }

  return { props: {} };
};

export default Main;
