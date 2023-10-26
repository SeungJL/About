import dayjs from "dayjs";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import { ABOUT_UID } from "../../../constants/system";
import { getDateDiff } from "../../../helpers/dateHelpers";
import { IUser } from "../../../types/user/user";

interface IGatherOrganizer {
  createdAt: string;
  organizer: IUser;
  isAdminOpen: boolean;
}

function GatherOrganizer({
  createdAt,
  organizer,
  isAdminOpen,
}: IGatherOrganizer) {
  const writingDate = getDateDiff(dayjs(createdAt));
  const isABOUT = organizer.uid === ABOUT_UID || isAdminOpen;
  return (
    <Layout>
      <ProfileIcon user={isABOUT ? "ABOUT" : organizer} size="sm" />
      <Info>
        <Writer isABOUT={isABOUT}>{isABOUT ? "어바웃" : organizer.name}</Writer>
        <span>{writingDate}</span>
      </Info>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  margin: var(--margin-md) 0;
`;

const Writer = styled.span<{ isABOUT: boolean }>`
  ${(props) =>
    props.isABOUT &&
    `
background: linear-gradient(90deg, #04e19b, #03b1e8);
-webkit-background-clip: text;
color: transparent;`}
`;

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
    font-size: 10px;
    color: var(--font-h3);
  }
`;

export default GatherOrganizer;
