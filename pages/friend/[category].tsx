import styled from "styled-components";
import { useRouter } from "next/router";
import Header from "../../components/layouts/Header";
import { FRIEND_RECOMMEND_CATEGORY } from "../../storage/friend";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import safeJsonStringify from "safe-json-stringify";
import dbConnect from "../../libs/dbConnect";
import { User } from "../../models/user";
import { useState, useEffect } from "react";
import { IUser } from "../../types/user";
import {
  Flex,
  Avatar,
  Box,
  Heading,
  IconButton,
  Text,
  Button,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa0 } from "@fortawesome/free-solid-svg-icons";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/card";
import ProfileIconMd from "../../components/common/Profile/ProfileIconMd";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import ProfileIconSm from "../../components/common/Profile/ProfileIconSm";
import { birthToAge } from "../../libs/utils/membersUtil";

function FriendCategory({ membersListAll }: { membersListAll: IUser[] }) {
  const router = useRouter();
  const idx = Number(router.query?.category);
  console.log(membersListAll);
  const [filterMember, setFilterMember] = useState<IUser[]>([]);

  const { data, isLoading } = useUserInfoQuery();

  useEffect(() => {
    if (!isLoading) {
      if (idx === 0)
        setFilterMember(
          membersListAll?.filter(
            (who) =>
              +birthToAge(who?.birth) <= +birthToAge(data?.birth) + 1 &&
              +birthToAge(who?.birth) >= +birthToAge(data?.birth) - 1
          )
        );
      if (idx === 1)
        setFilterMember(
          membersListAll?.filter(
            (who) =>
              who?.mbti === data?.mbti && who?.location === data?.location
          )
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  console.log(filterMember);
  return (
    <>
      <Header title={FRIEND_RECOMMEND_CATEGORY[idx]} url="/friend" />
      <Layout>
        {filterMember?.map((who) => (
          <Card
            key={who?.id}
            border="2px solid var(--font-h6)"
            borderRadius="var(--border-radius)"
            padding="6px"
          >
            <CardHeader>
              <Flex>
                <Flex flex="1" gap="4" alignItems="center">
                  <Avatar name={who?.name} src={who?.profileImage} />
                  <Box fontWeight="600">{who?.name}</Box>
                </Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                  icon={<FontAwesomeIcon icon={faHeart} size="lg" />}
                />
              </Flex>
            </CardHeader>
            <CardBody>
              <Text></Text>
            </CardBody>

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <Flex
                direction="column"
                mt="12px"
                fontSize="13px"
                color="var(--font-h2)"
                lineHeight="2"
              >
                <span>
                  <span>{birthToAge(who?.birth)}</span>{" "}
                </span>
                <span>
                  <span>{who?.gender.slice(0, 1)}</span>
                </span>
                <span>
                  <span>{who?.mbti}</span>
                </span>
                <span>
                  전공: <span>컴퓨터/통신</span>
                </span>
                <span>
                  관심사: <span>1. 코딩 2. 독서</span>
                </span>
              </Flex>
            </CardFooter>
          </Card>
        ))}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  padding: 14px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

export default FriendCategory;

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

  const user = await User.find();
  const filterUser = user?.filter((who) => who?.isActive);
  const membersListAll = JSON.parse(safeJsonStringify(filterUser));

  return { props: { membersListAll } };
};
