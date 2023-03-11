import dayjs from "dayjs";
import { useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dateToDayjs, splitDate } from "../../../libs/utils/dateUtils";

import { IUser } from "../../../models/user";

import { END_HOUR, START_HOUR } from "../../../constants/system";
import ProfileImage from "../../../components/existing/profileImage";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { isShowOpenResultState } from "../../../recoil/studyAtoms";
import { modalContextState } from "../../../recoil/modalAtoms";
import ProfileImg from "../../../components/common/ProfileImg";
const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
const MINUTES = ["00", "30"];

const timeRange: number[] = [];
for (let i = START_HOUR; i < END_HOUR; i += 1 / 2) {
  timeRange.push(i);
}
const TimeRangeBar = ({ attendence }: any) => {
  const start = dayjs(attendence.time.start);
  const end = dayjs(attendence.time.end);

  const [startHour, startMin] = splitDate(start);
  const [endHour, endMin] = splitDate(end);
  const startIdx = startHour + startMin / 60;
  const endIdx = endHour + endMin / 60;

  const arrivedIdx = useMemo(() => {
    if (!attendence.arrived) return null;
    const [arrivedHour, arrivedMin] = splitDate(
      dateToDayjs(attendence.arrived)
    );
    return arrivedHour + arrivedMin / 60;
  }, [attendence]);
  const user = attendence.user as IUser;

  const userName = (user?.name as any)?.substr(0, 3);
  return (
    <TimeRangeItem>
      <UserInfo>
        <ProfileImg user={user} />
        <span>{userName}</span>
      </UserInfo>
      <TimeRange>
        {timeRange.map((idx) => (
          <TimeBox
            key={idx}
            index={idx % 1 === 0 ? "solid" : "none"}
            start={startIdx}
            end={endIdx}
            idx={idx}
          >
            {idx % 1 === 0 && <span>{idx}</span>}
          </TimeBox>
        ))}
      </TimeRange>
      {attendence.arrived && <ArrivedTime left={arrivedIdx - START_HOUR} />}
    </TimeRangeItem>
  );
};
const ButtonNav = styled.nav``;
const Button = styled.button<{ first: boolean }>`
  width: 25px;
  height: 25px;
  background-color: ${(props) => (props.first ? "#ffc72c" : "lightgray")};
  color: ${(props) => (props.first ? "#2c3e50" : "rgb(34, 84, 61)")};
`;

export const VoteResultModal = () => {
  const setIsShowOpenResult = useSetRecoilState(isShowOpenResultState);
  const [modalContext, setModalContext] = useRecoilState(modalContextState);
  const attendences = modalContext?.OpenResult?.attendences;
  const [isLeftPage, setIsLeftPage] = useState(true);
  const firstArr = [];
  const secondArr = [];
  const closeModal = () => {
    setIsShowOpenResult(false);
    setModalContext({});
  };

  attendences.forEach((att) => {
    if (att?.firstChoice) firstArr.push(att);
    else secondArr.push(att);
  });

  return (
    <>
      <ModalLayout>
        <Header>
          <span>투표현황</span>
          <div>
            <ButtonNav>
              <Button first={isLeftPage} onClick={() => setIsLeftPage(true)}>
                1
              </Button>
              <Button first={!isLeftPage} onClick={() => setIsLeftPage(false)}>
                2
              </Button>
            </ButtonNav>
            <div onClick={closeModal}>
              <FontAwesomeIcon icon={faX} />
            </div>
          </div>
        </Header>
        {isLeftPage ? (
          <TimeRangeSection>
            {firstArr.map((attendence, idx) => (
              <TimeRangeBar key={idx} attendence={attendence} />
            ))}
          </TimeRangeSection>
        ) : (
          <TimeRangeSection>
            {secondArr.map((attendence, idx) => (
              <TimeRangeBar key={idx} attendence={attendence} />
            ))}
          </TimeRangeSection>
        )}

        <br />
        <ArrowBtn>
          {isLeftPage ? (
            <FontAwesomeIcon
              icon={faArrowRight}
              size="lg"
              onClick={() => setIsLeftPage(false)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faArrowLeft}
              size="lg"
              onClick={() => setIsLeftPage(true)}
            />
          )}
        </ArrowBtn>
      </ModalLayout>

      <FullScreen onClick={closeModal} />
    </>
  );
};

const FullScreen = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
  z-index: 1;
  top: 0;
`;

const TimeRangeItem = styled.div`
  display: flex;
  align-items: stretch;
  padding-top: 5px;
  width: 100%;
  position: relative;
`;

const UserInfo = styled.div`
  width: 40px;
  > span {
    font-size: 14px;
  }
  margin-right: 10px;
`;
const TimeRange = styled.div`
  background-color: white;
`;

interface ITimeBox {
  index: any;
  start: any;
  end: any;
  idx: any;
}
const TimeBox = styled.div<ITimeBox>`
  width: 9px;
  height: 35px;
  display: inline-block;
  position: relative;
  margin-right: ${(props) => (props.index === "solid" ? "0px" : "1px")};
  border-right: ${(props) => (props.index === "solid" ? "1px " : "0px")} solid
    #d3d3d3;
  background-color: ${(props) =>
    props.idx > props.start && props.idx <= props.end ? " #FBD72B" : "white"};
  > span {
    font-size: 8px;
    position: absolute;
    bottom: -20px;
  }
`;

interface IArrived {
  left: any;
}
const ArrivedTime = styled.div<IArrived>`
  position: absolute;
  top: 6px;
  left: ${(props) => 3 * 10 * (props.left + 1)}px;
  height: 35px;
  width: 2px;
  background-color: var(--main-color);
`;

const TimeRangeSection = styled.div`
  flex-wrap: nowrap;
  padding-top: 5px;
  overflow-y: scroll;
  padding: 10px;
`;
const Header = styled.header`
  height: 45px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  border-radius: 8px;
  padding-right: 12px;
  > span {
    font-size: 16px;
    font-family: "NanumEx";
    height: 30px;
  }
  > div {
    display: flex;
    > div {
      margin-left: 25px;
    }
  }
`;

const ArrowBtn = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  height: 30px;
  z-index: 10;
  color: var(--main-color);
`;

const ModalLayout = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: absolute;
  width: 330px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 10px;
`;
