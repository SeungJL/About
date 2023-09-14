import { faInfinity, faUserGroup } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import styled from "styled-components";
import ProfileIconXsOverwrap from "../../../../components/common/Profile/ProfileIconXsOverwrap";
import { GatherMemberCnt } from "../../../../types/page/gather";
import { IUser } from "../../../../types/user/user";

interface IAboutGatherMember {
  memberCnt: GatherMemberCnt;
  participants: IUser[];
}

const VISIBLE_MEMBER_CNT = 7;

function AboutGatherMember({ memberCnt, participants }: IAboutGatherMember) {
  return (
    <Layout>
      <Member>
        {participants.map((who, idx) => (
          <Fragment key={idx}>
            {idx <= VISIBLE_MEMBER_CNT && (
              <ProfileContainer zIndex={idx}>
                <ProfileIconXsOverwrap
                  user={who}
                  isOverlap={idx === VISIBLE_MEMBER_CNT}
                />
              </ProfileContainer>
            )}
          </Fragment>
        ))}
      </Member>
      <MemberCnt>
        <FontAwesomeIcon icon={faUserGroup} size="xs" />
        <div>
          <span>{participants?.length}/</span>
          {memberCnt.max ? (
            <span>{memberCnt.max}</span>
          ) : (
            <>
              <span />
              <FontAwesomeIcon icon={faInfinity} size="xs" />
            </>
          )}
        </div>
      </MemberCnt>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: space-between;
  color: var(--font-h3);
  font-size: 13px;
`;

const Member = styled.div`
  flex: 1;
  display: flex;
`;

const ProfileContainer = styled.div<{ zIndex: number }>`
  width: 23px;
  display: flex;
  z-index: ${(props) => props.zIndex};
  position: relative;
`;

const MemberCnt = styled.span`
  display: flex;
  align-items: center;
  > div {
    margin-left: var(--margin-min);
  }
`;
export default AboutGatherMember;
