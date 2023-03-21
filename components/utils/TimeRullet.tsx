import styled from "styled-components";
import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const NUM_VISIBLE_ITEMS = 5;
const ITEM_HEIGHT = 34;

interface ITimeRullet {
  timeArr: { hour: string; minutes: string }[];
}

function TimeRullet({ timeArr }: ITimeRullet) {
  const [selectedIndex, setSelectedIndex] = useState(NUM_VISIBLE_ITEMS + 3);
  const y = useMotionValue(0);
  const listHeight = timeArr.length * ITEM_HEIGHT;
  const numHiddenItems = Math.floor((NUM_VISIBLE_ITEMS - 1) / 2);
  const getTranslateY = (index) => {
    const translateY =
      y.get() - ITEM_HEIGHT * selectedIndex + ITEM_HEIGHT * index;
    return `${translateY}px`;
  };
  const getOpacity = (index) => {
    const opacity =
      selectedIndex === index
        ? 1
        : Math.abs(index - selectedIndex) < numHiddenItems
        ? 0.8
        : 0.4;
    return opacity;
  };

  const visibleItems = timeArr.slice(
    Math.max(selectedIndex - numHiddenItems, 0),
    Math.min(selectedIndex + numHiddenItems + 1, timeArr.length)
  );
  console.log(timeArr);
  return (
    <Layout>
      <TimeLayout
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        dragMomentum={true}
        onDragEnd={(event, { offset, velocity }) => {
          if (velocity.y > 500 && selectedIndex > 0) {
            setSelectedIndex((prev) => prev - 1);
          } else if (
            velocity.y < -500 &&
            selectedIndex < timeArr.length - NUM_VISIBLE_ITEMS
          ) {
            setSelectedIndex((prev) => prev + 1);
          } else {
            setSelectedIndex(
              Math.round((y.get() - offset.y) / ITEM_HEIGHT) +
                NUM_VISIBLE_ITEMS -
                1
            );
          }
        }}
      >
        {timeArr.map((item, idx) => (
          <ChoiceBlock
            key={idx}
            Y={getTranslateY(idx)}
            animate={{ y: getTranslateY(idx) }}
          >
            {item.hour} : {item.minutes}
          </ChoiceBlock>
        ))}
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

  background-color: pink;
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

const ChoiceBlock = styled(motion.div)<{ Y: string }>`
  height: ${ITEM_HEIGHT}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  background-color: #fff;
  border: 1px solid #000;
  background-color: blue;
  position: absolute;
  top: calc(${(props) => props.Y} + 59%);
`;

export default TimeRullet;
