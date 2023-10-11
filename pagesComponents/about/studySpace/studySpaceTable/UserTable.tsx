import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { TABLE_COLORS } from "../../../../constants/styles";
import { studyDateStatusState } from "../../../../recoil/studyAtoms";
import { IAttendance } from "../../../../types/study/studyDetail";

const BLOCK_WIDTH = 26;

interface IUserItemArr {
  name: string;
  start: string;
  end: string;
  gap: number;
  startGap: number;
  isSecond: boolean;
}

interface IUserTable {
  attendances: IAttendance[];
}

function UserTable({ attendances }: IUserTable) {
  const studyDateStatus = useRecoilValue(studyDateStatusState);

  const [userArr, setUserArr] = useState<IUserItemArr[]>([]);

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
      };
      if (studyDateStatus === "not passed") setUserArr((old) => [...old, temp]);
      else if (att.firstChoice) setUserArr((old) => [...old, temp]);
    });
  }, [attendances, studyDateStatus]);

  return (
    <Layout>
      {userArr?.map((user, idx) => (
        <UserBlock key={idx}>
          <UserIcon
            start={user.startGap}
            gap={user.gap}
            color={TABLE_COLORS[idx]}
          >
            <Name>{user.name}</Name>
            <Time isSecond={user?.isSecond}>
              {user.start}~{user.end}
            </Time>
          </UserIcon>
        </UserBlock>
      ))}
    </Layout>
  );
}

const UserBlock = styled.div`
  margin-bottom: var(--margin-min);
`;

const UserIcon = styled.div<{ start: number; gap: number; color: string }>`
  min-width: ${BLOCK_WIDTH * 3 + 2}px;
  width: ${(props) => props.gap * BLOCK_WIDTH + 2}px;
  margin-left: ${(props) => props.start * BLOCK_WIDTH - 1}px;
  background-color: ${(props) => props.color};
  position: relative;
  z-index: 10;
  border-radius: var(--border-radius-main);
  padding: var(--padding-min) calc(var(--padding-min) * 2);
  display: flex;
  flex-direction: column;
  font-size: 11px;
  color: white;

  > div:last-child {
    font-size: 10px;
  }
`;

const Name = styled.span``;

const Layout = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  margin-top: 24px;
`;

const Time = styled.span<{ isSecond: boolean }>`
  color: ${(props) => props.isSecond && "var(--font-h3)"};
`;

export default UserTable;
