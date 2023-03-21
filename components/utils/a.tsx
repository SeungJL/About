이승주;
이승주;
import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const NUM_VISIBLE_ITEMS = 3;
const ITEM_HEIGHT = 50;
const COLORS = ["blue", "red", "blue"];

const timeRoulette = [1, 2, 3, 4, 5, 6];

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <TimeRoulette />
    </div>
  );
}

export default App;

const TimeRoulette = () => {
  const [selectedIndex, setSelectedIndex] = useState(NUM_VISIBLE_ITEMS - 1);
  const y = useMotionValue(0);
  const listHeight = timeRoulette.length * ITEM_HEIGHT;

  const getTranslateY = (index) => {
    const translateY =
      y.get() - ITEM_HEIGHT * selectedIndex + ITEM_HEIGHT * index;
    return `${translateY}px`;
  };

  const renderItem = (item, index) => {
    const isActive = index === selectedIndex - 1;
    const bgColor = COLORS[index % 3];

    return (
      <motion.div
        key={index}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
          background: bgColor,
          y: getTranslateY(index),
        }}
        animate={{ y: getTranslateY(index) }}
        drag="y"
        dragConstraints={{ top: -listHeight + ITEM_HEIGHT, bottom: 0 }}
        dragElastic={0.2}
        dragMomentum={false}
        onDragEnd={(event, { offset, velocity }) => {
          if (velocity.y > 500 && selectedIndex > 0) {
            setSelectedIndex((prev) => prev - 1);
          } else if (
            velocity.y < -500 &&
            selectedIndex < timeRoulette.length - NUM_VISIBLE_ITEMS
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
        <span
          style={{
            fontSize: 24,
            lineHeight: ITEM_HEIGHT + "px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          {item}
        </span>
      </motion.div>
    );
  };

  return (
    <div
      style={{
        height: NUM_VISIBLE_ITEMS * ITEM_HEIGHT,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {timeRoulette
        .slice(selectedIndex - 1, selectedIndex + NUM_VISIBLE_ITEMS - 1)
        .map(renderItem)}
    </div>
  );
};
