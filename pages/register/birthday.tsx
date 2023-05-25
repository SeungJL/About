import styled from "styled-components";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ProgressLayout from "../../components/layouts/ProgressLayout";
import Header from "../../components/layouts/Header";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import BottomNav from "../../components/layouts/BottomNav";
import { DefaultValue, useRecoilState, useSetRecoilState } from "recoil";
import { registerFormState } from "../../recoil/userAtoms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";

function Birthday() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);

  const [errorMessage, setErrorMessage] = useState("");

  const initialDate = new Date(2000, 0, 1);

  const birth = dayjs(registerForm?.birth).format("YYMMDD");

  const defaultBirth =
    birth && Number(birth?.slice(0, 2)) < 50
      ? "20" + birth
      : birth
      ? "19" + birth
      : null;

  const defaultBirthDate =
    defaultBirth &&
    new Date(
      +defaultBirth?.slice(0, 4),
      +defaultBirth?.slice(4, 6) - 1,
      +defaultBirth?.slice(6)
    );
  const [startDate, setStartDate] = useState(defaultBirthDate || initialDate);

  const onClickNext = () => {
    setRegisterForm((old) => ({
      ...old,
      birth: dayjs(startDate).format("YYMMDD"),
    }));
    router.push(`mbti`);
  };

  const myBirth = dayjs(startDate).format("YYYY년 M월 D일");

  return (
    <Layout>
      <ProgressLayout value={40} />
      <Header title="회원가입" url="gender" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>생년월일을 입력해 주세요</span>
          <span>20대 인원만 가입할 수 있습니다!</span>
        </RegisterOverview>
        <DateContainer>
          <DateStr>{myBirth}</DateStr>
          <Button size="md" as="div">
            <StyledDatePicker
              locale={ko}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="연도 / 월 선택"
              showMonthYearPicker
            />
          </Button>
          <Button size="md" mt="10px" as="div">
            <StyledDatePicker
              locale={ko}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="날짜 선택"
              renderCustomHeader={({ date }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <span>{dayjs(date)?.format("YYYY년 M월 D일")}</span>
                </div>
              )}
            />
          </Button>
        </DateContainer>
      </RegisterLayout>
      <BottomNav onClick={() => onClickNext()} />
    </Layout>
  );
}

const StyledDatePicker = styled(DatePicker)`
  text-align: center;
  background-color: inherit;
  font-size: 16px;
  width: 160px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--font-h2);
`;

const Layout = styled(motion.div)`
  height: 100vh;
`;

const DateStr = styled.div`
  font-size: 22px;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .react-datepicker__header {
    font-size: 14px;
  }
  .react-datepicker__month-text {
    width: 80px;
    height: 40px;
    padding: 14px 0;
  }
  .react-datepicker__day-name {
    font-weight: 400;
    font-size: 12px;
    margin: 4px 5.5px;
    margin-top: 8px;
  }
  .react-datepicker__day {
    font-weight: 400;
    width: 30px;
    height: 30px;
    padding-top: 4px;
  }
`;

const DateWrapper = styled.div``;

export default Birthday;
