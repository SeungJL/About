import { useToast } from "@chakra-ui/react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ko from "date-fns/locale/ko";
import dayjs, { Dayjs } from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layouts/BottomNav";
import Header from "../../../components/layouts/Header";
import ProgressStatus from "../../../components/layouts/ProgressStatus";
import SearchLocation from "../../../components/utils/SearchLocation";
import RegisterLayout from "../../../pagesComponents/Register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/Register/RegisterOverview";
import { gatherContentState } from "../../../recoil/contentsAtoms";

function WritingDate() {
  const router = useRouter();
  const toast = useToast();
  const [gatherContent, setGatherContent] = useRecoilState(gatherContentState);
  const [date, setDate] = useState(
    gatherContent?.date ? (gatherContent?.date as Dayjs).toDate() : new Date()
  );
  const [detail, setDetail] = useState(gatherContent?.location?.sub);
  const [location, setLocation] = useState(gatherContent?.location?.main);
  const onClickNext = () => {
    if (!location) {
      toast({
        title: "진행 불가",
        description: `장소를 선택해 주세요!`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
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

  const detailOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value);
  };

  return (
    <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
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
            renderCustomHeader={({ date }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span>{dayjs(date)?.format("M월 D일")}</span>
              </div>
            )}
          />
        </Container>
        <Location>
          <SearchLocation location={location} setLocation={setLocation} />
          <LocationDetailInput
            placeholder="상세 주소"
            value={detail}
            onChange={detailOnchange}
          />
        </Location>
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;

  margin-top: 20px;
  align-items: center;

  border-bottom: 1.5px solid var(--font-h5);

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
  padding: 12px 0;
  margin-left: 8px;
  :focus {
    outline: none;
  }
`;

const Layout = styled(motion.div)`
  height: 100vh;
`;

const LocationDetailInput = styled.input`
  width: 100%;
  background-color: inherit;
  border-bottom: 1.5px solid var(--font-h5);
  padding: 6px 4px;
  outline: none;
  font-size: 13px;
  color: var(--font-h2);
`;

const Location = styled.div`
  margin-top: 12px;
  background-color: inherit;
`;

export default WritingDate;
