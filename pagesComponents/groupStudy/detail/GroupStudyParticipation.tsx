import { faCrown, faInfinity } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import { GROUP_STUDY_ROLE } from "../../../constants/settingValue/groupStudy";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { transferUserDataState } from "../../../recoil/transferDataAtoms";
import { IGroupStudy } from "../../../types/page/groupStudy";
import { IUser } from "../../../types/user/user";

interface IGroupStudyParticipation {
  data: IGroupStudy;
}

function GroupStudyParticipation({ data }: IGroupStudyParticipation) {
  const router = useRouter();
  const setUserData = useSetRecoilState(transferUserDataState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);

  const organizer = data.organizer;
  const status = data.status;
  const participantsCnt = data.participants.length;

  const onClickProfile = (user: IUser) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };


  return (
    <Layout>
      <Header>
        <span>{status === "open" ? "확정 인원" : "참여중인 인원"}</span>
        <span>{participantsCnt + 1}</span>
        <span>/</span>
        {data?.memberCnt.max ? (
          <span>{data?.memberCnt.max}</span>
        ) : (
          <>
            <span style={{ marginLeft: "4px" }} />
            <FontAwesomeIcon icon={faInfinity} color="var(--font-h2)" />
          </>
        )}
      </Header>
      <Members>
        {true ? (
          <MemberItem
            key={organizer?.uid}
            onClick={() => onClickProfile(organizer)}
          >
            <Organizer>
              <ProfileIcon user={organizer} size="sm" />
              <CrownWrapper>
                <FontAwesomeIcon
                  icon={faCrown}
                  color="var(--color-orange)"
                  size="lg"
                />
              </CrownWrapper>
            </Organizer>
            <UserOverview>
              <span>{organizer?.name}</span>
              <div>{organizer?.comment}</div>
            </UserOverview>
            <ParticipateTime isFirst={true}>
              <span>그룹장</span>
            </ParticipateTime>
          </MemberItem>
        ) : (
          <Empty>
            <span>참여자를 모집중입니다.</span>
          </Empty>
        )}
        {data?.participants.map(
          (who) =>
            who && (
              <MemberItem
                key={who?.user?.uid}
                onClick={() => onClickProfile(who?.user)}
              >
                <ProfileIcon user={who?.user} size="sm" />
                <UserOverview>
                  <span>{who?.user?.name}</span>
                  <div>{who?.user?.comment}</div>
                </UserOverview>
                <ParticipateTime isFirst={true}>
                  {GROUP_STUDY_ROLE[who.role]}
                </ParticipateTime>
              </MemberItem>
            )
        )}
      </Members>
    </Layout>
  );
}
const MemberItem = styled.div`
  padding: var(--padding-md) 0;
  display: flex;
  align-items: center;

  border-bottom: var(--border-sub);
`;

const Header = styled.header`
  font-size: 16px;
  padding: var(--padding-main);
  font-weight: 600;

  > span:first-child {
    margin-right: var(--margin-sub);
  }
  > span:nth-child(2) {
    font-weight: 700;
    color: var(--color-mint);
  }
  > span:nth-child(3) {
    margin: 0 var(--margin-min);
  }
`;

const Members = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 var(--padding-main);
  > div:last-child {
    border: none;
  }
`;

const UserOverview = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: var(--line-height);
  margin-left: var(--margin-sub);
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
    color: var(--font-h2);
  }
`;
const Organizer = styled.div`
  position: relative;
`;

const ParticipateTime = styled.div<{ isFirst: boolean }>`
  font-size: 16px;
  margin-left: auto;
  margin-right: var(--margin-md);
  color: ${(props) =>
    props.isFirst ? "var(--color-mint)" : "var(--color-orange)"};
  > span:last-child {
    margin-left: 2px;
  }
`;

const CrownWrapper = styled.div`
  position: absolute;
  right: -1px;
  bottom: -1px;
`;
const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding-bottom: var(--padding-main);
`;

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  > span {
    font-size: 18px;
    color: var(--font-h4);
  }
`;

export default GroupStudyParticipation;
