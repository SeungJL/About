import styled from "styled-components";
import { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { move } from "formik";
import { Datepicker } from "@mobiscroll/react";

const NUM_VISIBLE_ITEMS = 5;
const ITEM_HEIGHT = 34;

interface ITimeRullet {
  timeArr: { hour: string; minutes: string }[];
}

function TimeRullet({ timeArr }: ITimeRullet) {
  const [selectedIndex, setSelectedIndex] = useState(NUM_VISIBLE_ITEMS + 3);

  const getTranslateY = (index) => {
    const translateY =
      -ITEM_HEIGHT * selectedIndex + ITEM_HEIGHT * index * 0.52;

    return `${translateY}px`;
  };
  const [isDragging, setIsDragging] = useState(false);
  console.log(isDragging);
  return (
    <Layout>
      <Datepicker
        controls={["time"]}
        select="range"
        display="inline"
        touchUi={true}
      />
      <TimeLayout
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        dragMomentum={true}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(event, { offset, velocity }) => {
          setTimeout(() => {
            setIsDragging(false);
          }, 1000);

          const YY = velocity.y;
          const moveY = Math.floor(YY / 500);
          if (YY > 0 && selectedIndex - moveY <= 7) return setSelectedIndex(6);
          if (YY < 0 && selectedIndex - moveY >= 14)
            return setSelectedIndex(14);
          return setSelectedIndex((prev) => prev - moveY);
        }}
      >
        {timeArr.map((item, idx) => {
          const isSelected = selectedIndex - idx === 2;
          console.log(isSelected, idx);
          return (
            <ChoiceBlock
              key={idx}
              absol={getTranslateY(idx)}
              animate={{ y: getTranslateY(idx) }}
              selected={isSelected && !isDragging}
            >
              {item.hour} : {item.minutes}
            </ChoiceBlock>
          );
        })}
      </TimeLayout>
    </Layout>
  );
}

const Layout = styled(motion.div)`
  height: 187px;
  margin-top: 8px;
  width: 161px;
  border-radius: 13px;
  background-color: var(--font-h8);
  color: var(--font-h2);
  overflow: hidden;
`;

const TimeLayout = styled(motion.div)`
  height: ${ITEM_HEIGHT * 20 + 24}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ChoiceBlock = styled(motion.div)<{
  absol: string;
  selected: boolean;
}>`
  height: ${ITEM_HEIGHT}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: var(--font-h2);
  font-weight: 500;
  line-height: 18px;
  position: absolute;
  top: calc(${(props) => props.absol} + 59%);
  background-color: ${(props) => (props.selected ? "red" : null)};
`;

export default TimeRullet;
