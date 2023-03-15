import { position } from "@chakra-ui/react";
import dayjs from "dayjs";
import { relative } from "path";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IconCircle } from "../../../public/icons/IconOutline";

function AboutCallender() {
  const [dayCnt, setDayCnt] = useState(7);
  const dayOfWeek = dayjs().day();
  const day = dayjs().date();
  const [dayArr, setDayArr] = useState<number[]>([]);
  console.log(day);
  useEffect(() => {
    const tempArr: number[] = [];
    for (let i = 0; i < dayCnt; i++) tempArr.push(day - dayOfWeek + i);
    setDayArr(tempArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayCnt]);
  console.log(dayArr);

  return (
    <Layout>
      <DayOfWeek />
      <DayListNum>
        {dayArr.map((d) => {
          if (d === day)
            return (
              <div style={{ color: "white", position: "relative" }}>
                <span>{d}</span>
                <IconCircle />
              </div>
            );
          return <span key={d}>{d}</span>;
        })}
      </DayListNum>
    </Layout>
  );
}

const DayOfWeek = () => (
  <DayList>
    <span>일</span>
    <span>월</span>
    <span>화</span>
    <span>수</span>
    <span>목</span>
    <span>금</span>
    <span>토</span>
  </DayList>
);

const Layout = styled.div`
  padding: 12px 20px;
`;

const DayList = styled.div`
  display: flex;
  justify-content: space-between;
  color: #a0a4af;
  font-size: 13px;
  padding: 0 2px;
  margin-bottom: 7px;
`;

const DayListNum = styled(DayList)`
  color: #767d8a;
  font-weight: 500;
  font-size: 15px;
  padding: 0;
`;
// Block //

export default AboutCallender;
