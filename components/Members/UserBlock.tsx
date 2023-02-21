import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { birthToAge, nameToKr } from "../../libs/utils/membersUtil";
import { IUserBlock } from "../../models/members";
import { IUser } from "../../models/user";
import {
  categoryState,
  isShowMemberInfoState,
} from "../../recoil/membersAtoms";
import { modalContextState } from "../../recoil/modalAtoms";

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

export default function UserBlock({ userInfo }: IUserBlock) {
  const setIsShowMemberInfo = useSetRecoilState(isShowMemberInfoState);
  const setModalContext = useSetRecoilState(modalContextState);
  const [content, setContent] = useState("");
  const category = useRecoilValue(categoryState);

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
    const name = category.name;
    let categoryContent = userInfo[name];
    console.log(56, categoryContent);
    if (name === "birth") {
      setContent(birthToAge(categoryContent));
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
