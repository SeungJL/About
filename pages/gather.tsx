import { useRecoilState } from "recoil";
import styled from "styled-components";
import { GatherVoteModal } from "../modals/GatherVoteModal";
import { gatherJoinState } from "../recoil/gatherAtoms";

const GatherLayout = styled.div`
  padding: 25px;
  > ul {
    > li {
      height: 30px;
      margin-bottom: 10px;
      border: 1px solid brown;
    }
  }
`;

function Gather() {
  const [isShowGather, setIsShowGather] = useRecoilState(gatherJoinState);
  return (
    <>
      <GatherLayout>
        <ul>
          <li onClick={() => setIsShowGather(true)}>first gather</li>
          <li>second gather</li>
          <li>third gather</li>
          <li>fourth gather</li>
          <li>fifth gather</li>
        </ul>
      </GatherLayout>
      {isShowGather && <GatherVoteModal />}
    </>
  );
}
export default Gather;
