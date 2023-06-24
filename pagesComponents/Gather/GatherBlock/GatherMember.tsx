import { faInfinity, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import { GatherMemberCnt } from "../../../types/gather";
import { IUser } from "../../../types/user";

interface IGatherMember {
  organizer: IUser;
  participants: IUser[];
  memberCnt: GatherMemberCnt;
}

function GatherMember({ organizer, participants, memberCnt }: IGatherMember) {
  return (
    <Layout>
      <Writer>
        <ProfileIcon user={organizer} size="xs" />
        <span>{organizer?.name}</span>
      </Writer>
      <Voter>
        <FontAwesomeIcon icon={faUserGroup} color="var(--font-h4)" />
        <span>{participants?.length + 1} /</span>
        {memberCnt.max ? (
          <span>{memberCnt.max}</span>
        ) : (
          <>
            <span />
            <FontAwesomeIcon icon={faInfinity} color="var(--font-h2)" />
          </>
        )}
      </Voter>
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 12px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;
const Writer = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-left: 6px;
  }
`;

const Voter = styled.div`
  display: flex;
  align-items: center;
  > span {
    color: var(--font-h2);
    font-weight: 600;
    margin-left: 3px;
  }
`;

export default GatherMember;
