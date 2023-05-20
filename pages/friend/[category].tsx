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

import { birthToAge } from "../../libs/utils/membersUtil";
import dayjs from "dayjs";
import { birthToDayjs } from "../../libs/utils/dateUtils";
import ProfileIconCircle from "../../components/common/Profile/ProfileIconCircle";
import { userDataState } from "../../recoil/interactionAtoms";
import { useSetRecoilState } from "recoil";

function FriendCategory({ membersListAll }: { membersListAll: IUser[] }) {
  const router = useRouter();
  const idx = Number(router.query?.category);

  const [filterMember, setFilterMember] = useState<IUser[]>([]);

  const { data, isLoading } = useUserInfoQuery();

  const setUserData = useSetRecoilState(userDataState);

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

      if (idx === 2)
        setFilterMember(
          membersListAll?.filter((who) => {
            const birthDayjs = birthToDayjs(who.birth);

            return (
              birthDayjs.month() === dayjs().month() &&
              who?.location === data?.location
            );
          })
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onClickProfile = (user: IUser) => {
    setUserData(user);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <>
      <Header title={FRIEND_RECOMMEND_CATEGORY[idx]} url="/friend" />
      <Layout>
        {filterMember?.map((who) => (
          <Item key={who?.uid} onClick={() => onClickProfile(who)}>
            <ProfileHeader>
              <ProfileIconCircle user={who} />
              <span>{who?.name}</span>
            </ProfileHeader>

            <Info>
              <Detail>
                <span>나이</span>
                <span>{birthToAge(who?.birth)}</span>
                {idx === 2 && (
                  <Birthday>
                    / {birthToDayjs(who?.birth).format("M월 D일")}
                  </Birthday>
                )}
              </Detail>
              <Detail>
                <span>성별</span>
                <span>{who?.gender.slice(0, 1)}</span>
              </Detail>
              <Detail>
                <span>MBTI</span>
                <span>{who?.mbti || "생략"}</span>
              </Detail>
              <Detail>
                <span>전공</span>
                <span>컴퓨터/통신</span>
              </Detail>
            </Info>
          </Item>
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

const Item = styled.div`
  border: 1.5px solid var(--font-h6);
  border-radius: var(--border-radius);
  padding: 6px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-weight: 600;
    margin-left: 14px;
    font-size: 15px;
  }
`;

const Info = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  line-height: 2.2;
  padding-left: 4px;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  > span:first-child {
    display: inline-block;
    width: 50px;
    font-size: 13px;
    font-weight: 600;
    color: var(--font-h3);
  }
  > span:last-child {
    color: var(--font-h1);
    font-size: 14px;
  }
`;

const Birthday = styled.span`
  margin-left: 4px;
  font-weight: 600;
  color: var(--font-h1);
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
