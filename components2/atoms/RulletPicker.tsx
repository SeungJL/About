import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 34;

interface IRulletPicker {
  rulletIndex: number;
  text: string;
  rulletItemArr: string[];
  setRulletIndex: (idx: number) => void;
}

export default function RulletPicker({
  rulletIndex,
  text,
  rulletItemArr,
  setRulletIndex,
}: IRulletPicker) {
  const [index, setIndex] = useState<number>(rulletIndex);

  const y = useMotionValue(0);

  useEffect(() => {
    handleDragEnd();
  }, []);

  useEffect(() => {
    setRulletIndex(index);
  }, [index]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleYChange = () => {
      clearTimeout(timeoutId);
      // y 값이 변경되지 않은 채로 일정 시간(예: 100ms)이 지나면 이동이 멈췄다고 간주하고 정지
      timeoutId = setTimeout(() => {
        handleDragEnd();
      }, 10);
    };
    const unsubscribe = y.on("change", handleYChange);
    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, [y, index]);

  const handleDragEnd = () => {
    const targetY = -ITEM_HEIGHT * (index - 2);
    y.set(targetY);
  };

  const handleUpdate = () => {
    const Y = y.get();
    const activeItem = Math.round(-Y / ITEM_HEIGHT) + 2;

    setIndex(activeItem);
  };

  const onClick = (idx: number) => {
    const targetY = -ITEM_HEIGHT * (idx - 2);
    y.set(targetY);
  };

  return (
    <>
      <div className="text-gray-3 mb-2 font-semibold">{text}</div>
      <div
        className="relative w-full rounded-lg bg-gray-8 text-bg-2 overflow-y-hidden py-2"
        style={{
          height: `${ITEM_HEIGHT * 5 + 16}px`,
        }}
      >
        <motion.div
          className="relative flex flex-col z-10"
          drag="y"
          dragConstraints={{
            top: -ITEM_HEIGHT * (rulletItemArr.length - 3),
            bottom: ITEM_HEIGHT * 2,
          }}
          dragElastic={0.2}
          onUpdate={() => handleUpdate()}
          style={{ y }}
        >
          {rulletItemArr.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onClick(idx)}
              className={`relative z-10 flex justify-center items-center font-semibold text-base ${
                index === idx ? "text-white" : "text-gray-3"
              } `}
              style={{
                height: `${ITEM_HEIGHT}px`,
              }}
            >
              {item}
            </div>
          ))}
        </motion.div>
        <div
          className="rounded-lg w-full absolute bg-gray-2 top-1/2 -translate-y-1/2 z-0"
          style={{ height: `${ITEM_HEIGHT}px` }}
        ></div>
      </div>
    </>
  );
}
