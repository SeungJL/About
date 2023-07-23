import { useToast } from "@chakra-ui/react";
import {
  faCalendarDays,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ko from "date-fns/locale/ko";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import SearchLocation from "../../../components/features/lib/SearchLocation";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ProgressStatus from "../../../components/layout/ProgressStatus";
import { useFailToast } from "../../../hooks/CustomToast";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";
import { sharedGatherDataState } from "../../../recoil/sharedDataAtoms";

function WritingDate() {
  const failToast = useFailToast();
  const router = useRouter();
  const toast = useToast();
  const [gatherContent, setGatherContent] = useRecoilState(
    sharedGatherDataState
  );

  const [date, setDate] = useState<Date>();

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(14);
    currentDate.setMinutes(0);
    setDate(
      gatherContent?.date
        ? (gatherContent?.date as Dayjs).toDate()
        : currentDate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [detail, setDetail] = useState(gatherContent?.location?.sub);
  const [location, setLocation] = useState(gatherContent?.location?.main);
  const onClickNext = () => {
    if (!location) {
      failToast("free", "장소를 선택해 주세요!", true);
      return;
    }
    setGatherContent((old) => ({
      ...old,
      location: { main: location, sub: detail },
      date: dayjs(date),
    }));
    router.push(`/gather/writing/condition`);
  };
  const minTime = new Date();
  minTime.setHours(9);
  minTime.setMinutes(0);

  const maxTime = new Date();
  maxTime.setHours(23);
  maxTime.setMinutes(30);

  return (
    <PageLayout>
      <ProgressStatus value={75} />
      <Header title="" url="/gather/writing/content" />
      <RegisterLayout>
        <RegisterOverview>
          <span>날짜와 장소를 선택해 주세요.</span>
        </RegisterOverview>
        <Container>
          <FontAwesomeIcon icon={faCalendarDays} />
          <StyledDatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            locale={ko}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="시간"
            dateFormat="M월 d일 p"
            minTime={minTime}
            maxTime={maxTime}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <CalendarCustomHeader>
                <button onClick={decreaseMonth}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{dayjs(date)?.format("M월 D일")}</span>{" "}
                <button onClick={increaseMonth}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </CalendarCustomHeader>
            )}
          />
        </Container>
        <Location>
          <SearchLocation location={location} setLocation={setLocation} />
          <LocationDetailInput
            placeholder="상세 주소"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </Location>
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </PageLayout>
  );
}

const CalendarCustomHeader = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 var(--padding-min);
`;

const Container = styled.div`
  display: flex;
  padding-left: var(--padding-min);
  margin-top: var(--margin-max);
  align-items: center;
  border-bottom: var(--border-main);

  .react-datepicker__time-list-item {
    font-size: 14px;
  }
  .react-datepicker__header {
    font-size: 14px;
  }
  .react-datepicker__day-name {
    font-weight: 400;
    font-size: 12px;
    margin: 0px 5.5px;
  }
  .react-datepicker__day {
    font-weight: 400;
    width: 30px;
    height: 30px;
    padding-top: 4px;
  }
  .react-datepicker__triangle {
    left: -35% !important;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  background-color: inherit;
  padding: var(--padding-sub) 0;
  margin-left: var(--margin-md);
  :focus {
    outline: none;
  }
`;

const LocationDetailInput = styled.input`
  width: 100%;
  background-color: inherit;
  border-bottom: var(--border-main);
  padding: var(--padding-min);
  outline: none;
  font-size: 13px;
  color: var(--font-h2);
`;

const Location = styled.div`
  margin-top: 12px;
  background-color: inherit;
`;

export default WritingDate;
