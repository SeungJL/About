import dayjs from "dayjs";
import styled from "styled-components";
import { Badge } from "../../../components/common/customComponents/Badges";
import { AboutIcon } from "../../../components/common/Icon/homeIcon";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import { ABOUT_UID } from "../../../constants/system";
import { getDateDiff } from "../../../helpers/dateHelpers";
import { IUser } from "../../../types/user/user";

interface IGatherOrganizer {
  createdAt: string;
  organizer: IUser;
  isAdminOpen: boolean;
  category: string;
}

function GatherOrganizer({
  createdAt,
  organizer,
  isAdminOpen,
  category,
}: IGatherOrganizer) {
  const writingDate = getDateDiff(dayjs(createdAt));
  const isABOUT = organizer.uid === ABOUT_UID || isAdminOpen;
  return (
    <Layout>
      <div>
        {isABOUT ? (
          <AboutIcon size="md" />
        ) : (
          <ProfileIcon user={organizer} size="sm" />
        )}
        <Info>
          <Writer>{isABOUT ? "어바웃" : organizer.name}</Writer>
          <span>{writingDate}</span>
        </Info>
      </div>
      <Badge colorScheme="redTheme" text={category} size="lg" />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--margin-sub) var(--margin-main);
  background-color: white;
  border-bottom: var(--border-sub);
  > div:first-child {
    display: flex;
  }
`;

const Category = styled.div``;

const Writer = styled.span``;

const Info = styled.div`
  margin-left: var(--margin-sub);
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 13px;
  align-items: flex-start;
  > span:first-child {
    font-weight: 600;
  }
  > span:last-child {
    font-size: 12px;
    color: var(--font-h3);
  }
`;

export default GatherOrganizer;
