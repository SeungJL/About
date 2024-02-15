import {
  fa1,
  fa2,
  faCrown,
  faInfinity
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { transferUserDataState } from "../../../recoil/transferDataAtoms";
import { IGather } from "../../../types/page/gather";
import { IUser } from "../../../types/user/user";

interface IGatherParticipation {
  data: IGather;
}

function GatherParticipation({ data }: IGatherParticipation) {
  const router = useRouter();
  const setUserData = useSetRecoilState(transferUserDataState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);

  const organizer = data.user;
  const status = data.status;
  const participantsCnt = data.participants.length;

  const isAdminOpen = data.isAdminOpen;

  const onClickProfile = (user: IUser) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <Layout>
      <Header>
        <span>{status === "open" ? "확정 인원" : "참여중인 인원"}</span>
        <span>{isAdminOpen ? participantsCnt : participantsCnt + 1}</span>
        <span>/</span>
        {data?.memberCnt.max ? (
          <span>{data?.memberCnt.max}</span>
        ) : (
          <>
            <span style={{ marginLeft: "4px" }} />
            <FontAwesomeIcon icon={faInfinity} color="var(--gray-2)" />
          </>
        )}
      </Header>
      <Members>
        {!isAdminOpen ? (
          <MemberItem
            key={organizer?.uid}
            onClick={() => onClickProfile(organizer)}
          >
            <Organizer>
              <ProfileIcon user={organizer} size="sm" />
              <CrownWrapper>
                <FontAwesomeIcon icon={faCrown} color="var(--color-orange)" />
              </CrownWrapper>
            </Organizer>
            <UserOverview>
              <span>{organizer?.name}</span>
              <div>{organizer?.comment}</div>
            </UserOverview>
          </MemberItem>
        ) : data.participants.length ? null : (
          <Empty>
            <span>참여자를 모집중입니다.</span>
          </Empty>
        )}
        {data?.participants.map(
          (who) =>
            who?.user && (
              <MemberItem
                key={who?.user.uid}
                onClick={() => onClickProfile(who.user)}
              >
                <ProfileIcon user={who.user} size="sm" />
                <UserOverview>
                  <span>{who?.user?.name}</span>
                  <div>{who?.user.comment}</div>
                </UserOverview>
                <ParticipateTime isFirst={who?.phase === "first"}>
                  {who?.phase === "first" ? (
                    <FontAwesomeIcon icon={fa1} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={fa2} size="sm" />
                  )}
                  <span>차</span>
                </ParticipateTime>
              </MemberItem>
            )
        )}
      </Members>
    </Layout>
  );
}
const MemberItem = styled.div`
  padding: var(--gap-2) 0;
  display: flex;
  align-items: center;

  border-bottom: var(--border-light);
`;

const Header = styled.header`
  font-size: 16px;
  padding: var(--gap-4);
  font-weight: 600;

  > span:first-child {
    margin-right: var(--gap-3);
  }
  > span:nth-child(2) {
    font-weight: 700;
    color: var(--color-mint);
  }
  > span:nth-child(3) {
    margin: 0 var(--gap-1);
  }
`;

const Members = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 var(--gap-4);
  > div:last-child {
    border: none;
  }
`;

const UserOverview = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  margin-left: var(--gap-3);
  > span:first-child {
    font-size: 14px;
    font-weight: 600;
  }
  > div:last-child {
    width: 95%;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 13px;
    color: var(--gray-2);
  }
`;
const Organizer = styled.div`
  position: relative;
`;

const ParticipateTime = styled.div<{ isFirst: boolean }>`
  font-size: 16px;
  margin-left: auto;
  margin-right: var(--gap-2);
  color: ${(props) =>
    props.isFirst ? "var(--color-mint)" : "var(--color-orange)"};
  > span:last-child {
    margin-left: 2px;
  }
`;

const CrownWrapper = styled.div`
  position: absolute;
  right: -2px;
  bottom: -2px;
`;
const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding-bottom: var(--gap-4);
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  > span {
    font-size: 18px;
    color: var(--gray-4);
  }
`;

export default GatherParticipation;
