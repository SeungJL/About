import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/dist/client/router";

const ITEM_HEIGHT = 34;
interface ITimeRullet {
  timeArr: { hour: string; minutes: string }[];
  setTime: (time: Dayjs) => void;
}

function TimeRullet({ timeArr, setTime }: ITimeRullet) {
  const router = useRouter();
  const voteDate = dayjs(router.query.date as string);

  const [index, setIndex] = useState(2);

  useEffect(() => {
    const selectTime = timeArr[index];
    setTime(
      voteDate?.hour(Number(selectTime.hour)).minute(Number(selectTime.minutes))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const y = useMotionValue(0);

  const handleDrag = () => {
    const Y = y.get();
    if (Y < -30) setIndex(3);
    let Move = Math.floor(-(Y + 30) / ITEM_HEIGHT) + 3;
    if (Move > 20) Move = 20;
    if (Move < 0) Move = 0;
    setIndex(Move);
  };

  return (
    <Layout>
      <TimeLayout
        style={{ y }}
        drag="y"
        dragConstraints={{ top: -560, bottom: -10 }}
        dragElastic={0.2}
        dragMomentum={true}
        onDrag={() => handleDrag()}
      >
        {timeArr.map((item, idx) =>
          idx === index ? (
            <ChoiceBlock key={idx}>
              <BlockIcon>
                {item.hour} : {item.minutes}
              </BlockIcon>
            </ChoiceBlock>
          ) : (
            <ChoiceBlock key={idx}>
              {item.hour} : {item.minutes}
            </ChoiceBlock>
          )
        )}
      </TimeLayout>{" "}
    </Layout>
  );
}

const Layout = styled.div`
  height: 187px;
  margin-top: var(--margin-md);
  width: 161px;
  border-radius: 13px;
  background-color: var(--font-h8);
  color: var(--font-h2);
  overflow: hidden;
`;

const TimeLayout = styled(motion.div)`
  height: ${ITEM_HEIGHT * 21 + 30}px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BlockIcon = styled.div`
  background-color: var(--font-h1);
  color: white;
  width: 121px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 13px;
`;

const ChoiceBlock = styled.div`
  height: ${ITEM_HEIGHT}px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  background-color: var(--font-h8);
`;

export default TimeRullet;
