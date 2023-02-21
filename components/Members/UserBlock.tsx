import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IUser } from "../../models/user";
import { modalContextState } from "../../recoil/atoms";
import { isShowMemberInfoState } from "../../recoil/membersAtoms";

const UserBlockLayout = styled(motion.div)`
  background-color: lightgray;
  margin: 1px;
  display: flex;
  flex-direction: column;

  border-radius: 10px;
  overflow: hidden;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div:first-child {
    background: #68d391;
    color: rgb(34, 84, 61);
    height: 25%;
  }
  > div:last-child {
    height: 25%;
  }
`;
const CategoryContent = styled.div`
  flex: 1;
  border-bottom: 1px solid rgb(0, 0, 0, 0.8);
  font-size: 0.9em;
`;

export default function UserBlock({ userInfo, category }: any) {
  const setIsShowMemberInfo = useSetRecoilState(isShowMemberInfoState);
  const setModalContext = useSetRecoilState(modalContextState);
  const [content, setContent] = useState("");
  const categoryName =
    category.name === "가입일"
      ? "registerDate"
      : category.name === "나이"
      ? "birth"
      : category.name === "성별"
      ? "gender"
      : category.name === "MBTI"
      ? "mbti"
      : "";

  const onUserBlockClicked = () => {
    setIsShowMemberInfo(true);
    setModalContext((old) =>
      Object.assign(
        {
          MembersInfoBg: {
            userInfo: userInfo,
          },
        },
        old
      )
    );
  };
  useEffect(() => {
    const categoryContent = userInfo[categoryName];
    if (categoryName === "birth") {
      const birthYear = categoryContent.slice(0, 2);
      if (birthYear < 50) setContent(String(24 - birthYear));
      else setContent(String(124 - birthYear));
    } else {
      setContent(categoryContent);
    }
  });

  const position = userInfo.role === "member" ? "일반회원" : "관리자";

  return (
    <UserBlockLayout layoutId={userInfo.id} onClick={onUserBlockClicked}>
      <div>{position}</div>
      <CategoryContent>{content}</CategoryContent>
      <div>{userInfo.name}</div>
    </UserBlockLayout>
  );
}
