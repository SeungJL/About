import dayjs from "dayjs";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import { getDateDiff } from "../../../helpers/dateHelpers";
import { IUser } from "../../../types/user/user";

interface IGatherOrganizer {
  createdAt: string;
  organizer: IUser;
}

function GatherOrganizer({ createdAt, organizer }: IGatherOrganizer) {
  const writingDate = getDateDiff(dayjs(createdAt));

  return (
    <Layout>
      <ProfileIcon user={organizer} size="md" />
      <Info>
        <span>{organizer.name}</span>
        <span>{writingDate}</span>
      </Info>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  margin: var(--margin-md) 0;
`;

const Info = styled.div`
  margin-left: var(--margin-sub);
  display: flex;
  flex-direction: column;
  font-size: 13px;
  align-items: flex-start;
  > span:first-child {
    font-weight: 600;
  }
  > span:last-child {
    font-size: 11px;
    color: var(--font-h3);
  }
`;

export default GatherOrganizer;
