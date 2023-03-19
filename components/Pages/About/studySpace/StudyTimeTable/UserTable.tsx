import { background } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IUser } from "../../../../../models/user";
import { IAttendence } from "../../../../../models/vote";

const colorArr = [
  "#FF8896",
  "#FEBC5A",
  "#71C3FF",
  "#9E7CFF",
  "#A6ABBF",
  "#FF8896",
  "#FEBC5A",
  "#71C3FF",
  "#9E7CFF",
  "#A6ABBF",
  "#FF8896",
  "#FEBC5A",
  "#71C3FF",
  "#9E7CFF",
  "#A6ABBF",
];

function UserTable({ attendances }: { attendances: IAttendence[] }) {
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
      setUserArr((old) => [...old, temp]);
    });
  }, []);

  return (
    <Layout>
      {userArr?.map((user, idx) => (
        <UserBlock key={idx}>
          <UserIcon start={user.startGap} gap={user.gap} color={colorArr[idx]}>
            <span>
              {user.name}
              <Sub>{user.isSecond && "(sub)"}</Sub>
            </span>
            <div>
              {user.start}~{user.end}
            </div>
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
  font-size: 11px;
  color: white;
  > div:last-child {
    font-size: 10px;
  }
`;

interface IUserTable {
  name: string;
  start: string;
  end: string;
  gap: number;
  startGap: number;
  isSecond: boolean;
}

const Layout = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  margin-top: 32px;
`;

const Sub = styled.span`
  margin-left: 2px;
  color: var(--font-h1);
`;

export default UserTable;
