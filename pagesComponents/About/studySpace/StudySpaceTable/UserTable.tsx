import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { isVotingState, studyDateState } from "../../../../recoil/studyAtoms";

import { VOTE_TABLE_COLOR } from "../../../../constants/design";
import { IAttendance } from "../../../../types/studyDetails";

const BLOCK_WIDTH = 25;

function UserTable({ attendances }: { attendances: IAttendance[] }) {
  const isVoting = useRecoilValue(isVotingState);
  const studyDate = useRecoilValue(studyDateState);

  const [userArr, setUserArr] = useState<IUserTable[]>([]);

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
      if (studyDate === "not passed") setUserArr((old) => [...old, temp]);
      else if (att.firstChoice) setUserArr((old) => [...old, temp]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVoting]);

  return (
    <Layout>
      {userArr?.map((user, idx) => (
        <UserBlock key={idx}>
          <UserIcon
            start={user.startGap}
            gap={user.gap}
            color={VOTE_TABLE_COLOR[idx]}
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
  margin-bottom: 4px;
`;

const UserIcon = styled.div<{ start: number; gap: number; color: string }>`
  width: ${(props) => props.gap * BLOCK_WIDTH}px;
  min-width: ${BLOCK_WIDTH * 3}px;
  height: 37px;
  background-color: ${(props) => props.color};
  position: relative;
  margin-left: ${(props) => props.start * BLOCK_WIDTH}px;
  z-index: 10;
  border-radius: 8px;
  padding: 3px;
  padding-left: 6px;
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
  margin-top: 32px;
`;

const Time = styled.span<{ isSecond: boolean }>`
  color: ${(props) => props.isSecond && "var(--font-h3)"};
`;
interface IUserTable {
  name: string;
  start: string;
  end: string;
  gap: number;
  startGap: number;
  isSecond: boolean;
}

export default UserTable;
