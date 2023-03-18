import { signOut } from "next-auth/react";
import styled from "styled-components";

import { useActiveQuery } from "../../../hooks/user/queries";
import UserBadge from "../../block/UserBadge";
import { useSession } from "next-auth/react";
import { Badge, Spinner, useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { kakaoProfileInfo } from "../../../models/interface/kakaoProfileInfo";
import { RepeatIcon } from "@chakra-ui/icons";
import { IUser } from "../../../models/user";
import { useMutation } from "react-query";
import Image from "next/image";

export default function UserOverView() {
  const { data: user } = useActiveQuery();
  const toast = useToast();
  const { isLoading: isFetchingProfile, mutate: onUpdateProfile } = useMutation<
    kakaoProfileInfo,
    AxiosError
  >(
    "updateProfile",
    async () => {
      const res = await axios.patch("/api/user/profile");

      return res.data;
    },
    {
      onSuccess: (data: IUser) => {},
      onError: (error: AxiosError) => {
        console.error(error);
        toast({
          title: "업데이트 실패",
          description: "프로필 사진을 업데이트하려면 재로그인이 필요해요.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      },
    }
  );
  return (
    <>
      <Layout>
        <UserImg>
          <Profile>
            <Image
              width={80}
              height={80}
              alt="profile"
              src={`${user?.profileImage}`}
              unoptimized={true}
            />
          </Profile>
          <Badge
            position="absolute"
            width="25px"
            height="25px"
            bottom="-8px"
            borderRadius="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            right="-7px"
            cursor="pointer"
            onClick={() => onUpdateProfile()}
            zIndex="5"
          >
            {isFetchingProfile ? (
              <Spinner size="sm" />
            ) : (
              <RepeatIcon fontSize="lg" rotate="" />
            )}
          </Badge>
        </UserImg>
        <UserNameBlock>
          <UserName>{user?.name}</UserName>
          <UserBadge role={user?.role} />
        </UserNameBlock>

        <LogoutBlock>
          <button onClick={() => signOut()}>로그아웃</button>
        </LogoutBlock>
      </Layout>
      <Hr />
    </>
  );
}

const Layout = styled.div`
  height: 14vh;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const Profile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 24%;
  overflow: hidden;
`;

const UserImg = styled.div`
  border-radius: 30%;
  position: relative;
`;
const UserNameBlock = styled.div`
  width: 60px;
  margin-left: 3%;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 1.4em;
  margin-bottom: 5px;
`;

const LogoutBlock = styled.div`
  width: 60px;
  > button {
    width: 65px;
    height: 22px;
    border-radius: 6px;
    border: 1px solid rgb(0, 0, 0, 0.5);
  }
`;
const Hr = styled.div`
  width: 100vw;
  border-bottom: 1px solid rgb(0, 0, 0, 0.3);
`;
