import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IUser } from "../../models/user";
import { modalContextState } from "../../recoil/atoms";
import { isShowMemberInfoState } from "../../recoil/membersAtoms";

const UserBlockLayout = styled(motion.div)`
  background-color: lightgray;
  margin: 1px;
  display: grid;
  grid-template-rows: 1fr 4fr;
  border-radius: 10px;
  overflow: hidden;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div:first-child {
    background: var(--main-color);
    color: black;
  }
  > div:last-child {
  }
`;
const CategoryContent = styled.div`
  border-bottom: 1px solid rgb(0, 0, 0, 0.8);
  font-size: 0.9em;
`;

export default function UserBlock({ userInfo }: any) {
  const setIsShowMemberInfo = useSetRecoilState(isShowMemberInfoState);
  const setModalContext = useSetRecoilState(modalContextState);

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

  return (
    <UserBlockLayout layoutId={userInfo.id} onClick={onUserBlockClicked}>
      <div>회장</div>
      <CategoryContent>2022-10-24</CategoryContent>
      <div>이승주</div>
    </UserBlockLayout>
  );
}
