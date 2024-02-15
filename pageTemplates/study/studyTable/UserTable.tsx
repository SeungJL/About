import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { TABLE_COLORS } from "../../../../constants/styles";
import {
  studyDateStatusState,
  voteDateState,
} from "../../../../recoil/studyAtoms";
import { userInfoState } from "../../../../recoil/userAtoms";
import { IAttendance, StudyStatus } from "../../../../types/study/studyDetail";

const BLOCK_WIDTH = 23.385;

interface IUserItemArr {
  name: string;
  uid: string;
  start: string;
  end: string;
  gap: number;
  startGap: number;
  isSecond: boolean;
}

interface IUserTable {
  attendances: IAttendance[];
  status: StudyStatus;
}

function UserTable({ attendances, status }: IUserTable) {
  const studyDateStatus = useRecoilValue(studyDateStatusState);

  const userInfo = useRecoilValue(userInfoState);
  const voteDate = useRecoilValue(voteDateState);
  const [userArr, setUserArr] = useState<IUserItemArr[]>([]);

  const myFriends = userInfo?.friend;
  const isAttend = attendances.find((who) => who.user.uid === userInfo?.uid);
  const hasPublicAccess =
    status === "open" ||
    (status !== "pending" && !!isAttend) ||
    voteDate.date() % 10 !== 1;

  useEffect(() => {
    setUserArr([]);
    attendances?.forEach((att) => {
      if (!att?.time) return;
      const start = dayjs(att?.time.start);
      const end = dayjs(att?.time.end);
      const endTime = end.hour() + end.minute() / 60;
      const startTime = start.hour() + start.minute() / 60;
      const gap = endTime - startTime;
      const temp = {
        name: att.user.name,
        start: start.format("HH:mm"),
        end: end.format("HH:mm"),
        startGap: startTime - 10,
        gap,
        isSecond: !att.firstChoice,
        uid: att.user.uid,
      };
      if (studyDateStatus === "not passed") setUserArr((old) => [...old, temp]);
      else if (att.firstChoice) setUserArr((old) => [...old, temp]);
    });
  }, [attendances, studyDateStatus]);

  return (
    <Layout>
      {userArr?.map((user, idx) => {
        const isOpenProfile =
          hasPublicAccess ||
          user.uid === userInfo?.uid ||
          myFriends?.includes(user.uid);

        return (
          <UserBlock
            key={idx}
            start={user.startGap}
            gap={user.gap}
            color={TABLE_COLORS[idx]}
          >
            <Name>{isOpenProfile ? user.name : "비공개"}</Name>
            <Time isSecond={user?.isSecond}>
              {user.start}~{user.end}
            </Time>
          </UserBlock>
        );
      })}
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  margin-top: 28px;
`;

const UserBlock = styled.div<{ start: number; gap: number; color: string }>`
  height: 36px;
  min-width: ${BLOCK_WIDTH * 3 + 2}px;
  width: ${(props) => props.gap * BLOCK_WIDTH + 2}px;
  margin-left: ${(props) => props.start * BLOCK_WIDTH + BLOCK_WIDTH / 2 + 8}px;
  background-color: ${(props) => props.color};
  position: relative;
  z-index: 10;
  border-radius: var(--rounded);
  padding: var(--gap-1);
  display: flex;
  flex-direction: column;
  font-size: 10px;
  color: white;
  margin-bottom: 2px;
  > div:last-child {
    font-size: 10px;
  }
`;

const Name = styled.span`
  font-weight: 600;
`;

const Time = styled.span<{ isSecond: boolean }>`
  color: ${(props) => props.isSecond && "var(--gray-3)"};
`;

export default UserTable;
