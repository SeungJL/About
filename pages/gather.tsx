import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { gatherIdState, gatherSelector, isWriteState } from "../recoil/atoms";
import { AnimatePresence, motion } from "framer-motion";
import CreateGather from "../components/Gather/CreateGather";
import SelectGather from "../components/Gather/SelectGather";
import PrintGather from "../components/Gather/PrintGather";
import JoinGather from "../components/Gather/JoinGather";
import Seo from "../components/Seo";

const ScreenBox = styled.div``;

const GatherHeader = styled.header`
  margin: 10px 0;
`;

const Overlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: -3px;
`;
const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};
function Gather() {
  const gathers = useRecoilValue(gatherSelector);
  const isWrite = useRecoilValue(isWriteState);
  const [id, setId] = useRecoilState(gatherIdState);

  return (
    <>
      <Seo title="Gather" />
      <ScreenBox>
        <div>23</div>

        <GatherHeader>
          {isWrite ? (
            <>
              <CreateGather />
              <br />
              <SelectGather />
            </>
          ) : (
            <>
              <SelectGather />

              <CreateGather />
            </>
          )}
        </GatherHeader>
        <ul className="fa-ul">
          {gathers.map((gather) => {
            return <PrintGather key={String(gather.id)} {...gather} />;
          })}
        </ul>
      </ScreenBox>
      <AnimatePresence>
        {id !== "" ? (
          <Overlay
            variants={overlay}
            onClick={() => setId("")}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <JoinGather id={id} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}
export default Gather;
