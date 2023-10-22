import { faInfinity, faUserGroup } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
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
}

function GatherMember({
  organizer,
  participants,
  memberCnt,
  isImagePriority,
}: IGatherMember) {
  const isABOUT = organizer.uid === ABOUT_UID;
  return (
    <Layout>
      <Writer isABOUT={isABOUT}>
        <ProfileIcon
          user={isABOUT ? "ABOUT" : organizer}
          size="xs"
          isImagePriority={isImagePriority}
        />
        <span>{isABOUT ? "어바웃" : organizer.name}</span>
      </Writer>
      <Voter>
        <FontAwesomeIcon icon={faUserGroup} color="var(--font-h4)" />
        <span>{participants.length + 1} /</span>
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
  margin-top: var(--margin-sub);
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;
const Writer = styled.div<{ isABOUT: boolean }>`
  display: flex;
  align-items: center;
  > span {
    font-weight: 600;
    font-size: 12px;
    margin-left: var(--margin-md);
    ${(props) =>
      props.isABOUT &&
      `
background: linear-gradient(90deg, #04e19b, #03b1e8);
-webkit-background-clip: text;
color: transparent;
display: inline;
`}
  }
`;

const Voter = styled.div`
  display: flex;
  align-items: center;
  > span {
    color: var(--font-h2);
    font-weight: 600;
    margin-left: var(--margin-min);
  }
`;

export default GatherMember;
