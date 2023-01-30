import {
  AspectRatio,
  Heading,
  useToast,
  Image,
  Text,
  HStack,
  Container,
  Box,
  Divider,
  Spinner,
  Tag,
  Button,
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProfileImage from "../../../../components/profileImage";
import { useVoteQuery } from "../../../../hooks/vote/queries";
import { isMember } from "../../../../libs/utils/authUtils";
import { strToDate } from "../../../../libs/utils/dateUtils";
import { IPlace } from "../../../../models/place";
import { IUser } from "../../../../models/user";
import DateTitle from "../../../../components/dateTitle";

export const statusMap = {
  pending: { value: "투표중", color: "gray" },
  waiting_confirm: { value: "결과확인중", color: "yellow" },
  open: { value: "OPEN", color: "green" },
  dismissed: { value: "CLOSED", color: "red" },
};

const SummaryResult: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const date = strToDate(router.query.date as string);

  const { data: vote, isLoading } = useVoteQuery(date, {
    onError: (err) => {
      toast({
        title: "오류",
        description: "데이터를 불러오는 중 문제가 생겼어요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <DateTitle today={date} mode="result" />
      {vote.participations.map((participation) => {
        const place = participation.place as IPlace;

        return (
          <Container key={place._id.toString()}>
            <HStack justifyContent="space-between">
              <HStack>
                <AspectRatio ratio={1 / 1} width="60px">
                  <Image
                    src={place.image}
                    alt={place.fullname}
                    borderRadius="15px"
                    borderStyle="solid"
                    borderWidth="3px"
                    borderColor="gray.200"
                  />
                </AspectRatio>
                <Heading as="h2" fontSize="lg">
                  {place.fullname}
                </Heading>
              </HStack>
              <Tag colorScheme={statusMap[participation.status].color}>
                {statusMap[participation.status].value}
              </Tag>
            </HStack>
            <Divider marginTop="10px" marginBottom="5px" />
            <HStack alignItems="center">
              <HStack
                spacing={1}
                justifyContent="start"
                minHeight="80px"
                overflowX="scroll"
                flex="8"
              >
                {participation.attendences.map((attendence) => {
                  const user = attendence.user as IUser;

                  return (
                    <Box key={user._id.toString()} width="45px" margin="4px 0">
                      <ProfileImage src={user.thumbnailImage} alt={user.name} />
                      <Text
                        fontSize="xs"
                        overflowX="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        textAlign="center"
                      >
                        {user.name}
                      </Text>
                    </Box>
                  );
                })}
              </HStack>
              <NextLink
                href={`/vote/${date.format(
                  "YYYY-MM-DD"
                )}/result/${place._id.toString()}`}
              >
                <Button flex="1" height="70">
                  결과
                </Button>
              </NextLink>
            </HStack>
          </Container>
        );
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login?from=/res",
      },
      props: {},
    };
  }

  if (!isMember(session.role as string)) {
    return {
      redirect: {
        permanent: false,
        destination: "/forbidden",
      },
    };
  }

  const rawDate = context.params.date as string;

  const dayjsDate = strToDate(rawDate);

  if (!dayjsDate.isValid()) {
    return {
      redirect: {
        permanent: false,
        destination: `/vote/${rawDate}`,
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};

export default SummaryResult;
