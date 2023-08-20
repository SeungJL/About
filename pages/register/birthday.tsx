import { Button } from "@chakra-ui/react";
import ko from "date-fns/locale/ko";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import ProgressStatus from "../../components/layout/ProgressStatus";
import { birthToAge } from "../../helpers/converterHelpers";
import RegisterLayout from "../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../pagesComponents/register/RegisterOverview";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { sharedRegisterFormState } from "../../recoil/sharedDataAtoms";

function Birthday() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(
    sharedRegisterFormState
  );

  const [errorMessage, setErrorMessage] = useState("");

  const initialDate = new Date(2000, 0, 1);

  const birth = registerForm?.birth;

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
  const isProfileEdit = useRecoilValue(isProfileEditState);
  const [startDate, setStartDate] = useState(defaultBirthDate || initialDate);

  const onClickNext = () => {
    const age = birthToAge(dayjs(startDate).format("YYMMDD"));

    if (age < 19 || age > 26) {
      setErrorMessage("죄송합니다. 19 ~ 26세의 인원만 가입이 가능합니다.");
      return;
    }
    if (dayjs(startDate))
      setRegisterForm((old) => ({
        ...old,
        birth: dayjs(startDate).format("YYMMDD"),
      }));
    router.push(`mbti`);
  };

  const myBirth = dayjs(startDate).format("YYYY년 M월 D일");

  return (
    <PageLayout>
      <ProgressStatus value={40} />
      <Header
        title={!isProfileEdit ? "회원가입" : "프로필 수정"}
        url="/register/gender"
      />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>생년월일을 입력해 주세요</span>
          <span>만 19세 ~ 만 26세의 인원만 가입할 수 있습니다!</span>
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
              inputProps={{ readOnly: true }}
              onFocus={(e) => e.preventDefault()}
            />
          </Button>
          <Button size="md" mt="10px" as="div">
            <StyledDatePicker
              locale={ko}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="날짜 선택"
              inputProps={{ readOnly: true }}
              onFocus={(e) => e.preventDefault()}
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
    </PageLayout>
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
  margin: var(--margin-max) 0;
`;

const DateContainer = styled.div`
  margin-bottom: var(--margin-main);
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

export default Birthday;
