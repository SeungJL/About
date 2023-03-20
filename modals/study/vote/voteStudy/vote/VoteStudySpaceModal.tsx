import styled from "styled-components";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { isStranger } from "../../../../../libs/utils/authUtils";
import { motion } from "framer-motion";

const startHour = 10;
const endHour = 22;
const minutesArr = ["00", "30"];

function VoteStudySpaceModal({
  setIsModal,
  voteDate,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  voteDate: Dayjs;
}) {
  const [startTimeArr, setStartTimeArr] = useState([]);
  const [endTimeArr, setEndTimeArr] = useState([]);
  const [startIdx, setStartIdx] = useState(4);
  const [endIdx, setEndIdx] = useState(4);

  useEffect(() => {
    const tempStart = [];
    const tempEnd = [];
    for (let i = startHour; i <= startHour + 9; i++) {
      tempStart.push({ hour: i, minutes: 0 });
      tempStart.push({ hour: i, minutes: 30 });
      tempEnd.push({ hour: i + 2, minutes: 0 });
      tempEnd.push({ hour: i + 2, minutes: 30 });
    }
    setStartTimeArr(tempStart);
    setEndTimeArr(tempEnd);
  }, []);
  console.log(startTimeArr, endTimeArr);
  const handleSwipe = (event, info, isStart) => {
    const { offset } = info;
    if (Math.abs(offset.y) > 50) {
      if (offset.y < 0) {
        if (isStart) setStartIdx((startIdx + 1) % startTimeArr.length);
        else setEndIdx((endIdx + 1) % endTimeArr.length);
      } else {
        if (isStart)
          setStartIdx(startIdx === 0 ? startTimeArr.length - 1 : startIdx - 1);
        else setEndIdx(endIdx === 0 ? endTimeArr.length - 1 : endIdx - 1);
      }
    }
  };

  return (
    <Layout>
      <TopNav />
      <Header>
        <span>{voteDate.locale("ko").format("M월 DD일 ddd요일")}</span>
        <span>스터디 참여시간을 선택해주세요.</span>
      </Header>
      <TimeChoiceLayout>
        <TimeChoiceBlock>
          <span>시작시간</span>
          <TimeChoice
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => handleSwipe(event, info, true)}
          >
            {startTimeArr.map((item, idx) => (
              <ChoiceBlock
                key={idx}
                animate={{
                  y: `calc(-50% + ${100 * (startIdx - idx)}%)`,
                  opacity: Math.abs(startIdx - idx) <= 3 ? 1 : 0,
                }}
              >
                {item.hour}
              </ChoiceBlock>
            ))}
          </TimeChoice>
        </TimeChoiceBlock>
        <TimeChoiceBlock>
          <span>종료시간</span>
          <TimeChoice
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => handleSwipe(event, info, false)}
          >
            {endTimeArr.map((item, idx) => (
              <ChoiceBlock
                key={idx}
                animate={{
                  y: `calc(-50% + ${100 * (endIdx - idx)}%)`,
                  opacity: Math.abs(endIdx - idx) <= 1 ? 1 : 0,
                }}
              >
                2
              </ChoiceBlock>
            ))}
          </TimeChoice>
        </TimeChoiceBlock>
      </TimeChoiceLayout>
      <VoteButton>스터디 투표하기</VoteButton>
    </Layout>
  );
}
const Layout = styled.div`
  position: fixed;
  bottom: 0;
  width: 375px;
  height: 424px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: white;
  z-index: 20;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TopNav = styled.nav`
  width: 56px;
  height: 4px;
  border-radius: 4px;
  background-color: var(--font-h5);
  margin-bottom: 24px;
`;
const Header = styled.header`
  align-self: start;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  > span:first-child {
    font-weight: 600;
    font-size: 15px;
    color: var(--font-h2);
  }
  > span:last-child {
    font-size: 20px;
    font-weight: 600;
  }
`;

const TimeChoiceLayout = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TimeChoiceBlock = styled.div`
  > span {
    color: var(--font-h3);
    font-weight: 600;
    font-size: 13px;
  }
`;

const TimeChoice = styled(motion.div)`
  margin-top: 8px;
  width: 161px;
  height: 187px;
  border-radius: 13px;
  background-color: var(--font-h8);
  color: var(--font-h2);

  background-color: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ChoiceBlock = styled(motion.div)`
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  background-color: #fff;
  border: 1px solid #000;
  background-color: blue;
`;

const VoteButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--font-h5);
  color: white;
  height: 48px;
  border-radius: 13px;
  padding: 14px 100px 14px 100px;
  font-weight: 700;
  font-size: 15px;
`;

export default VoteStudySpaceModal;
