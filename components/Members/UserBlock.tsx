import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";

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

export default function UserBlock({ userInfo, onUserBlockClicked }) {
  return (
    <UserBlockLayout layoutId={userInfo.id + ""} onClick={onUserBlockClicked}>
      <div>회장</div>
      <CategoryContent>2022-10-24</CategoryContent>
      <div>이승주</div>
    </UserBlockLayout>
  );
}
