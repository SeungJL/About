import { background, position } from "@chakra-ui/react";
import dayjs from "dayjs";
import { relative } from "path";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IconCircle } from "../../../public/icons/IconOutline";
import { IconArrowBottom, IconArrowTop } from "../../../public/icons/Icons";
import { useRecoilState } from "recoil";
import { voteDateState } from "../../../recoil/studyAtoms";

interface ICallender {
  dayCnt: number;
  setDayCnt: Dispatch<SetStateAction<number>>;
}

function AboutCallender({ dayCnt, setDayCnt }: ICallender) {
  const dayOfWeek = dayjs().day();
  const [dayArr, setDayArr] = useState<number[]>([]);
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const day = voteDate.date();
  useEffect(() => {
    const tempArr: number[] = [];
    const startDay = dayjs().date(1).day();

    for (let i = 1; i <= dayCnt; i++) {
      if (dayCnt === 7) tempArr.push(day - dayOfWeek + i - 1);
      else {
        if (i <= startDay) tempArr.push(null);
        else if (i - startDay <= dayjs().daysInMonth())
          tempArr.push(i - startDay);
        else tempArr.push(null);
      }
    }
    setDayArr(tempArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayCnt]);

  const onClickDay = (date) => {
    setVoteDate(voteDate.date(date));
  };
  return (
    <Layout layout transition={{ duration: 0.3 }}>
      <Header>
        <Date>
          <span>{dayjs().format("YYYY년 M월")}</span>
          {dayCnt === 7 && (
            <div onClick={() => setDayCnt(35)}>
              <IconArrowBottom />
            </div>
          )}
        </Date>
      </Header>
      <DayOfWeek />
      <CallenderDays isFlex={dayCnt === 7}>
        {dayArr.map((d, idx) => (
          <DayItem
            layout
            transition={{ duration: 0.3 }}
            key={idx}
            onClick={() => onClickDay(d)}
          >
            {d === day ? (
              <div>
                <IconCircle>{d}</IconCircle>
              </div>
            ) : (
              <div>{d}</div>
            )}
          </DayItem>
        ))}
      </CallenderDays>
      {dayCnt === 35 && (
        <BottomUp onClick={() => setDayCnt(7)}>
          <IconArrowTop />
        </BottomUp>
      )}
    </Layout>
  );
}

const DayOfWeek = () => (
  <DayLine>
    <span>일</span>
    <span>월</span>
    <span>화</span>
    <span>수</span>
    <span>목</span>
    <span>금</span>
    <span>토</span>
  </DayLine>
);

const Layout = styled(motion.div)`
  padding-bottom: 8px;
  border-bottom: 1px solid #e3e6eb;
`;

const Header = styled.header`
  height: 46px;
  display: flex;
  justify-content: space-between;
  padding: 0px 16px 8px 16px;
`;
const Date = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-family: pretendSemiBold;
    color: #343943;
    font-size: 20px;
    letter-spacing: -4%;
    align-items: center;
    margin-right: 8px;
  }
`;
const CallenderDays = styled.div<{ isFlex: boolean }>`
  display: flex;
  color: #767d8a;
  margin: 0px 4px;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 15px;
  padding: 0;
  display: ${(props) => (props.isFlex ? "flex" : "grid")};
  justify-content: ${(props) => (props.isFlex ? "spaceBetween" : null)};
  grid-template-columns: ${(props) => (props.isFlex ? null : "repeat(7,1fr)")};
  grid-auto-rows: ${(props) => (props.isFlex ? null : "32px")};
`;

const DayItem = styled(motion.div)`
  flex: 1;
  display: flex;
  > div {
    margin: auto;
    > div {
      color: white;
    }
  }
`;

const BottomUp = styled.div`
  margin-top: 8px;
  height: 12px;
  text-align: center;
  position: relative;
  background-color: #e3e6eb;
  > svg {
    position: absolute;
    top: 30%;
  }
`;

const DayLine = styled.div`
  margin: 0 22px;
  display: flex;
  justify-content: space-between;
  color: #a0a4af;
  font-size: 13px;
  padding: 0 2px;
  margin-bottom: 7px;
`;

export default AboutCallender;
