import { Button } from "@chakra-ui/react";
import { faCheckCircle } from "@fortawesome/pro-light-svg-icons";
import { faCheckCircle as checkCircle } from "@fortawesome/pro-regular-svg-icons";
import { faCaretLeft, faCaretRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { dayjsToFormat } from "../../../../helpers/dateHelpers";
import AttendCheckModal from "../../../../modals/groupStudy/AttendCheckModal";
import { transferGroupStudyDataState } from "../../../../recoil/transferDataAtoms";
import { userAccessUidState } from "../../../../recoil/userAtoms";
import { IWeekRecord } from "../../../../types/page/groupStudy";

function ContentAttend() {
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);

  const [isThisWeek, setIsThisWeek] = useState(true);

  const id = router.query.id;

  const uid = useRecoilValue(userAccessUidState);
  const [attendRecord, setAttendRecord] = useState<IWeekRecord[]>([]);

  const weekDay = ["월", "화", "수", "목", "금", "토", "일"];
  const topLineArr = ["이름", ...weekDay];

  const groupStudy = useRecoilValue(transferGroupStudyDataState);

  useEffect(() => {
    if (isThisWeek) setAttendRecord(groupStudy.attendance?.thisWeek || []);
    else setAttendRecord(groupStudy.attendance?.lastWeek || []);
  }, [
    groupStudy.attendance?.lastWeek,
    groupStudy.attendance?.thisWeek,
    isThisWeek,
  ]);
  console.log(dayjs().startOf("week").add(1, "day").format("YYYY-MM-DD"));
  return (
    <>
      <Layout>
        <Month>
          <IconWrapper onClick={() => setIsThisWeek(false)}>
            {isThisWeek && (
              <FontAwesomeIcon
                icon={faCaretLeft}
                size="sm"
                color="var(--font-h2)"
              />
            )}
          </IconWrapper>
          <div>
            {dayjsToFormat(dayjs().startOf("week").add(1, "day"), "M월 D일")} ~{" "}
            {dayjsToFormat(dayjs().endOf("week").add(1, "day"), "M월 D일")}
          </div>

          <IconWrapper onClick={() => setIsThisWeek(true)}>
            {!isThisWeek && (
              <FontAwesomeIcon
                icon={faCaretRight}
                size="sm"
                color="var(--font-h2)"
              />
            )}
          </IconWrapper>
        </Month>
        <ButtonNav>
          <Button
            fontSize="15px"
            onClick={() => setIsModal(true)}
            colorScheme="mintTheme"
            rightIcon={<FontAwesomeIcon icon={checkCircle} />}
          >
            출석체크
          </Button>
        </ButtonNav>
        <Container>
          <TopLine>
            {topLineArr.map((text) => (
              <div key={text}>{text}</div>
            ))}
          </TopLine>
          <Main>
            {attendRecord.map((who) => {
              const attendDays = who.attendRecord;
              const days = weekDay.map((day) =>
                attendDays.includes(day) ? true : false
              );

              return (
                <MainLine key={who.uid}>
                  <Name>{who.name}</Name>
                  {days.map((isAttend, idx) => (
                    <Item key={idx}>
                      {isAttend ? (
                        <FontAwesomeIcon icon={faCheckCircle} />
                      ) : null}
                    </Item>
                  ))}
                </MainLine>
              );
            })}
          </Main>
        </Container>
      </Layout>
      {isModal && (
        <AttendCheckModal
          attendRecord={
            attendRecord.find((who) => who.uid === uid)?.attendRecord || []
          }
          type={isThisWeek ? "this" : "last"}
          setIsModal={setIsModal}
          id={+id}
        />
      )}
    </>
  );
}

const IconWrapper = styled.div`
  width: 22.125px;
  padding: 0 var(--padding-md);
`;

const Layout = styled.div``;

const ButtonNav = styled.nav`
  display: flex;
  margin: 0 var(--margin-main);
  margin-bottom: var(--margin-main);
  > button {
    flex: 1;
  }
`;

const Month = styled.div`
  border-radius: var(--border-radius2);
  margin: var(--margin-main) var(--margin-sub);
  padding: var(--padding-md) var(--margin-max);
  background-color: var(--font-h8);
  display: flex;
  align-items: center;

  justify-content: space-around;
`;

const AttendBtn = styled.button``;

const ColorView = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopLine = styled.div`
  display: flex;
  background-color: var(--font-h8);
  border: var(--border-sub);
  font-size: 13px;
  color: var(--font-h3);
  > div {
    padding: var(--padding-min) 0;
    flex: 1;
    text-align: center;
    border-left: var(--border-sub);
  }
  > div:first-child {
    flex: 1.5;
    border-left: none;
  }
`;

const Main = styled.main``;

const MainLine = styled.div`
  display: flex;
  border-bottom: var(--border-sub);
  > div {
    text-align: center;
    border-left: var(--border-sub);
    padding: var(--padding-min) 0;
  }
  > div:first-child {
    border-left: none;
  }
`;
const Item = styled.div`
  flex: 1;
`;
const Name = styled.div`
  flex: 1.5;
`;
const CheckGrid = styled.div``;

interface IContentAttend {}

export default ContentAttend;
