import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { gatherJoinState } from "../../../recoil/gatherAtoms";

const GatherVoteLayout = styled.div`
  width: 350px;
  height: 420px;
  background-color: pink;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const GatherVoteModal = () => {
  const setIsShowGather = useSetRecoilState(gatherJoinState);
  return (
    <GatherVoteLayout>
      <button onClick={() => setIsShowGather(false)}>닫기</button>
    </GatherVoteLayout>
  );
};
