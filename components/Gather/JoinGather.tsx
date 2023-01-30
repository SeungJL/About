import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { gatherIdState, gatherState } from "../../recoil/atoms";

const Container = styled(motion.div)`
  padding: 15px;
  background-color: rgba(174, 110, 70, 1);
  border-radius: 20px;
  width: 300px;
  height: 150px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  > header {
    border-bottom: 1px solid white;
    padding-bottom: 0px;
    > button {
      height: 25px;
      width: 60px;
    }
  }
`;

const VoteMember = styled.div`
  padding: 10px 0 10px 0;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 5px;
  > div {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: RGB(79, 43, 16);
  }
`;
interface IJoin {
  id: string;
}
function JoinGather({ id }: IJoin) {
  return (
    <Container layoutId={id}>
      <header>
        <button>Vote</button>
      </header>
      <VoteMember>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
      </VoteMember>
    </Container>
  );
}
export default JoinGather;
