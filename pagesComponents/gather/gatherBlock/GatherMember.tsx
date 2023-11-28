import { faInfinity } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { AboutIcon } from "../../../components/common/Icon/AboutIcon";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import { ABOUT_UID } from "../../../constants/system";
import { IImagePriority } from "../../../types/common";
import {
  GatherMemberCnt,
  GatherParticipants,
} from "../../../types/page/gather";
import { IUser } from "../../../types/user/user";

interface IGatherMember extends IImagePriority {
  organizer: IUser;
  participants: GatherParticipants[];
  memberCnt: GatherMemberCnt;
  isAdminOpen: boolean;
}

function GatherMember({
  organizer,
  participants,
  memberCnt,
  isImagePriority,
  isAdminOpen,
}: IGatherMember) {
  const isABOUT = organizer.uid === ABOUT_UID || isAdminOpen;
  const participantCnt = participants.length;
  return (
    <Layout>
      <Writer>
        {isABOUT ? (
          <AboutIcon />
        ) : (
          <ProfileIcon
            user={organizer}
            size="xs"
            isImagePriority={isImagePriority}
          />
        )}
        <span>{isABOUT ? "어바웃" : organizer.name}</span>
      </Writer>
      <Voter>
        <span>{isAdminOpen ? participantCnt : participantCnt + 1} /</span>
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
  padding: var(--padding-sub) var(--padding-main);
  font-size: 13px;
  display: flex;
  justify-content: space-between;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-weight: 600;
    margin-left: var(--margin-md);
  }
`;

const Voter = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  font-weight: 600;
  > span:first-child {
    color: var(--color-mint);
  }
  > span:last-child {
    color: var(--font-h2);
    margin-left: var(--margin-min);
  }
`;

export default GatherMember;
