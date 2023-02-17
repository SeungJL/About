import dayjs from "dayjs";
import { useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dateToDayjs, splitDate } from "../libs/utils/dateUtils";
import {
  modalContextState,
  ShowOpenResultState,
  isShowOpenResultState,
} from "../recoil/atoms";
import { IUser } from "../models/user";
import { timeRange } from "../libs/utils/timeUtils";
import { START_HOUR } from "../constants/system";
import ProfileImage from "../components/profileImage";
import { CheckIcon } from "@chakra-ui/icons";
import { time } from "console";
import { IAttendence } from "../models/vote";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";
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

  const userName = (user.name as any).substr(0, 3);

  return (
    <TimeRangeItem>
      <UserInfo>
        <ProfileImage src={user.thumbnailImage} alt={user.name} />
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

const ModalLayout = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: absolute;
  width: 330px;
  height: 330px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 10px;
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
    font-size: 14px;
    height: 23px;
    padding: 2px;
    border-radius: 5px;
    margin-left: 15px;
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

const OpenResultModal = () => {
  const setIsShowOpenResult = useSetRecoilState(isShowOpenResultState);
  const modalContext = useRecoilValue(modalContextState);
  const attendences = modalContext?.OpenResult?.attendences;

  const [isLeftPage, setIsLeftPage] = useState(true);
  return (
    <>
      <ModalLayout>
        <Header>
          <span>Open</span>
          <div onClick={() => setIsShowOpenResult(false)}>
            <FontAwesomeIcon icon={faX} />
          </div>
        </Header>
        {isLeftPage ? (
          <TimeRangeSection>
            {attendences.map(
              (attendence, idx) =>
                idx < 4 && <TimeRangeBar key={idx} attendence={attendence} />
            )}
          </TimeRangeSection>
        ) : (
          <TimeRangeSection>
            {attendences.map(
              (attendence, idx) =>
                idx >= 4 && <TimeRangeBar key={idx} attendence={attendence} />
            )}
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

      <FullScreen onClick={() => setIsShowOpenResult(false)} />
    </>
  );
};

export default OpenResultModal;
