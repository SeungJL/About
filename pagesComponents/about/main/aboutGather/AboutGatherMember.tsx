import { faInfinity, faUserGroup } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import styled from "styled-components";
import ProfileIconXsOverwrap from "../../../../components/common/user/Profile/ProfileIconXsOverwrap";
import { GatherMemberCnt, GatherStatus } from "../../../../types/page/gather";
import { IUser } from "../../../../types/user/user";

interface IAboutGatherMember {
  memberCnt: GatherMemberCnt;
  participants: IUser[];
  status: GatherStatus;
}

const VISIBLE_MEMBER_CNT = 7;

function AboutGatherMember({
  memberCnt,
  participants,
  status,
}: IAboutGatherMember) {
  const isFull = memberCnt.max === participants.length;

  return (
    <Layout>
      <Member>
        {participants.map((who, idx) => (
          <Fragment key={idx}>
            {idx <= VISIBLE_MEMBER_CNT && (
              <ProfileContainer zIndex={idx}>
                <ProfileIconXsOverwrap
                  user={who}
                  isOverlap={
                    idx === VISIBLE_MEMBER_CNT &&
                    participants.length - 1 > VISIBLE_MEMBER_CNT
                  }
                />
              </ProfileContainer>
            )}
          </Fragment>
        ))}
      </Member>
      <MemberCnt>
        {status === "close" ? (
          <Status>취소</Status>
        ) : isFull ? (
          <Full>FULL</Full>
        ) : (
          <div>
            <FontAwesomeIcon icon={faUserGroup} size="xs" />
            <Participants>{participants.length}</Participants>
            <Slash>/</Slash>
            {memberCnt.max ? (
              <span>{memberCnt.max}</span>
            ) : (
              <>
                <FontAwesomeIcon icon={faInfinity} size="xs" />
              </>
            )}
          </div>
        )}
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

const Full = styled.span`
  font-size: 14px;
  color: var(--color-red);
`;

const Status = styled.span``;

const Slash = styled.span``;

const Participants = styled.span``;

export default AboutGatherMember;
