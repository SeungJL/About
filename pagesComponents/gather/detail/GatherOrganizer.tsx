import dayjs from "dayjs";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import { IUser } from "../../../types/user/user";

interface IGatherOrganizer {
  createdAt: string;
  organizer: IUser;
}

function GatherOrganizer({ createdAt, organizer }: IGatherOrganizer) {
  const writingDate = dayjs().diff(createdAt, "day");
  return (
    <Layout>
      <ProfileIcon user={organizer} size="md" />
      <div>
        <span>{organizer?.name}</span>
        {writingDate === 0 ? (
          <span>오늘</span>
        ) : (
          <span>{writingDate}일 전</span>
        )}
      </div>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;

  margin: var(--margin-md) 0;
  > div:last-child {
    margin-left: var(--margin-sub);
    display: flex;
    flex-direction: column;
    font-size: 12px;
    align-items: flex-start;
    > span:first-child {
      font-weight: 600;
    }
    > span:last-child {
      font-size: 10px;
      color: var(--font-h3);
    }
  }
`;

export default GatherOrganizer;
