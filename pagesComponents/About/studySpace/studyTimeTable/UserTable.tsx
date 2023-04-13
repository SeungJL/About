import styled from "styled-components";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import { isVotingState, studyDateState } from "../../../../recoil/studyAtoms";

import { VOTE_TABLE_COLOR } from "../../../../constants/design";
import { IAttendence } from "../../../../types/studyDetails";
import { IUser } from "../../../../types/user";

function UserTable({ attendances }: { attendances: IAttendence[] }) {
  const isVoting = useRecoilValue(isVotingState);
  const studyDate = useRecoilValue(studyDateState);
  console.log(2, studyDate);
  const [userArr, setUserArr] = useState<IUserTable[]>([]);

  useEffect(() => {
    setUserArr([]);
    attendances?.forEach((user) => {
      const start = dayjs(user?.time.start);
      const end = dayjs(user?.time.end);
      const endTime = end.hour() + end.minute() / 60;
      const startTime = start.hour() + start.minute() / 60;
      const gap = endTime - startTime;
      const temp = {
        name: (user?.user as IUser).name,
        start: start.format("HH:mm"),
        end: end.format("HH:mm"),
        startGap: startTime - 10,
        gap,
        isSecond: !user.firstChoice,
      };
      if (studyDate === "not passed") setUserArr((old) => [...old, temp]);
      else if (user.firstChoice) setUserArr((old) => [...old, temp]);
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
  width: ${(props) => props.gap * 25}px;
  height: 37px;
  background-color: ${(props) => props.color};
  position: relative;
  margin-left: ${(props) => props.start * 25}px;
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
