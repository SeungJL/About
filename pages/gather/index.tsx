import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { GatherVoteModal } from "../../modals/write/gather/AttendGatherModal";

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

const Box = styled(motion.div)`
  width: 100px;
  height: 100px;
  background-color: red;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
`;

const Child = styled(motion.div)`
  width: 40%;
  height: 40%;
  background-color: pink;
`;

const varB = {
  start: {
    scale: 0,
    opacity: 0,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 3,
      bounce: 0.8,
      delayChildren: 3,
      staggerChildren: 0.5,
    },
  },
};

const varC = {
  start: {
    opacity: 0,
    y: 20,
  },
  end: {
    scale: 1,
    y: 0,
    opacity: 1,
    background: "blue",
    rotate: 180,
  },
};

function Gather() {
  return (
    <>
      <GatherLayout>
        <ul>
          <li>second gather</li>
          <li>third gather</li>
          <li>fourth gather</li>
          <li>fifth gather</li>
        </ul>
      </GatherLayout>
      <Box variants={varB} initial="start" animate="end">
        <Child variants={varC}></Child>
        <Child variants={varC}></Child>
        <Child variants={varC}></Child>
        <Child variants={varC}></Child>
      </Box>
    </>
  );
}
export default Gather;
