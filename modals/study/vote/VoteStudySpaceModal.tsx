import styled from "styled-components";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { isStranger } from "../../../libs/utils/authUtils";
import { motion } from "framer-motion";
import TimeRullet from "../../../components/utils/TimeRullet";
import { IPlace } from "../../../types/studyDetails";

const startHour = 10;
const endHour = 22;
const minutesArr = ["00", "30"];

function VoteStudySpaceModal({
  isModal,
  setIsModal,
  voteDate,
  place,
}: {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  voteDate: Dayjs;
  place: IPlace;
}) {
  const [startTimeArr, setStartTimeArr] = useState([]);
  const [endTimeArr, setEndTimeArr] = useState([]);
  const [startIdx, setStartIdx] = useState(4);
  const [endIdx, setEndIdx] = useState(4);

  useEffect(() => {
    const tempStart = [];
    const tempEnd = [];
    for (let i = startHour; i <= startHour + 9; i++) {
      tempStart.push({ hour: i, minutes: "00" });
      tempStart.push({ hour: i, minutes: 30 });
      tempEnd.push({ hour: i + 2, minutes: "00" });
      tempEnd.push({ hour: i + 2, minutes: 30 });
    }
    setStartTimeArr(tempStart);
    setEndTimeArr(tempEnd);
  }, []);

  return (
    <Layout
      initial={{ y: "90vh" }}
      animate={isModal ? { y: 0 } : { y: "100vh" }}
      transition={{ duration: 0.5 }}
    >
      <TopNav />
      <Header>
        <span>{voteDate.locale("ko").format("M월 DD일 ddd요일")}</span>
        <span>스터디 참여시간을 선택해주세요.</span>
      </Header>
      <TimeChoiceLayout>
        <TimeChoiceBlock>
          <TimeRullet
            timeArr={startTimeArr}
            voteDate={voteDate}
            place={place}
            setIsModal={setIsModal}
          />
        </TimeChoiceBlock>
      </TimeChoiceLayout>
    </Layout>
  );
}
const Layout = styled(motion.div)`
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
  margin-bottom: 18px;
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
`;

const TimeChoiceBlock = styled.div`
  width: 100%;

  > span {
    color: var(--font-h3);
    font-weight: 600;
    font-size: 13px;
  }
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
