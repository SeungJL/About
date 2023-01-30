import dayjs from "dayjs";
import { useMemo } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dateToDayjs, splitDate } from "../libs/utils/dateUtils";
import { isShowOpenResultState, isShowVoterState } from "../recoil/atoms";
import { IUser } from "./user";
import { timeRange } from "../libs/utils/timeUtils";
import { START_HOUR } from "../constants/system";
import ProfileImage from "../components/profileImage";
import { CheckIcon } from "@chakra-ui/icons";

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
}
const TimeBox = styled.div<ITimeBox>`
  width: 9px;
  height: 35px;
  display: inline-block;
  background-color: gray;
  position: relative;
  margin-right: ${(props) => (props.index === "solid" ? "0px" : "1px")};
  > span {
    font-size: 8px;
    position: absolute;
    bottom: -20px;
  }
`;

interface IBox {
  width: any;
}
const Box = styled.div<IBox>`
  height: 100%;
  display: inline-block;
  background-color: pink;
  position: relative;
  z-index: 1;
  width: ${(props) => props.width}px;
`;

interface IBox2 {
  left: any;
}
const Box2 = styled.div<IBox2>`
  position: absolute;
  top: 0px;
  left: ${(props) => props.left}px;
  height: 35px;
  width: 3px;
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

  return (
    <TimeRangeItem>
      <UserInfo>
        <ProfileImage src={user.thumbnailImage} alt={user.name} />
        <span>{user.name}</span>
      </UserInfo>
      <TimeRange>
        {timeRange.map((idx) => (
          <TimeBox key={idx} index={idx % 1 === 0 ? "solid" : "none"}>
            {idx % 1 === 0 && <span>{idx}</span>}
            {startIdx === idx && (
              <Box width={`${10 * (endIdx - startIdx) * 2}`} />
            )}
          </TimeBox>
        ))}
      </TimeRange>
      {attendence.arrived && (
        <Box2 left={`${2 * 10 * (arrivedIdx - START_HOUR)}`} />
      )}
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
  padding: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  > div:first-child {
    height: 15%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(0, 0, 0, 0.4);
    font-size: 1.1em;
  }
`;

const TimeRangeSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: nowrap;
  padding-top: 5px;
  overflow-y: scroll;
`;
const Header = styled.header`
  height: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.8);
  > span {
    font-size: 16px;
    font-family: "NanumEx";
  }
`;

const OpenResultModal = ({ attendences }: any) => {
  const setOpenResultShow = useSetRecoilState(isShowOpenResultState);

  return (
    <>
      <ModalLayout>
        <Header>
          <span>Open</span>
        </Header>
        <TimeRangeSection>
          {attendences.map((attendence, idx) => (
            <TimeRangeBar key={idx} attendence={attendence} />
          ))}
        </TimeRangeSection>

        <br />
      </ModalLayout>
      <FullScreen onClick={() => setOpenResultShow(false)} />
    </>
  );
};

export default OpenResultModal;
