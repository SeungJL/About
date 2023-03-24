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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";

export default function UserOverView() {
  const { data: user } = useActiveQuery();
  const [value, setValue] = useState("안녕하세요! 잘 부탁드립니다~!");

  const inputRef = useRef<HTMLInputElement>(null);

  

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

  const handleWrite = () => {
    const input = inputRef.current;
    input.disabled = false;
    input.focus();
  };

  const onWrite = () => {
    const text = inputRef.current.value;

    setValue(text);
  };

  const handleSubmit = () => {
    axios.post("/api/user/comment", { comment: value });
  };

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
        <UserInfo>
          <UserProfile>
            <UserName>{user?.name}</UserName>
            <UserBadge role={user?.role} />
          </UserProfile>
          <Comment>
            <span>Comment</span>
            <div>
              <Message
                value={value}
                disabled={true}
                ref={inputRef}
                type="text"
                onBlur={handleSubmit}
                onChange={onWrite}
              />
              <div onClick={handleWrite}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
            </div>
          </Comment>
        </UserInfo>

        {/* <LogoutBlock>
          <button onClick={() => signOut()}>로그아웃</button>
        </LogoutBlock> */}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  height: 90px;
  padding: 4px 0px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
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
const UserInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  justify-content: space-between;
  > div:first-child {
    display: flex;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  > div:last-child {
    margin-bottom: 2px;
  }
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-right: 10px;
`;

const Comment = styled.div`
  padding: 2px 0 2px 6px;
  font-size: 12px;
  font-weight: 600;
  flex: 1;
  border: 1px solid var(--font-h5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;

    display: flex;
    align-items: center;
  }
`;

const Message = styled.input`
  font-weight: 400;
  color: var(--font-h2);
  width: 90%;

  font-size: 12px;
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
