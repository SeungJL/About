import dayjs from "dayjs";
import "dayjs/locale/ko";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TextCircle from "../../../components2/atoms/TextCircle";
import { getDateArr, handleChangeDate } from "./StudyController";

dayjs.locale("ko");

interface IStudyControllerDates {
  selectedDate: string;
}

function StudyControllerDates({ selectedDate }: IStudyControllerDates) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const selectedDateDayjs = dayjs(selectedDate);

  const [variants, setVariants] = useState({});

  const dateArr = getDateArr(selectedDateDayjs);

  useEffect(() => {
    setVariants(variants_options);
  }, []);

  const onClick = (date: number) => {
    const newDate = handleChangeDate(selectedDateDayjs, "date", date);
    console.log(date, newDate);
    newSearchParams.set("date", newDate);
    router.replace(`/home?${newSearchParams.toString()}`, { scroll: false });
  };

  return (
    <AnimatePresence>
      <FlexContainer>
        {dateArr.map((date, idx) => (
          <MotionDiv
            key={date.date}
            layout
            custom={idx}
            variants={variants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1 }}
            idx={idx}
          >
            {idx !== 3 ? (
              <Button onClick={() => onClick(date.date)}>{date.date}</Button>
            ) : (
              <>
                <AbsoluteDiv>{date.day}</AbsoluteDiv>
                <TextCircle text={String(date.date)} />
              </>
            )}
          </MotionDiv>
        ))}
      </FlexContainer>
    </AnimatePresence>
  );
}

const variants_options = {
  initial: (idx: number) => ({
    opacity: 1,
    x: idx === 6 ? 40 : idx === 0 ? -40 : 0,
  }),
  animate: (idx: number) => ({
    opacity: 1,
    x: 0,
    y: idx === 3 ? -44 : 0,
  }),
};

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  position: relative;
  justify-content: center;
  /* idx 값을 기반으로 조건부 스타일 적용 */
  flex: ${({ idx }) => (idx !== 3 ? "1" : "initial")};
  width: ${({ idx }) =>
    idx === 3 ? "6rem" : "auto"}; /* w-24에 해당하는 너비 */
  margin: ${({ idx }) =>
    idx === 3 ? "0 0.125rem" : "0"}; /* mx-0.5에 해당하는 마진 */
`;
const AbsoluteDiv = styled.div`
  position: absolute;
  left: 50%;
  top: -34px;
  transform: translate(-50%, -50%);
  color: #3ab795; /* text-mint assumed color */
  font-weight: 600; /* font-semibold */
`;

const Button = styled.button`
  /* Add button specific styling here */
`;
export default StudyControllerDates;
